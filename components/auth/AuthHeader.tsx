interface AuthHeaderProps {
  title: string;
  subtitle?: string;
}

export default function AuthHeader({ title, subtitle }: AuthHeaderProps) {
  return (
    <span className="mb-10 text-center">
      <p className="text-4xl font-semibold">{title}</p>
      <p className="text-base text-slate-500">{subtitle}</p>
    </span>
  );
}
