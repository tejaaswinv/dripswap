import { cookies } from "next/headers";

export default async function Navbar() {
  const cookieStore = await cookies();
  const email = cookieStore.get("dripswap_user_email")?.value;

  return (
    <header className="flex items-center justify-between rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 backdrop-blur-2xl">
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-full border border-white/15 bg-white/5" />
        <div>
          <p className="text-sm font-semibold tracking-[0.28em] text-white/75">
            DRIPSWAP
          </p>
          <p className="text-xs text-white/35">fashion, but shared</p>
        </div>
      </div>

      <div className="flex gap-4 text-sm text-white/60">
        <a href="/feed" className="hover:text-white">Feed</a>

        {email ? (
          <>
            <a href="/borrow" className="hover:text-white">Borrow</a>
            <a href="/lend" className="hover:text-white">Lend</a>
            <a href="/api/logout" className="hover:text-white">Logout</a>
          </>
        ) : (
          <>
            <a href="/login" className="hover:text-white">Login</a>
            <a href="/signup" className="hover:text-white">Sign Up</a>
          </>
        )}
      </div>
    </header>
  );
}