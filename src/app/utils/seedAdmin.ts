import { startSession } from "mongoose";
import config from "../config";
import Auth from "../modules/Auth/auth.model";
import { User } from "../modules/User/user.model";
import { USER_ROLE } from "../modules/User/user.utils";

export const adminSeed = async () => {
  const session = await startSession();

  try {
    session.startTransaction();

    // Check if admin exists in the Auth collection
    const existingAuth = await Auth.findOne(
      { email: config.admin_email },
      null,
      { session },
    );

    if (!existingAuth) {
      // Create the Auth document
      const newAuth = await Auth.create(
        [
          {
            email: config.admin_email,
            password: config.admin_password,
            provider: config.admin_provider,
            role: USER_ROLE.admin,
          },
        ],
        { session },
      );

      // Create the User document
      await User.create(
        [
          {
            auth: newAuth[0]._id,
            firstName: config.admin_first_name,
            secondName: config.admin_second_name,
            image: config.admin_image,
            role: USER_ROLE.admin,
            paymentHistory: [],
            property: [],
          },
        ],
        { session },
      );

      console.log("Admin created successfully...");
    } else {
      console.log("Admin already exists, skipping seeding...");
    }

    // Commit the transaction
    await session.commitTransaction();
    console.log("Seeding completed...");
  } catch (error) {
    await session.abortTransaction();
    console.error("Error in seeding:", error);
  } finally {
    session.endSession();
  }
};
