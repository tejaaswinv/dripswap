import AppShell from "@/components/layout/app-shell";
import Navbar from "@/components/layout/navbar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const email = cookieStore.get("dripswap_user_email")?.value;

  if (!email) redirect("/login");

  const user = await db.user.findUnique({
    where: { email },
    include: {
      memberships: {
        include: { server: true },
      },
      ownedItems: true,
    },
  });

  if (!user) redirect("/login");

  return (
    <AppShell>
      <Navbar />

      <section className="mt-14">
        <h1 className="text-4xl font-black">
          Welcome back,
          <span className="text-indigo-300"> {user.name}</span>
        </h1>

        <p className="mt-3 text-white/60">
          Your private DripSwap network is live.
        </p>
      </section>

      <section className="mt-10 grid gap-5 md:grid-cols-2">
        {user.memberships.map((m) => (
          <div
            key={m.id}
            className="rounded-2xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-xl"
          >
            <h3 className="text-xl font-bold">{m.server.name}</h3>
            <p className="mt-2 text-white/50">{m.server.slug}</p>
          </div>
        ))}
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-black">Your items</h2>
        <p className="text-white/50 mt-2">
          {user.ownedItems.length} items listed
        </p>
      </section>
    </AppShell>
  );
}