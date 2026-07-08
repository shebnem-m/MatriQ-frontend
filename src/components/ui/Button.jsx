
const variants = {
  primary: "bg-rust text-chalk hover:bg-ink",
  secondary: "border border-ink/25 text-ink hover:border-ink",
  ghost: "text-ink/70 hover:text-ink",
};

export default function Button({ variant = "primary", children, className = "", ...props }) {
  return (
    <button
      className={`px-5 py-2.5 rounded-sm font-medium text-sm transition-colors ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}