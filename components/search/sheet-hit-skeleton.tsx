"use client";

export function SheetHitSkeleton() {
  return (
    <div className="flex items-start animate-pulse text-border justify-start group gap-3 my-1">
      <div className="size-16 bg-current group-hover:shadow transition-shadow ease-out rounded overflow-hidden relative" />
      <div className="flex grow flex-col gap-1.5">
        <span className="bg-current z-10 h-4 w-1/2" />
        <span className="bg-current z-10 h-5 w-2/3" />
        <span className="bg-current z-10 mt-1.5 mb-[3px] h-5 w-16" />
      </div>
    </div>
  );
}
