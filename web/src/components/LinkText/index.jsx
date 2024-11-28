import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";

export function LinkText({ title, className, icon: Icon, ...rest }) {
  return (
    <Link
      {...rest}
      className={cn(
        "flex items-center justify-center gap-2 text-pink hover:brightness-90",
        className,
      )}
    >
      {Icon && <Icon size={16} weight="bold" />}
      {title}
    </Link>
  );
}
