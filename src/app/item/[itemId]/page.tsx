import AppShell from "@/components/layout/app-shell";
import Navbar from "@/components/layout/navbar";
import BorrowRequestForm from "@/components/borrow-request-form";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import Link from "next/link";

export default async function ItemDetailPage({
  params,
}: {
  params: Promise<{ itemId: string }>;
}) {
  const { itemId } = await params;

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

  const item = await db.clothingItem.findUnique({
    where: { id: itemId },
    include: {
      owner: true,
    },
  });

  if (!item) {
    return (
      <AppShell>
        <Navbar />
        <div className="mx-auto mt-14 max-w-5xl rounded-[1.8rem] border border-white/10 bg-white/[0.05] p-6 text-white/70 backdrop-blur-xl">
          Item not found.
        </div>
      </AppShell>
    );
  }

  const isOwnItem = item.ownerId === user.id;

  const availabilityLabel =
    item.availability === "AVAILABLE"
      ? "Live"
      : item.availability === "BORROWED"
      ? "Borrowed"
      : "Inactive";

  const availabilityClasses =
    item.availability === "AVAILABLE"
      ? "border-emerald-400/20 bg-emerald-500/10 text-emerald-200"
      : item.availability === "BORROWED"
      ? "border-amber-400/20 bg-amber-500/10 text-amber-200"
      : "border-white/10 bg-white/5 text-white/60";

  return (
    <AppShell>
      <Navbar />

      <section className="mx-auto mt-10 max-w-5xl">
        <Link
          href="/feed"
          className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-white/70 backdrop-blur-xl transition hover:bg-white/[0.08] hover:text-white"
        >
          ← Back to feed
        </Link>
      </section>

      <section className="mx-auto mt-6 grid max-w-5xl gap-6 lg:grid-cols-[0.95fr_0.85fr]">
        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.05] p-4 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
          <div className="h-[340px] overflow-hidden rounded-[1.5rem] bg-white/5 lg:h-[520px]">
            {item.imageUrl ? (
              <img
                src={item.imageUrl}
                alt={item.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full flex-col justify-end bg-gradient-to-br from-indigo-500/20 to-sky-400/20 p-7">
                <p className="text-[11px] uppercase tracking-[0.22em] text-white/45">
                  {item.category}
                </p>
                <h3 className="mt-2 text-2xl font-black text-white/85">
                  {item.title}
                </h3>
              </div>
            )}
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl lg:p-7">
          <div className="flex items-center gap-3">
            <p className="text-[11px] uppercase tracking-[0.22em] text-white/35">
              {item.category}
            </p>

            <div
              className={`rounded-full border px-3 py-1 text-xs font-semibold ${availabilityClasses}`}
            >
              {availabilityLabel}
            </div>
          </div>

          <h1 className="mt-4 text-3xl font-black leading-[1.05] lg:text-4xl">
            {item.title}
          </h1>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              ["Owner", item.owner.name],
              ["Size", item.size],
              ["Condition", item.condition],
              ["Status", item.availability],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-[1.2rem] border border-white/10 bg-black/20 px-4 py-4"
              >
                <p className="text-[11px] uppercase tracking-[0.18em] text-white/35">
                  {label}
                </p>
                <p className="mt-3 text-sm leading-6 text-white/85">{value}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-[1.4rem] border border-white/10 bg-black/20 px-5 py-5">
            <p className="text-[11px] uppercase tracking-[0.18em] text-white/35">
              Description
            </p>
            <p className="mt-3 text-sm leading-7 text-white/65">
              {item.description || "No description provided."}
            </p>
          </div>

          <div className="mt-7 max-w-lg">
            {isOwnItem ? (
              <div className="rounded-[1.4rem] border border-white/10 bg-black/20 px-5 py-5 text-sm leading-7 text-white/55">
                This is your own listing, so it cannot be requested from this page.
              </div>
            ) : item.availability !== "AVAILABLE" ? (
              <div className="rounded-[1.4rem] border border-white/10 bg-black/20 px-5 py-5 text-sm leading-7 text-white/55">
                This item is currently unavailable for borrowing.
              </div>
            ) : (
              <div className="rounded-[1.8rem] border border-white/10 bg-gradient-to-b from-white/[0.05] to-black/20 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
  <BorrowRequestForm itemId={item.id} />
</div>
            )}
          </div>
        </div>
      </section>
    </AppShell>
  );
}