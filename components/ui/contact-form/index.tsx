import slugify from "slugify";
import { ClientForm } from "./client";

export type FieldType = "text" | "email" | "phone" | "textarea" | "dropdown" | "checkbox" | "radio";
export type Field = {
  fieldType: FieldType;
  label: string;
  fieldId?: string;
  helpText?: string;
  placeholder?: string;
  required?: boolean;
  options?: { label: string; value: string }[];
};

export interface ContactFormProps {
  id?: string;
  formFields: Field[];
  senderName?: string;
  policies?: {
    policy: string;
  }[];
  submitButtonText?: string;
  successMessage?: string;
  errorMessage?: string;
  submissionEmail: string;
  formName: string;
  confirmationEmailField?: string;
  confirmationEmailTemplate?: string;
  className?: string;
  afterSubmit?: () => void;
}

export function getFieldId(field: Field | undefined) {
  if (!field) return "";
  return field.fieldId || slugify(field.label, { lower: true, strict: true });
}

export async function ContactForm(data: ContactFormProps) {
  return <ClientForm {...data} />;
}
