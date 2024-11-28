import { cn } from "../../lib/utils";

export function Button({ title, loading = false, className, ...rest }) {
  return (
    <button
      type="button"
      disabled={loading}
      className={cn(
        "w-full bg-pink text-background h-14 border-0 py-0 px-4 rounded-lg font-medium disabled:opacity-50 hover:brightness-90",
        className,
      )}
      {...rest}
    >
      {loading ? "Carregando..." : title}
    </button>
  );
}
