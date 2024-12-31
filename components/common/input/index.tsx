"use client"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import { ErrorMessage } from "@hookform/error-message"
import { IconEye, IconEyeOff } from "@tabler/icons-react"
import clsx from "clsx"
import React, { useEffect, useImperativeHandle, useState } from "react"
import { get } from "react-hook-form"
import { Label } from "../label"
import { Button } from "../button"

type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "placeholder"
> & {
  label: string
  errors?: Record<string, unknown>
  touched?: Record<string, unknown>
  name: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { type, name, className, label, errors, touched, required, ...props },
    ref
  ) => {
    const inputRef = React.useRef<HTMLInputElement>(null)
    const [inputType, setInputType] = useState(type)
    const [parent] = useAutoAnimate()
    useImperativeHandle(ref, () => inputRef.current!)

    const hasError = get(errors, name)
    const inputProps = {
      name: name,
      placeholder: " ",
      className: clsx(
        "rounded-sm min-h-[45px] pb-0 flex w-full px-4 mt-0 bg-transparent ring-1 autofill:!text-green-100 ring-inset focus:outline-none focus:ring transition  ease-out",
        hasError
          ? "ring-destructive-foreground text-destructive-foreground"
          : "ring-input text-foreground",
        type === "textarea" ? "min-h-[6rem] pt-5" : "pt-[0.925rem]",
        className
      ),
      ...props,
      ref: inputRef,
    }
    const changeInputType = () =>
      setInputType(inputType == "password" ? "text" : "password")

    return (
      <div className={"flex flex-col flex-1"} ref={parent}>
        <div className={clsx("relative z-0 w-full flex items-center text-sm")}>
          {type === "textarea" ? (
            <textarea {...(inputProps as any)} />
          ) : (
            <input type={inputType} {...inputProps} />
          )}
          {type === "password" && (
            <Button
              type="button"
              onClick={changeInputType}
              variant="ghost"
              size={"icon"}
              className="absolute right-1"
            >
              {inputType == "password" ? (
                <IconEye size={20} />
              ) : (
                <IconEyeOff size={20} />
              )}
            </Button>
          )}
          <Label
            htmlFor={name}
            onClick={() => inputRef.current?.focus()}
            className={clsx(
              "mx-3 px-1 transition-all absolute  ease-out top-[0.925rem] z-0 origin-0 bg-background",
              hasError ? "text-destructive-foreground" : "text-muted-foreground"
            )}
          >
            {label}
            {required && <span className="text-destructive-foreground">*</span>}
          </Label>
        </div>
        {hasError && (
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => {
              return (
                <div className="pt-1 text-xs font-semibold text-destructive-foreground">
                  <span>{message}</span>
                </div>
              )
            }}
          />
        )}
      </div>
    )
  }
)

Input.displayName = "Input"

export { Input }
