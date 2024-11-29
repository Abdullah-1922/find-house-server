import { FilterQuery, Query } from "mongoose";

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const searchTerm = this?.query?.searchTerm;
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: "i" },
            }) as FilterQuery<T>,
        ),
      });
    }

    return this;
  }

  filter() {
    const queryObj: Record<string, any> = { ...this.query }; // Ensure queryObj is an object type

    // Exclude fields that aren't directly queryable in MongoDB
    const excludeFields = [
      "searchTerm",
      "sort",
      "limit",
      "page",
      "fields",
      "minPrice",
      "maxPrice",
      "minArea",
      "maxArea",
      "features",
      "location",
    ];
    excludeFields.forEach((field) => delete queryObj[field]);

    // Price range filter
    if (this.query.minPrice || this.query.maxPrice) {
      queryObj.price = {
        ...(this.query.minPrice ? { $gte: Number(this.query.minPrice) } : {}),
        ...(this.query.maxPrice ? { $lte: Number(this.query.maxPrice) } : {}),
      };
    }

    // Area range filter
    if (this.query.minArea || this.query.maxArea) {
      queryObj.area = {
        ...(this.query.minArea ? { $gte: Number(this.query.minArea) } : {}),
        ...(this.query.maxArea ? { $lte: Number(this.query.maxArea) } : {}),
      };
    }

    // Features array filter
    if (this.query.features) {
      const featuresArray = (this.query.features as string).split(",");
      queryObj.features = { $all: featuresArray };
    }

    // Location filter
    if (this.query.location) {
      queryObj["location.city"] = {
        $regex: this.query.location,
        $options: "i",
      };
    }

    // Add the filtered query to the modelQuery
    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);

    return this;
  }

  sort() {
    const sort =
      (this?.query?.sort as string)?.split(",")?.join(" ") || "-createdAt";
    this.modelQuery = this.modelQuery.sort(sort as string);

    return this;
  }

  paginate() {
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);

    return this;
  }

  fields() {
    const fields =
      (this?.query?.fields as string)?.split(",")?.join(" ") || "-__v";

    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }
  async countTotal() {
    const totalQueries = this.modelQuery.getFilter();
    const total = await this.modelQuery.model.countDocuments(totalQueries);
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 9999;
    const totalPage = Math.ceil(total / limit);

    return {
      page,
      limit,
      total,
      totalPage,
    };
  }
}

export default QueryBuilder;
