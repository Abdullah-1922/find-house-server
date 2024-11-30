/* eslint-disable @typescript-eslint/no-explicit-any */
import QueryBuilder from "../../builder/QueryBuilder";
import { INewsletter } from "./newsLetter.interface";
import Newsletter from "./newsletter.model";

export const subscribeToNewsletter = async (data: INewsletter) => {
  const newsletter = new Newsletter(data);
  return await newsletter.save();
};

export const getAllSubscribers = async (query:any) => {
//   return await Newsletter.find().sort({ subscribedAt: -1 }); 
const newsletterQuery = new QueryBuilder(Newsletter.find().sort({ subscribedAt: -1 }),query);
const subscribers = await newsletterQuery.modelQuery;
const meta = await newsletterQuery.countTotal();
return {subscribers, meta};

};
