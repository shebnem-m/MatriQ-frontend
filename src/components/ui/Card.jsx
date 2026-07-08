// src/components/ui/Card.jsx

export default function Card({ image, children, className = "" }) {
  return (
    <div className={`bg-paper rounded-sm overflow-hidden border border-ink/10 ${className}`}>
      {image && <div className="h-24">{image}</div>}
      <div className="p-4">{children}</div>
    </div>
  );
}