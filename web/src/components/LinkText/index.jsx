import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";

export function LinkText({ className, children, ...rest }) {
  return (
    <Link
      {...rest}
      className={cn(
        "flex items-center justify-center gap-2 text-mr text-pink hover:brightness-90",
        className,
      )}
    >
      {children}
    </Link>
  );
}
