// Signature motif: three concentric rings evoking the coffee ceremony's
// three rounds — abol, tona, baraka.
export default function CoffeeRings({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="100" cy="100" r="90" stroke="#e8a33d" strokeWidth="1.5" opacity="0.35" />
      <circle cx="100" cy="100" r="62" stroke="#c1432d" strokeWidth="1.5" opacity="0.4" />
      <circle cx="100" cy="100" r="34" stroke="#f2e9d8" strokeWidth="1.5" opacity="0.5" />
    </svg>
  );
}
