import * as z from "zod";

export const registerUserValidation = (req, res, next) => {
  const registeredUserSchema = z.object({
    display_name: z.string().min(3),
    email: z.email(),
    password_hash: z.string(),
  });
  let result = registeredUserSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({
      status: "Failed",
      message: "Please chek input for ",
    });
  } else {
    next();
  }
};
