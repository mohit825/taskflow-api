import { dbPool } from "../db.js";

const addUserInDB = async (user) => {
  try {
    const { email, password, name } = user;
    const text =
      "INSERT INTO users(email, password_hash, display_name) VALUES($1, $2, $3) returning *";
    const values = [email, password, name];
    const res = await dbPool.query(text, values);
    return res?.rows[0];
  } catch (err) {
    if (err?.error?.includes("duplicate")) {
      return 409;
    }
  }
};

export const UserService = {
  addUserInDB,
};
