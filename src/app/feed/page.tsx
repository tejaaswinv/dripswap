import AppShell from "@/components/layout/app-shell";
import Navbar from "@/components/layout/navbar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/db";

export default async function FeedPage() {
  const cookieStore = await cookies();
  const email = cookieStore.get("dripswap_user_email")?.value;

  if (!email) redirect("/login");

  const user = await db.user.findUnique({
    where: { email },
    include: {
      memberships: true,
    },
  });

  if (!user || user.memberships.length === 0) redirect("/login");

  const serverId = user.memberships[0].serverId;

  const items = await db.clothingItem.findMany({
    where: {
      serverId,
      ownerId: {
        not: user.id,
      },
      availability: "AVAILABLE",
    },
    include: {
      owner: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <AppShell>
      <Navbar />

      <section className="mt-14">
        <h1 className="text-4xl font-black">Tonight’s heat 🔥</h1>
        <p className="mt-3 text-white/60">
          Borrow pieces from your campus network
        </p>
      </section>

      <section className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="group rounded-[1.8rem] border border-white/10 bg-white/[0.05] p-4 backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white/[0.08]"
          >
            <div className="h-56 overflow-hidden rounded-[1.4rem] bg-gradient-to-br from-indigo-500/20 to-sky-400/20">
              {item.imageUrl ? (
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-end p-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                      {item.category}
                    </p>
                    <h3 className="text-xl font-black">{item.title}</h3>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4 flex items-center justify-between text-sm text-white/60">
              <span>{item.size}</span>
              <span>{item.owner.name}</span>
            </div>

            <div className="mt-2 flex items-center justify-between text-xs text-white/40">
              <span>{item.availability}</span>
              <span>{item.condition}</span>
            </div>

            <Link
  href={`/item/${item.id}`}
  className="mt-4 block w-full rounded-full bg-white px-4 py-2 text-center font-bold text-black transition hover:scale-[1.02]"
>
  View details
</Link>
          </div>
        ))}

        {items.length === 0 && (
          <p className="text-white/50">
            No available items from other users right now.
          </p>
        )}
      </section>
    </AppShell>
  );
}