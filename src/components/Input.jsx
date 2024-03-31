function Input({ value, onChange, placeholder, className, type, accept }) {
  let style = `inline-block py-1 pr-3 mb bg-transparent text-neutral-600 rounded-sm placeholder:text-neutral-400 transition-all duration-100 ease-in-out border-[1px] border-dotted border-transparent hover:bg-amber-100 focus:bg-amber-100 focus:outline-none focus:ring-2 focus:ring-slate-400 w-full ${className}`;

  return (
    <input
      type={type || "text"}
      accept={accept || ""}
      className={style}
      placeholder={placeholder || ""}
      value={value || ""}
      onChange={onChange ? (e) => onChange(e.target.value) : null}
    />
  );
}

export default Input;
