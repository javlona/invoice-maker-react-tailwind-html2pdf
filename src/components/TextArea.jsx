import { twMerge } from "tailwind-merge";

function TextArea({ className, placeholder, value, onChange }) {
  let style = twMerge(
    `inline-block overflow-hidden pt-2 pr-3 bg-transparent text-neutral-600 rounded-sm placeholder:text-neutral-400 transition-all duration-100 ease-in-out border-[1px] border-dotted border-transparent hover:bg-amber-100 focus:bg-amber-100 focus:outline-none focus:ring-2 focus:ring-slate-400 w-full h-9 text-xs resize-none align-middle ${className}`
  );

  return (
    <textarea
      className={style}
      placeholder={placeholder}
      value={value || ""}
      onChange={onChange ? (e) => onChange(e.target.value) : null}
    />
  );
}

export default TextArea;
