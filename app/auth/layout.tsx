import RomeLogo from "@/components/brand/RomeLogo";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <span className="absolute left-4 top-4">
        <RomeLogo />
      </span>
      <div className="bg-falseWhite flex h-dvh flex-row items-start justify-center pt-52">
        {children}
      </div>
    </>
  );
}
