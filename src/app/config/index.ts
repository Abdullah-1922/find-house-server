import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join((process.cwd(), ".env")) });

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUND,
  admin_email: process.env.ADMIN_EMAIL,
  admin_password: process.env.ADMIN_PASSWORD,
  admin_first_name: process.env.ADMIN_FIRST_NAME,
  admin_second_name: process.env.ADMIN_SECOND_NAME,
  admin_provider: process.env.ADMIN_PROVIDER,
  admin_image: process.env.ADMIN_IMAGE,
};
