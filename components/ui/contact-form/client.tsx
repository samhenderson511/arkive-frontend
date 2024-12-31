"use client";

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Switch,
  Text,
} from "@/components";
import { cn } from "@/lib";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconAlertCircle, IconCircleCheck, IconSend } from "@tabler/icons-react";
import { useParams, usePathname } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import slugify from "slugify";
import z, { ZodRawShape } from "zod";
import { ContactFormProps, getFieldId } from ".";
import { generateFieldSchema } from "./generateFormSchema";
import { getFieldComponent } from "./getFieldComponent";
import { onSubmit } from "./onSubmit";

/** To add new fields, add a new condition to the getFieldComponent function, and the generateFieldSchema function */

export function ClientForm({
  senderName,
  errorMessage,
  formFields,
  policies,
  submissionEmail,
  submitButtonText,
  successMessage,
  formName,
  confirmationEmailField,
  confirmationEmailTemplate,
  className,
  id,
  afterSubmit,
}: ContactFormProps) {
  const [parent] = useAutoAnimate();
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
  const [isErrorDialogOpen, setIsErrorDialogOpen] = useState(false);
  const { domain } = useParams() as { domain: string };
  const slug = usePathname();

  const formSchema = z
    .object({})
    .extend(
      formFields?.reduce((acc, field) => {
        acc[getFieldId(field)] = generateFieldSchema(field);
        return acc;
      }, {} as ZodRawShape)
    )
    .extend(
      policies?.reduce((acc, { policy }) => {
        acc[slugify(policy, { lower: true, strict: true })] = z
          .boolean()
          .refine((val) => val === true, {
            message: "You must agree to this policy",
          });
        return acc;
      }, {} as ZodRawShape) || {}
    );

  const defaultValues = {
    ...formFields?.reduce((acc, field) => {
      const fieldName = getFieldId(field);

      if (field.fieldType === "checkbox") {
        acc[fieldName] = [];
      } else {
        acc[fieldName] = "";
      }

      return acc;
    }, {} as Record<string, string | string[] | boolean>),
    ...(policies && policies.length > 0
      ? policies.reduce((acc, { policy }) => {
          acc[slugify(policy, { lower: true, strict: true })] = false;
          return acc;
        }, {} as Record<string, boolean>)
      : {}),
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  return (
    <>
      <Form {...form}>
        <form
          id={id}
          ref={parent}
          onSubmit={form.handleSubmit(
            async (values) =>
              await onSubmit({
                values,
                senderName,
                submissionEmail,
                formFields,
                domain,
                formName: formName || slug,
                confirmationEmailField,
                confirmationEmailTemplate,
              })
                .then(() => {
                  setIsSuccessDialogOpen(true);
                  form.reset();
                  afterSubmit?.();
                })
                .catch((err) => {
                  console.error(err);
                  setIsErrorDialogOpen(true);
                }),
            (errors) => console.log(errors)
          )}
          className={cn("flex flex-col w-full px-4 gap-5", className)}
        >
          {formFields?.map((fieldConfig) => (
            <FormField
              key={fieldConfig.label}
              control={form.control}
              name={getFieldId(fieldConfig)}
              render={({ field }) => {
                const Field = getFieldComponent({ fieldConfig, field });

                return (
                  <FormItem>
                    <FormLabel>
                      {fieldConfig.label} {fieldConfig.required && "*"}
                    </FormLabel>
                    <FormControl>{Field}</FormControl>
                    {fieldConfig.helpText && (
                      <Text element="span" className="text-sm leading-none text-muted-foreground">
                        {fieldConfig.helpText}
                      </Text>
                    )}
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          ))}

          {Boolean(policies?.length) && (
            <div
              key={"marketing"}
              className="flex flex-col p-4 py-4 rounded-lg gap-5 border border-border"
            >
              {policies?.map(({ policy }) => (
                <FormField
                  key={policy}
                  control={form.control}
                  name={slugify(policy, { lower: true, strict: true })}
                  render={({ field }) => (
                    <>
                      <FormItem className="flex flex-row items-center justify-between space-y-0">
                        <FormLabel className="flex-grow">{policy}</FormLabel>
                        <FormControl>
                          <Switch
                            {...field}
                            checked={field.value as boolean}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                      <FormMessage />
                    </>
                  )}
                />
              ))}
            </div>
          )}

          <Button className="w-max place-self-center mt-2 gap-3" type="submit">
            {submitButtonText || "Submit"} <IconSend className="size-4" />
          </Button>
        </form>
      </Form>

      <Dialog open={isSuccessDialogOpen} onOpenChange={setIsSuccessDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex gap-3 items-center">
              <IconCircleCheck className="text-emerald-500 size-6" /> Success
            </DialogTitle>
            <DialogDescription>
              {successMessage || "Thank you for your submission, we will be in touch shortly."}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Dialog open={isErrorDialogOpen} onOpenChange={setIsErrorDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex gap-3 items-center">
              <IconAlertCircle className="text-rose-500 size-6" /> Error
            </DialogTitle>
            <DialogDescription>
              {errorMessage || "There was an error with your submission, please try again."}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
