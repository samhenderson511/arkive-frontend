export default async function PageLayout({
  children,
  params,
}: {
  params: Promise<{ domain: string }>;
  children: React.ReactNode;
}) {
  const { domain } = await params;

  return (
    <>
      {/* <AnnouncementBanner announcements={tab?.attributes?.Announcements} cookie={cookie} />

      <Suspense fallback={<NavSkeleton />}>
        <Nav
          tabs={tabs}
          pages={pages}
          storeTab={tabHandle}
          hasSaleItems={hasSaleItems}
          region={region}
          regionId={region.id}
        />
      </Suspense>

      <div className={clsx(tabs.length > 1 ? "mt-[6.55rem]" : "mt-12", "md:mt-0")}>{children}</div>

      <Footer tabs={tabs} pages={pages} storeTab={tabHandle} /> */}
    </>
  );
}
