import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const email = cookieStore.get("dripswap_user_email")?.value;

    if (!email) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const user = await db.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { itemId } = await req.json();

    const item = await db.clothingItem.findUnique({
      where: { id: itemId },
    });

    if (!item) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    if (item.ownerId !== user.id) {
      return NextResponse.json({ error: "Not allowed" }, { status: 403 });
    }

    const nextAvailability =
      item.availability === "AVAILABLE" ? "UNAVAILABLE" : "AVAILABLE";

    await db.clothingItem.update({
      where: { id: itemId },
      data: {
        availability: nextAvailability,
      },
    });

    revalidatePath("/lend");
    revalidatePath("/feed");

    return NextResponse.json({ success: true, availability: nextAvailability });
  } catch (error) {
    console.error("ITEM_TOGGLE_ERROR", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}