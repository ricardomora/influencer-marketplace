import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center rounded-lg text-sm font-medium transition-colors outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2",
        outline:
          "border border-gray-300 bg-white px-4 py-2 text-gray-900 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100",
        ghost: "px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800",
      },
      size: {
        default: "",
        sm: "px-3 py-1.5 text-xs",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export function Button({
  className,
  variant,
  size,
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}
