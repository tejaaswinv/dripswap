export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen overflow-hidden bg-black text-white">
      {/* background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(129,140,248,0.18),transparent_26%),radial-gradient(circle_at_15%_55%,rgba(96,165,250,0.14),transparent_24%),radial-gradient(circle_at_85%_72%,rgba(59,130,246,0.12),transparent_22%)]" />

      {/* grid overlay */}
      <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.2)_1px,transparent_1px)] [background-size:70px_70px]" />

      <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-6 md:px-10 lg:px-12">
        {children}
      </div>
    </div>
  );
}