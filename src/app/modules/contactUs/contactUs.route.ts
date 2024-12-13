import { Router } from "express";
import { ContactUsController } from "./contactUs.controller";
import validateRequest from "../../middlewares/validateRequest";
import { ContactUsValidationSchema } from "./contactUs.validation";

const route =Router();
route.get('/',ContactUsController.getAllContactUs);
route.post('/',validateRequest(ContactUsValidationSchema),ContactUsController.createContactUs);
route.get('/:id',ContactUsController.getContactUsById);
route.put('/:id',ContactUsController.updateContactUsById);
route.delete('/:id',ContactUsController.deleteContactUsById);
export const ContactUsRoutes = route;