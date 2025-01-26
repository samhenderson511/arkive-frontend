"use client";

import { cn } from "@/lib";
import { transitions } from "@/lib/transitions";
import { motion, useInView } from "framer-motion";
import { Fragment, useRef, type ComponentProps } from "react";
import { useMediaQuery } from "usehooks-ts";

interface Props extends ComponentProps<typeof motion.div> {
  transitionName: keyof typeof transitions | undefined;
  transitionDelay?: number;
  waitForInView?: boolean;
}

export const Transition = ({
  children,
  className,
  variants,
  waitForInView,
  transitionDelay,
  transitionName,
  ...rest
}: Props) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });
  const mobile = useMediaQuery("(max-width: 640px)");

  const transition = transitions[transitionName || "none"];

  if (!transition) {
    return <Fragment>{children as any}</Fragment>;
  }

  return (
    <motion.div
      className={cn(
        "flex-col gap-8 sm:gap-20 items-center [&:has(.z-10)]:z-10 [&:has(.z-20)]:z-20 flex w-full",
        className
      )}
      ref={ref}
      animate={
        waitForInView ?
          isInView ?
            "show"
          : "hide"
        : "show"
      }
      variants={{
        show: {
          transition: {
            duration: 0.3,
            ease: "easeIn",
            delay: mobile ? 0 : transitionDelay,
          },
          ...transition.show,
          ...variants?.show,
        },
        hide: {
          transition: {
            duration: 0.3,
            ease: "easeOut",
            delay: mobile ? 0 : transitionDelay,
          },
          ...transition.hide,
          ...variants?.hide,
        },
      }}
      initial={"hide"}
      {...rest}
    >
      {children}
    </motion.div>
  );
};
