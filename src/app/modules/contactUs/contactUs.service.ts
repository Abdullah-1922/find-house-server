import QueryBuilder from "../../builder/QueryBuilder";
import { TContactUs } from "./contactUs.interface";
import { ContactUS } from "./contactUs.model";

// Create a new contact
const createContactUs = async (payload: TContactUs) => {
  const result = await ContactUS.create(payload,{new:true});
  return result;
};

// Get all contacts
const getAllContactUs = async (query: Record<string, unknown>) => {
  const contactQuery = new QueryBuilder(ContactUS.find(), query)
    .search(["firstName", "lastName", "email", "message"])
    .sort()
    .fields()
    .filter()
    .paginate();

  const result = await contactQuery.modelQuery;
  const meta = await contactQuery.countTotal();
  return { result, meta };
};

// Get a single contact by ID
const getContactUsById = async (id: string) => {
  const result = await ContactUS.findById(id);
  return result;
};

// Update a contact by ID
const updateContactUsById = async (id: string, payload: TContactUs) => {
  const result = await ContactUS.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

// Delete a contact by ID
const deleteContactUsById = async (id: string) => {
  const result = await ContactUS.findByIdAndDelete(id);
  return result;
};

export const ContactUsServices = {
  createContactUs,
  getAllContactUs,
  getContactUsById,
  updateContactUsById,
  deleteContactUsById,
};
