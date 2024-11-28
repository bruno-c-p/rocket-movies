export function Input({ icon: Icon, ...rest }) {
  return (
    <div className="group w-full flex items-center bg-base-input text-gray300 px-4 rounded-lg transition-opacity">
      {Icon && <Icon size={20} className="text-base-label" />}
      <input
        className="text-base-title outline-none rounded-lg h-14 w-full p-3 bg-base-input placeholder:text-base-label focus:placeholder:opacity-30"
        {...rest}
      />
    </div>
  );
}
