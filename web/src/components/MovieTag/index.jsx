import { Plus, X } from "@phosphor-icons/react";
import { forwardRef } from "react";
import { cn } from "../../lib/utils";

export const MovieTag = forwardRef(
  ({ isNew, value, onClick, ...rest }, ref) => {
    return (
      <div
        className={cn(
          "flex items-center border-none rounded-lg px-4 bg-[#262529] w-full",
          {
            "bg-[transparent] border-2 border-dashed border-base-label focus-within:border-solid focus-within:border-pink":
              isNew,
          },
        )}
      >
        <input
          ref={ref}
          className="w-full text-white bg-[transparent] border-none placeholder:text-base-label py-4 outline-none focus:placeholder:text-opacity-30"
          type="text"
          placeholder="Novo Marcador"
          value={value}
          readOnly={!isNew}
          {...rest}
        />
        <button className="text-pink" type="button" onClick={onClick}>
          {isNew ? (
            <Plus size={24} weight="bold" />
          ) : (
            <X size={24} weight="bold" />
          )}
        </button>
      </div>
    );
  },
);
