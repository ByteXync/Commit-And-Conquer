
import * as React from "react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const textareaVariants = cva(
  "resize-none border rounded-md p-2 text-sm transition-colors",
  {
    variants: {
      variant: {
        default: "border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200",
        error: "border-red-500 focus:border-red-500 focus:ring focus:ring-red-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: VariantProps<typeof textareaVariants>["variant"];
}

const Textarea: React.FC<TextareaProps> = ({ className, variant, ...props }) => {
  return (
    <textarea
      className={cn(textareaVariants({ variant }), className)}
      {...props}
    />
  );
};

export { Textarea };
=======
import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }

