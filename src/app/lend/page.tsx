import AppShell from "@/components/layout/app-shell";
import Navbar from "@/components/layout/navbar";
import RequestActions from "@/components/request-actions";
import ReturnButton from "@/components/return-button";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ToggleListingButton from "@/components/toggle-listing-button";
import ListItemForm from "@/components/list-item-form";
import { db } from "@/lib/db";

export default async function LendPage() {
  const cookieStore = await cookies();
  const email = cookieStore.get("dripswap_user_email")?.value;

  if (!email) redirect("/login");

  const user = await db.user.findUnique({
    where: { email },
    include: {
      memberships: true,
      ownedItems: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!user) redirect("/login");

  const requests = await db.borrowRequest.findMany({
    where: {
      item: {
        ownerId: user.id,
      },
    },
    include: {
      item: true,
      borrower: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <AppShell>
      <Navbar />

      <section className="mt-14">
        <h1 className="text-4xl font-black">Lend</h1>
        <p className="mt-3 text-white/60">
          Manage your listed pieces and incoming borrow requests.
        </p>
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[1.8rem] border border-white/10 bg-white/[0.05] p-6 backdrop-blur-xl">
          <h2 className="text-2xl font-black">List a new item</h2>
          <p className="mt-2 text-white/50">
            Add something from your wardrobe to your campus network.
          </p>

          <ListItemForm />
        </div>

        <div className="rounded-[1.8rem] border border-white/10 bg-white/[0.05] p-6 backdrop-blur-xl">
          <h2 className="text-2xl font-black">Your items</h2>
          <p className="mt-2 text-white/50">{user.ownedItems.length} items listed</p>

          <div className="mt-6 space-y-4">
            {user.ownedItems.map((item) => (
              <div
                key={item.id}
                className="rounded-[1.4rem] border border-white/10 bg-black/20 p-4"
              >
                <div className="flex items-start gap-4">
                  <div className="h-24 w-24 overflow-hidden rounded-2xl bg-white/5">
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-xs text-white/30">
                        No image
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <p className="text-xs uppercase tracking-[0.2em] text-white/35">
                      {item.category}
                    </p>
                    <h3 className="mt-2 text-xl font-black">{item.title}</h3>
                    <p className="mt-2 text-sm text-white/55">
                      {item.description || "No description"}
                    </p>
                  </div>

                  <div className="text-right text-xs text-white/40">
                    <p>{item.size}</p>
                    <p className="mt-1">{item.availability}</p>
                    <p className="mt-1">{item.condition}</p>
                  </div>
                </div>
              </div>
            ))}

            {user.ownedItems.length === 0 && (
              <p className="text-white/50">You haven’t listed anything yet.</p>
            )}
          </div>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-black">Incoming requests</h2>
        <p className="mt-2 text-white/50">
          Approve or reject requests for your listed pieces.
        </p>

        <div className="mt-6 space-y-4">
          {requests.map((r) => (
            <div
              key={r.id}
              className="rounded-[1.8rem] border border-white/10 bg-white/[0.05] p-6 backdrop-blur-xl"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex-1">
  <p className="text-xs uppercase tracking-[0.2em] text-white/35">
    {r.status}
  </p>

  <h3 className="mt-2 text-2xl font-black">{r.item.title}</h3>

  <p className="mt-2 text-white/70">
    Requested by <span className="font-semibold">{r.borrower.name}</span>
  </p>

  <div className="mt-4 grid gap-3 sm:grid-cols-2">
    <div className="rounded-[1rem] border border-white/10 bg-black/20 px-4 py-3">
      <p className="text-[11px] uppercase tracking-[0.18em] text-white/35">
        From
      </p>
      <p className="mt-2 text-sm text-white/80">
        {new Date(r.startDate).toLocaleString()}
      </p>
    </div>

    <div className="rounded-[1rem] border border-white/10 bg-black/20 px-4 py-3">
      <p className="text-[11px] uppercase tracking-[0.18em] text-white/35">
        Until
      </p>
      <p className="mt-2 text-sm text-white/80">
        {new Date(r.endDate).toLocaleString()}
      </p>
    </div>
  </div>

  <div className="mt-3 rounded-[1rem] border border-white/10 bg-black/20 px-4 py-3">
    <p className="text-[11px] uppercase tracking-[0.18em] text-white/35">
      Occasion / Purpose
    </p>
    <p className="mt-2 text-sm leading-6 text-white/75">
      {r.purpose || "No purpose mentioned."}
    </p>
  </div>

  <p className="mt-3 text-xs text-white/35">
    Request created: {new Date(r.createdAt).toLocaleString()}
  </p>
</div>

                {r.status === "PENDING" ? (
                  <RequestActions requestId={r.id} />
                ) : r.status === "APPROVED" ? (
                  <ReturnButton requestId={r.id} />
                ) : (
                  <div className="text-sm text-white/50">No action needed</div>
                )}
              </div>
            </div>
          ))}

          {requests.length === 0 && (
            <p className="text-white/50">No incoming lend requests yet.</p>
          )}
        </div>
      </section>
    </AppShell>
  );
}