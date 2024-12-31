export const NavSkeleton = () => (
  <>
    <header className="fixed animate-pulse z-50 flex items-center justify-center w-full gap-1 pt-16 border-b bg-background -top-16 md:top-0 md:pt-0 lg:border-none border-border lg:relative md:h-14 md:px-6">
      <div className="flex flex-row items-center justify-between flex-1 md:gap-1 max-w-8xl">
        <div className="flex items-center justify-center order-2 w-full h-0 lg:-mx-1 md:border-none min-w-max md:flex-1 md:justify-start divide-border md:order-1 md:h-full"></div>
        <a className="flex items-center order-1 h-12 px-4 shrink-0 md:order-2">
          <div className="relative flex h-10 max-w-[7rem] items-center z-0">
            <SVGSkeleton className="!relative !w-auto h-5" />
          </div>
        </a>
        <div className="flex items-center justify-end flex-1 order-3 h-full gap-1 -mx-1">
          <a className="flex items-center h-full px-4 shrink-0">
            <Skeleton className="w-[80px] max-w-full" />
          </a>
        </div>
      </div>
    </header>
    <header className="top-0 z-50 justify-center hidden h-16 px-6 mx-auto border-border/50 border-y lg:flex animate-pulse bg-background">
      <nav className="flex items-center justify-between flex-1 h-full transition-colors max-w-8xl">
        <div className="flex items-center justify-between w-full h-full">
          <div className="items-center justify-between hidden h-full gap-4 sm:flex grow">
            <div>
              <ul className="flex items-center justify-center flex-1 gap-6">
                <Skeleton className="w-[96px] max-w-full" />
                <Skeleton className="w-[88px] max-w-full" />
                <Skeleton className="w-[64px] max-w-full" />
                <Skeleton className="w-[64px] max-w-full" />
                <Skeleton className="w-[48px] max-w-full" />
                <Skeleton className="w-[56px] max-w-full" />
              </ul>
            </div>
            <div className="flex items-center justify-end gap-4 grow">
              <div className="relative flex items-center justify-center h-9 w-9">
                <SVGSkeleton className="w-[20px] h-[20px]" />
              </div>
              <div className="relative flex items-center justify-center h-9 w-9">
                <SVGSkeleton className="w-[20px] h-[20px]" />
              </div>
              <div className="relative flex items-center justify-center h-9 w-9">
                <div className="flex items-center border px-1.5 h-5 transition-colors border-transparent absolute z-10 -top-2 -right-4">
                  <Skeleton className="w-[14px] max-w-full" />
                </div>
                <SVGSkeleton className="w-[20px] h-[20px]" />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute left-0 flex justify-center top-full"></div>
      </nav>
    </header>
    <div className="fixed bottom-0 z-50 flex items-stretch justify-center w-full lg:hidden bg-background">
      <nav className="flex items-center w-full max-w-xl p-1 justify-evenly">
        <a className="flex justify-center  px-4 py-2  !w-16 sm:!w-[4.75rem] relative shrink-0 pt-1 pb-0.5 !h-12 flex-col items-center gap-1">
          <Skeleton className="w-[32px] h-6 max-w-full" />
          <SVGSkeleton className="w-6 h-3" />
        </a>
        <a className="flex justify-center  px-4 py-2  !w-16 sm:!w-[4.75rem] relative shrink-0 pt-1 pb-0.5 !h-12 flex-col items-center gap-1">
          <Skeleton className="w-[32px] h-6 max-w-full" />
          <SVGSkeleton className="w-6 h-3" />
        </a>
        <a className="flex justify-center  px-4 py-2  !w-16 sm:!w-[4.75rem] relative shrink-0 pt-1 pb-0.5 !h-12 flex-col items-center gap-1">
          <Skeleton className="w-[32px] h-6 max-w-full" />
          <SVGSkeleton className="w-6 h-3" />
        </a>
        <a className="flex justify-center  px-4 py-2  !w-16 sm:!w-[4.75rem] relative shrink-0 pt-1 pb-0.5 !h-12 flex-col items-center gap-1">
          <Skeleton className="w-[32px] h-6 max-w-full" />
          <SVGSkeleton className="w-6 h-3" />
        </a>
        <a className="flex justify-center  px-4 py-2  !w-16 sm:!w-[4.75rem] relative shrink-0 pt-1 pb-0.5 !h-12 flex-col items-center gap-1">
          <Skeleton className="w-[32px] h-6 max-w-full" />
          <SVGSkeleton className="w-6 h-3" />
        </a>
      </nav>
    </div>
  </>
)

const Skeleton = ({ className }) => (
  <li
    aria-live="polite"
    aria-busy="true"
    className={
      className +
      " h-5 inline-flex bg-muted-foreground/25 rounded-md select-none"
    }
  />
)

const SVGSkeleton = ({ className }) => (
  <svg className={className + " rounded-md bg-muted-foreground/25"} />
)
