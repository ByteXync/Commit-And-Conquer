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