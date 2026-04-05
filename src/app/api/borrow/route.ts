import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const email = cookieStore.get("dripswap_user_email")?.value;

    if (!email) {
      return NextResponse.json({ error: "Not logged in" }, { status: 401 });
    }

    const user = await db.user.findUnique({
      where: { email },
      include: {
        memberships: true,
      },
    });

    if (!user || user.memberships.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const body = await req.json();
    const { itemId, startDate, endDate, purpose } = body;

    if (!itemId || !startDate || !endDate) {
      return NextResponse.json(
        { error: "Item, start date, and end date are required" },
        { status: 400 }
      );
    }

    // ✅ ADD THIS BLOCK HERE
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
      return NextResponse.json(
        { error: "Invalid date or time" },
        { status: 400 }
      );
    }

    if (end <= start) {
      return NextResponse.json(
        { error: "End time must be after start time" },
        { status: 400 }
      );
    }
    // ✅ END BLOCK

    const item = await db.clothingItem.findUnique({
      where: { id: itemId },
    });

    if (!item) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    if (item.ownerId === user.id) {
      return NextResponse.json(
        { error: "You cannot borrow your own item" },
        { status: 400 }
      );
    }

    if (item.serverId !== user.memberships[0].serverId) {
      return NextResponse.json(
        { error: "Item is not in your server" },
        { status: 403 }
      );
    }

    if (item.availability !== "AVAILABLE") {
      return NextResponse.json(
        { error: "Item is not available" },
        { status: 400 }
      );
    }

    const existingPending = await db.borrowRequest.findFirst({
      where: {
        itemId,
        borrowerId: user.id,
        status: "PENDING",
      },
    });

    if (existingPending) {
      return NextResponse.json(
        { error: "You already requested this item" },
        { status: 400 }
      );
    }

    const request = await db.borrowRequest.create({
      data: {
        itemId,
        borrowerId: user.id,
        startDate: start,   // ✅ use validated dates
        endDate: end,       // ✅ use validated dates
        purpose: purpose || null,
        status: "PENDING",
      },
    });

    revalidatePath("/feed");
    revalidatePath("/borrow");
    revalidatePath("/lend");

    return NextResponse.json({ request });
  } catch (error) {
    console.error("BORROW_ERROR", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}