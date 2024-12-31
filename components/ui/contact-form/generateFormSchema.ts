import z from "zod";
import { Field } from ".";

const phoneRegExp =
  /(?:([+]\d{1,4})[-.\s]?)?(?:[(](\d{1,3})[)][-.\s]?)?(\d{1,4})[-.\s]?(\d{1,4})[-.\s]?(\d{1,9})/g;

export const generateFieldSchema = (field: Field) => {
  if (field.fieldType === "textarea") {
    return field.required ? z.string().min(1, "This field is required") : z.string();
  }

  if (field.fieldType === "dropdown") {
    return field.required ? z.string().min(1, "This field is required") : z.string();
  }

  if (field.fieldType === "checkbox") {
    if (field.options && field.options.length > 1) {
      // Multiple checkboxes
      return field.required
        ? z.array(z.string()).min(1, "This field is required")
        : z.array(z.string()).optional();
    } else {
      // Single checkbox
      return field.required
        ? z.boolean().refine((val) => val === true, "This field is required")
        : z.boolean().optional();
    }
  }

  if (field.fieldType === "radio") {
    return field.required ? z.string().min(1, "This field is required") : z.string();
  }

  if (field.fieldType === "text") {
    return field.required ? z.string().min(1, "This field is required") : z.string();
  }

  if (field.fieldType === "email") {
    return field.required
      ? z.string().min(1, "This field is required").email("Please enter a valid email address")
      : z.string().email("Please enter a valid email address").or(z.literal(""));
  }

  if (field.fieldType === "phone") {
    return field.required
      ? z
          .string()
          .min(1, "This field is required")
          .regex(phoneRegExp, "Please enter a valid phone number")
      : z.string().regex(phoneRegExp, "Please enter a valid phone number").or(z.literal(""));
  }

  return z.string();
};
