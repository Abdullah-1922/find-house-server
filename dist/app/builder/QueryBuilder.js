"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class QueryBuilder {
    constructor(modelQuery, query) {
        this.modelQuery = modelQuery;
        this.query = query;
    }
    search(searchableFields) {
        var _a;
        const searchTerm = (_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.searchTerm;
        if (searchTerm) {
            this.modelQuery = this.modelQuery.find({
                $or: searchableFields.map((field) => ({
                    [field]: { $regex: searchTerm, $options: "i" },
                })),
            });
        }
        return this;
    }
    filter() {
        const queryObj = Object.assign({}, this.query); // Ensure queryObj is an object type
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
            "bathrooms",
            "bedrooms",
            "age",
            "status",
        ];
        excludeFields.forEach((field) => delete queryObj[field]);
        // Price range filter
        if (this.query.minPrice || this.query.maxPrice) {
            queryObj.price = Object.assign(Object.assign({}, (this.query.minPrice ? { $gte: Number(this.query.minPrice) } : {})), (this.query.maxPrice ? { $lte: Number(this.query.maxPrice) } : {}));
        }
        if (this.query.bathrooms) {
            queryObj["extraInfo.bathrooms"] = Number(this.query.bathrooms);
        }
        if (this.query.bedrooms) {
            queryObj.rooms = Number(this.query.bedrooms);
        }
        if (this.query.age) {
            queryObj["extraInfo.age"] = this.query.age;
        }
        if (this.query.status) {
            queryObj.status = this.query.status;
        }
        // Area range filter
        if (this.query.minArea || this.query.maxArea) {
            queryObj.area = Object.assign(Object.assign({}, (this.query.minArea ? { $gte: Number(this.query.minArea) } : {})), (this.query.maxArea ? { $lte: Number(this.query.maxArea) } : {}));
        }
        // Features array filter
        if (this.query.features) {
            const featuresArray = this.query.features.split(",");
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
        this.modelQuery = this.modelQuery.find(queryObj);
        return this;
    }
    sort() {
        var _a, _b, _c;
        const sort = ((_c = (_b = (_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.sort) === null || _b === void 0 ? void 0 : _b.split(",")) === null || _c === void 0 ? void 0 : _c.join(" ")) || "-createdAt";
        this.modelQuery = this.modelQuery.sort(sort);
        return this;
    }
    paginate() {
        var _a, _b;
        const page = Number((_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.page) || 1;
        const limit = Number((_b = this === null || this === void 0 ? void 0 : this.query) === null || _b === void 0 ? void 0 : _b.limit) || 10;
        const skip = (page - 1) * limit;
        this.modelQuery = this.modelQuery.skip(skip).limit(limit);
        return this;
    }
    fields() {
        var _a, _b, _c;
        const fields = ((_c = (_b = (_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.fields) === null || _b === void 0 ? void 0 : _b.split(",")) === null || _c === void 0 ? void 0 : _c.join(" ")) || "-__v";
        this.modelQuery = this.modelQuery.select(fields);
        return this;
    }
    countTotal() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const totalQueries = this.modelQuery.getFilter();
            const total = yield this.modelQuery.model.countDocuments(totalQueries);
            const page = Number((_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.page) || 1;
            const limit = Number((_b = this === null || this === void 0 ? void 0 : this.query) === null || _b === void 0 ? void 0 : _b.limit) || 9999;
            const totalPage = Math.ceil(total / limit);
            return {
                page,
                limit,
                total,
                totalPage,
            };
        });
    }
}
exports.default = QueryBuilder;
