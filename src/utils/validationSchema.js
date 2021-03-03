import { object, string } from "yup";

// simple validation schema for registration form
export const registerUserSchema = object().shape({
  name: string().required("Name is required"),
  username: string().required("Username is required"),
  password: string().required("Password is required"),
});

// simple validation schema for message input
export const messageInputSchema = object().shape({
  massage: string().required("Message is required"),
});
