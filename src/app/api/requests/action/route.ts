import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  try {
    const { requestId, action } = await req.json();

    const request = await db.borrowRequest.findUnique({
      where: { id: requestId },
      include: {
        item: true,
      },
    });

    if (!request) {
      return NextResponse.json({ error: "Request not found" }, { status: 404 });
    }

    if (action === "approve") {
      // approve request
      await db.borrowRequest.update({
        where: { id: requestId },
        data: {
          status: "APPROVED",
        },
      });

      // mark item as borrowed
      await db.clothingItem.update({
        where: { id: request.itemId },
        data: {
          availability: "BORROWED",
        },
      });
    }

    if (action === "reject") {
      await db.borrowRequest.update({
        where: { id: requestId },
        data: {
          status: "REJECTED",
        },
      });
    }

    // 🔥 CRITICAL: sync all pages
    revalidatePath("/feed");
    revalidatePath("/borrow");
    revalidatePath("/lend");

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("REQUEST_ACTION_ERROR", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}