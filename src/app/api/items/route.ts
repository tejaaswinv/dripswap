import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { mkdir, writeFile } from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const email = cookieStore.get("dripswap_user_email")?.value;

    if (!email) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const user = await db.user.findUnique({
      where: { email },
      include: {
        memberships: true,
      },
    });

    if (!user || user.memberships.length === 0) {
      return NextResponse.json(
        { error: "User is not part of any server" },
        { status: 400 }
      );
    }

    const formData = await req.formData();

    const title = (formData.get("title") as string)?.trim();
    const category = (formData.get("category") as string)?.trim();
    const size = (formData.get("size") as string)?.trim();
    const description = (formData.get("description") as string)?.trim();
    const condition = ((formData.get("condition") as string) || "GOOD").trim();
    const file = formData.get("image") as File | null;

    if (!title || !category || !size) {
      return NextResponse.json(
        { error: "Title, category, and size are required" },
        { status: 400 }
      );
    }

    let imageUrl: string | null = null;

    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadDir = path.join(process.cwd(), "public", "uploads");
      await mkdir(uploadDir, { recursive: true });

      const safeName = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
      const filePath = path.join(uploadDir, safeName);

      await writeFile(filePath, buffer);
      imageUrl = `/uploads/${safeName}`;
    }

    await db.clothingItem.create({
      data: {
        ownerId: user.id,
        serverId: user.memberships[0].serverId,
        title,
        category,
        size,
        description: description || null,
        condition: condition as any,
        availability: "AVAILABLE",
        imageUrl,
      },
    });

    revalidatePath("/feed");
    revalidatePath("/lend");
    revalidatePath("/borrow");
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("ITEM_CREATE_ERROR", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}