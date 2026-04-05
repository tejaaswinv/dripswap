import AppShell from "@/components/layout/app-shell";
import Navbar from "@/components/layout/navbar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

export default async function BorrowPage() {
  const cookieStore = await cookies();
  const email = cookieStore.get("dripswap_user_email")?.value;

  if (!email) redirect("/login");

  const user = await db.user.findUnique({
    where: { email },
  });

  if (!user) redirect("/login");

  const requests = await db.borrowRequest.findMany({
    where: {
      borrowerId: user.id,
    },
    include: {
      item: {
        include: {
          owner: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <AppShell>
      <Navbar />

      <section className="mt-14">
        <h1 className="text-4xl font-black">Borrow</h1>
        <p className="mt-3 text-white/60">
          Track items you’ve requested from others.
        </p>
      </section>

      <section className="mt-10 space-y-4">
        {requests.map((r) => (
          <div
            key={r.id}
            className="rounded-[1.8rem] border border-white/10 bg-white/[0.05] p-6 backdrop-blur-xl"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-white/35">
              {r.status}
            </p>
            <h3 className="mt-2 text-2xl font-black">{r.item.title}</h3>
            <p className="mt-2 text-white/60">Owner: {r.item.owner.name}</p>
            <p className="mt-2 text-sm text-white/40">
              Requested on: {new Date(r.createdAt).toLocaleString()}
            </p>
            {r.status === "APPROVED" && (
              <p className="mt-2 text-sm text-indigo-300">
                Return by: {new Date(r.endDate).toDateString()}
              </p>
            )}
            {r.status === "APPROVED" && (
  <p className="mt-2 text-sm text-green-400">
    Currently borrowed
  </p>
)}
          </div>
        ))}

        {requests.length === 0 && (
          <p className="text-white/50">You haven’t borrowed anything yet.</p>
        )}
      </section>
    </AppShell>
  );
}