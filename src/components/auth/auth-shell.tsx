export default function AuthShell({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(129,140,248,0.18),transparent_26%),radial-gradient(circle_at_15%_55%,rgba(96,165,250,0.14),transparent_24%),radial-gradient(circle_at_85%_72%,rgba(59,130,246,0.12),transparent_22%)]" />
      <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.2)_1px,transparent_1px)] [background-size:70px_70px]" />

      <div className="relative mx-auto flex min-h-screen max-w-6xl items-center px-6 py-10 md:px-10">
        <div className="grid w-full items-center gap-10 md:grid-cols-[1fr_1.05fr]">
          <div>
            <p className="mb-3 text-sm uppercase tracking-[0.28em] text-white/40">
              {eyebrow}
            </p>

            <h1 className="max-w-xl text-4xl font-black leading-tight md:text-5xl">
              {title}
            </h1>

            <p className="mt-5 max-w-lg text-base leading-8 text-white/55">
              {subtitle}
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.55)] backdrop-blur-2xl md:p-8">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}