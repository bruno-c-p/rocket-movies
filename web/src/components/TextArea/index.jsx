export function TextArea({ ...rest }) {
  return (
    <textarea
      className="w-full min-h-36 bg-base-input text-sr text-base-title resize-none rounded-lg p-7 placeholder:text-base-label outline-none focus:placeholder:opacity-30 transition-opacity focus:ring-1 focus:ring-pink"
      {...rest}
    />
  );
}
