import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  try {
    const { requestId } = await req.json();

    const request = await db.borrowRequest.findUnique({
      where: { id: requestId },
    });

    if (!request) {
      return NextResponse.json({ error: "Request not found" }, { status: 404 });
    }

    await db.borrowRequest.update({
      where: { id: requestId },
      data: {
        status: "CANCELLED",
      },
    });

    await db.clothingItem.update({
      where: { id: request.itemId },
      data: {
        availability: "AVAILABLE",
      },
    });

    revalidatePath("/feed");
    revalidatePath("/borrow");
    revalidatePath("/lend");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("RETURN_ERROR", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}