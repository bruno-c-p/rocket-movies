import { cn } from "../../lib/utils";

export function Button({
  title,
  loading = false,
  className,
  icon: Icon,
  variant = "primary",
  ...rest
}) {
  return (
    <button
      type="button"
      disabled={loading}
      className={cn(
        "w-full border-0 py-4 px-4 sm:px-8 rounded-lg font-medium disabled:opacity-50 hover:brightness-90 flex items-center gap-2 justify-center",
        className,
        {
          "bg-pink text-background": variant === "primary",
          "bg-[#0D0C0F] text-pink": variant === "secondary",
        },
      )}
      {...rest}
    >
      {Icon && <Icon size={16} weight="bold" />}
      {loading ? "Carregando..." : title}
    </button>
  );
}
