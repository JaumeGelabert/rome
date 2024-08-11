export default function ShowDate() {
  const formattedDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const capitalizedDate =
    formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

  return (
    <>
      <p className="text-sm text-neutral-500">{capitalizedDate}</p>
    </>
  );
}
