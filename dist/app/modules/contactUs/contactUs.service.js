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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactUsServices = void 0;
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const contactUs_model_1 = require("./contactUs.model");
// Create a new contact
const createContactUs = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield contactUs_model_1.ContactUS.create(payload, { new: true });
    return result;
});
// Get all contacts
const getAllContactUs = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const contactQuery = new QueryBuilder_1.default(contactUs_model_1.ContactUS.find(), query)
        .search(["firstName", "lastName", "email", "message"])
        .sort()
        .fields()
        .filter()
        .paginate();
    const result = yield contactQuery.modelQuery;
    const meta = yield contactQuery.countTotal();
    return { result, meta };
});
// Get a single contact by ID
const getContactUsById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield contactUs_model_1.ContactUS.findById(id);
    return result;
});
// Update a contact by ID
const updateContactUsById = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield contactUs_model_1.ContactUS.findByIdAndUpdate(id, payload, { new: true });
    return result;
});
// Delete a contact by ID
const deleteContactUsById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield contactUs_model_1.ContactUS.findByIdAndDelete(id);
    return result;
});
exports.ContactUsServices = {
    createContactUs,
    getAllContactUs,
    getContactUsById,
    updateContactUsById,
    deleteContactUsById,
};
