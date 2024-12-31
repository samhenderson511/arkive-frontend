"use server";

import "server-only";

import sendGrid from "@sendgrid/mail";
import { Field, getFieldId } from ".";

export async function onSubmit({
  senderName,
  values,
  submissionEmail,
  formFields,
  formName,
  domain,
  confirmationEmailField,
  confirmationEmailTemplate,
}: {
  senderName?: string;
  values: Record<string, string | string[] | boolean>;
  formFields: Field[];
  domain: string;
  submissionEmail: string;
  formName: string;
  confirmationEmailField?: string;
  confirmationEmailTemplate?: string;
}) {
  if (!process.env.SENDGRID_API_KEY) {
    throw new Error("SENDGRID_API_KEY is not set");
  }

  if (!process.env.SENDGRID_FROM_EMAIL) {
    throw new Error("SENDGRID_FROM_EMAIL is not set");
  }

  sendGrid.setApiKey(process.env.SENDGRID_API_KEY);

  const emailField = values[
    getFieldId(formFields.find((field) => field.fieldType === "email"))
  ] as string;

  const replaceHandlebars = (template: string | undefined) => {
    if (!template) return;

    return template.replaceAll(/{{([^}]+)}}/g, (match, fieldId) => {
      const fieldValue = values[fieldId];
      return fieldValue !== undefined ? String(fieldValue) : match;
    });
  };

  const dynamicConfirmationEmail = replaceHandlebars(confirmationEmailField);
  const dynamicConfirmationEmailTemplate = replaceHandlebars(confirmationEmailTemplate);
  const email = dynamicConfirmationEmail || emailField;

  const html = formFields
    .map((field) => {
      return `<div><strong>${field.label}</strong>: ${values[getFieldId(field)]}</div>`;
    })
    .join("");

  const message: sendGrid.MailDataRequired = {
    to: submissionEmail.split(",").map((email) => email.trim()),
    from: {
      name: senderName || "Web Form Submission",
      email: process.env.SENDGRID_FROM_EMAIL,
    },
    replyTo: email ? { email } : undefined,
    subject: `New ${formName} submission on SHUX Dev Tools from ${email}`,
    text: formFields.map((field) => `${field.label}: ${values[getFieldId(field)]}`).join("\n"),
    html: `
    <html>
      <body>
        <h1>New ${formName} submission on SHUX Dev Tools from ${email}</h1>
        ${html}
      </body>
    </html>`,
  };

  await sendGrid
    .send(message)
    .then(() => {
      console.log("Email sent to:", submissionEmail);
      console.log("Message:", message);
    })
    .catch((error) => {
      console.error("Error sending email:", JSON.stringify(error, null, 2));
      console.error("Message:", message);
      throw error;
    });

  if (dynamicConfirmationEmailTemplate && dynamicConfirmationEmail) {
    const confirmationMessage: sendGrid.MailDataRequired = {
      to: dynamicConfirmationEmail.split(",").map((email) => email.trim()),
      from: {
        name: senderName || "Web Form Submission",
        email: process.env.SENDGRID_FROM_EMAIL,
      },
      subject: `New ${formName} submission on ${decodeURIComponent(domain)}`,
      text: dynamicConfirmationEmailTemplate,
      html: dynamicConfirmationEmailTemplate,
    };

    await sendGrid
      .send(confirmationMessage)
      .then(() => {
        console.log("Confirmation email sent to:", dynamicConfirmationEmail);
        console.log("Confirmation message:", confirmationMessage);
      })
      .catch((error) => {
        console.error("Error sending confirmation email:", JSON.stringify(error, null, 2));
        console.error("Confirmation message:", confirmationMessage);
        throw error;
      });
  }
}
