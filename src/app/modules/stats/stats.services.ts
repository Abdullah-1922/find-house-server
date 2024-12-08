import { BlogComment } from "../blog comment/blogComment.model";
import { Blog } from "../Blog/blog.model";
import { Comment } from "../comment/comment.model";
import { Inquiry } from "../inquiry/inquiry.model";
import { ProductReview } from "../product review/productReview.model";
import { Product } from "../product/product.model";
import Property from "../property/property.model";
import PropertyPayment from "../propertyPayment/propertyPayment.model";
import { User } from "../User/user.model";

const getAdminStats = async () => {
  const totalUsers = await User.countDocuments();
  const totalProperties = await Property.countDocuments();
  const totalActiveProperties = await Property.countDocuments({
    status: "active",
  });
  const totalNonActiveProperties = await Property.countDocuments({
    status: "non-active",
  });
  const totalRentProperties = await Property.countDocuments({
    category: "rent",
  });
  const totalSellProperties = await Property.countDocuments({
    category: "sell",
  });
  const totalReviews =
    (await Comment.countDocuments()) + (await ProductReview.countDocuments());
  const totalMessages = await Inquiry.countDocuments();
  const totalFavoriteProperties = await Property.countDocuments({
    favoriteBy: { $exists: true, $ne: [] },
  });
  const totalProducts = await Product.countDocuments();
  const totalBlogComments = await BlogComment.countDocuments();
  const totalBlogs = await Blog.countDocuments();
  const totalPayments = await PropertyPayment.countDocuments();

  const stats = {
    totalUsers,
    totalProperties,
    totalActiveProperties,
    totalNonActiveProperties,
    totalRentProperties,
    totalSellProperties,
    totalReviews,
    totalMessages,
    totalFavoriteProperties,
    totalProducts,
    totalBlogComments,
    totalBlogs,
    totalPayments,
  };
  return stats;
};

const getUserStats = async (userId: string) => {
  const totalBlogAdded = await Blog.countDocuments({ userId: userId });
  
  const totalBlogComments = await BlogComment.countDocuments({
    userId: userId,
  });
  
  const totalPropertyComments = await Comment.countDocuments({
    userId: userId,
  });
 
  const totalFavoriteProperties = await Property.countDocuments({
    favoriteBy: userId,
  });

  const stats = {
    totalFavoriteProperties,
    totalBlogAdded,
    totalBlogComments,
    totalPropertyComments,
  };
  return stats;
};
const getAgentStats = async (userId: string) => {
  const totalProperties = await Property.countDocuments({ addedBy: userId });
  const totalBlogAdded = await Blog.countDocuments({ userId: userId });
  const totalBlogComments = await BlogComment.countDocuments({
    userId: userId,
  });
  const totalPropertyComments = await Comment.countDocuments({
    userId: userId,
  });
  const totalFavoriteProperties = await Property.countDocuments({
    favoriteBy: userId,
  });

  const stats = {
    totalProperties,
    totalFavoriteProperties,
    totalBlogAdded,
    totalBlogComments,
    totalPropertyComments,
  };
  return stats;
};

const filterStats =async()=>{
  const maxPrice = await Property.find().sort({price:-1}).limit(1).select('price');
  const minPrice = await Property.find().sort({price:1}).limit(1).select('price');
  const maxArea = await Property.find().sort({area:-1}).limit(1).select('area');
  const minArea = await Property.find().sort({area:1}).limit(1).select('area');
  const cities= await Property.distinct('location.city');
  const result=({
    maxPrice:maxPrice[0].price,
    minPrice:minPrice[0].price,
    maxArea:maxArea[0].area,
    minArea:minArea[0].area,
    cities
  });
  return result;

}



export const StatsServices = {
  getAdminStats,
  getUserStats,
  getAgentStats,
  filterStats
};
