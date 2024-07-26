import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-slate-200 bg-transparent px-3 py-2 text-sm text-white ring-offset-white file:border-0 file:text-sm file:font-medium placeholder:text-slate-200  focus-visible:ring-transparent disabled:cursor-not-allowed disabled:opacity-50  dark:border-slate-800 dark:placeholder:text-slate-400 ",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
