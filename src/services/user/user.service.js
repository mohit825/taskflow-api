import bcrypt from "bcrypt";
import { dbPool } from "../../db.js";
const SALT_ROUNDS = 10;
const securePassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  return hashedPassword;
};

const addUserInDB = async (user) => {
  try {
    const { email, password_hash, display_name } = user;
    const passwordHash = await securePassword(password_hash);
    const text =
      "INSERT INTO users(email, password_hash, display_name) VALUES($1, $2, $3) returning id, email, display_name";
    const values = [email, passwordHash, display_name];
    const res = await dbPool.query(text, values);
    return res?.rows[0];
  } catch (err) {
    console.log(err.code, "err");
    if (err?.code == 23505 && err?.severity === "ERROR") {
      return {
        err: "DuplicateErr",
        constraint: err?.constraint,
      };
    }
  }
};

export const UserService = {
  addUserInDB,
};
