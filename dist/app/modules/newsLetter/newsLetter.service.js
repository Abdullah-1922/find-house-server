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
exports.getAllSubscribers = exports.subscribeToNewsletter = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const newsletter_model_1 = __importDefault(require("./newsletter.model"));
const subscribeToNewsletter = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const newsletter = new newsletter_model_1.default(data);
    return yield newsletter.save();
});
exports.subscribeToNewsletter = subscribeToNewsletter;
const getAllSubscribers = (query) => __awaiter(void 0, void 0, void 0, function* () {
    //   return await Newsletter.find().sort({ subscribedAt: -1 }); 
    const newsletterQuery = new QueryBuilder_1.default(newsletter_model_1.default.find().sort({ subscribedAt: -1 }), query);
    const subscribers = yield newsletterQuery.modelQuery;
    const meta = yield newsletterQuery.countTotal();
    return { subscribers, meta };
});
exports.getAllSubscribers = getAllSubscribers;
