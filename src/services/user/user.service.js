import bcrypt from "bcrypt";
import { dbPool } from "../../db.js";
const SALT_ROUNDS = 10;
const hashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  return hashedPassword;
};

const addUserInDB = async (user) => {
  try {
    const { email, password, display_name } = user;
    const passwordHash = await hashPassword(password);
    const text =
      "INSERT INTO users(email, password_hash, display_name) VALUES($1, $2, $3) returning id, email, display_name";
    const values = [email, passwordHash, display_name];
    const res = await dbPool.query(text, values);
    return res?.rows[0];
  } catch (err) {
    if (err?.code == 23505 && err?.severity === "ERROR") {
      return {
        err: "DuplicateErr",
        constraint: err?.constraint,
      };
    }
  }
};

const findUserByEmail = async (email) => {
  try {
    const query =
      "SELECT email, display_name, acc_status, password_hash from users where LOWER(email) = LOWER($1) ";
    const values = [email];
    const res = await dbPool.query(query, values);
    return res.rows[0];
  } catch (err) {}
};

const authenticateUser = async (password, hash) => {
  try {
    const isPasswordValid = await bcrypt.compare(password, hash);
    return isPasswordValid;
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      status: "error",
    });
  }
};

export const UserService = {
  addUserInDB,
  findUserByEmail,
  authenticateUser,
};
