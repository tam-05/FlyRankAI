/**
 * SkeletonGrid — Server Component
 * Shimmer loading placeholders used inside Suspense boundaries.
 */
export default function SkeletonGrid({ cols = 4, rows = 1 }) {
  const count = cols * rows;
  return (
    <div
      className="grid gap-4"
      style={{
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
      }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="skeleton h-28 rounded-2xl" />
      ))}
    </div>
  );
}
