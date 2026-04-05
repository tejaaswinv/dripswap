import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function main() {
  const user = await db.user.findFirst({
    include: {
      memberships: true,
    },
  });

  if (!user || user.memberships.length === 0) {
    console.log("No user or server found. Sign up first.");
    return;
  }

  const serverId = user.memberships[0].serverId;

  await db.clothingItem.createMany({
    data: [
      {
        ownerId: user.id,
        serverId,
        title: "Black Street Jacket",
        category: "Jacket",
        size: "M",
        condition: "GOOD",
        description: "Perfect for night outs and street fits.",
      },
      {
        ownerId: user.id,
        serverId,
        title: "Cream Kurta Set",
        category: "Ethnic",
        size: "L",
        condition: "LIKE_NEW",
        description: "Ideal for weddings and festive events.",
      },
      {
        ownerId: user.id,
        serverId,
        title: "Oversized Graphic Tee",
        category: "Casual",
        size: "XL",
        condition: "GOOD",
        description: "Relaxed everyday wear with aesthetic prints.",
      },
      {
        ownerId: user.id,
        serverId,
        title: "Formal Blazer",
        category: "Formal",
        size: "M",
        condition: "NEW",
        description: "Sharp blazer for presentations and interviews.",
      },
    ],
  });

  console.log("🔥 Dummy items added");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await db.$disconnect();
  });