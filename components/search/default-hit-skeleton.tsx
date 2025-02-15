export function DefaultHitSkeleton() {
  return (
    <div className="flex flex-col items-start animate-pulse text-border justify-start group gap-2">
      <div className="aspect-square w-full min-h-32 group-hover:border-border border transition border-transparent bg-current group-hover:shadow ease-out rounded-lg overflow-hidden relative" />

      <div className="flex gap-2">
        <div className="rounded-full size-6 bg-current" />
        <div className="rounded-full size-6 bg-current" />
        <div className="rounded-full size-6 bg-current" />
      </div>

      <div className="flex w-full flex-col gap-1.5">
        <span className="bg-current rounded z-10 h-3 w-1/2" />
        <span className="bg-current rounded z-10 h-4 w-2/3" />
        <span className="bg-current rounded z-10 mt-1.5 mb-1 h-4 w-16" />
      </div>
    </div>
  );
}
