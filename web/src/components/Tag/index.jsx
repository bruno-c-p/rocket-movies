export function Tag({ name, ...rest }) {
  return (
    <li
      className="bg-base-tag text-tag text-tag-name rounded-lg px-4 py-1"
      {...rest}
    >
      {name}
    </li>
  );
}
