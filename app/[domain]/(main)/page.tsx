export default async function Home(props: { params: Promise<{ domain: string }> }) {
  const { domain } = await props.params;

  // return <HomeLayout category={tab} region={region} />;
}
