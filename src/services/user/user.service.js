import { dbPool } from "../../db.js";

const addUserInDB = async (user) => {
  try {
    const { email, password_hash, display_name } = user;
    const text =
      "INSERT INTO users(email, password_hash, display_name) VALUES($1, $2, $3) returning id, email, display_name";
    const values = [email, password_hash, display_name];
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
