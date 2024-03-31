function Span({ children, className }) {
  let style = `inline-block py-1 pr-3 mb bg-transparent text-neutral-600 rounded-sm transition-all duration-100 ease-in-out border-[1px] border-dotted w-full ${className}`;

  return <span className={style}>{children}</span>;
}

export default Span;
