import { cn } from "@/lib/utils";

export function Label({
  className,
  children,
  htmlFor,
}: {
  className?: string;
  children: React.ReactNode;
  htmlFor?: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn("mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300", className)}
    >
      {children}
    </label>
  );
}
