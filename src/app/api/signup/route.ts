import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { db } from "@/lib/db";
import { signUpSchema } from "@/lib/validators/auth";
import { extractEmailDomain, isAllowedUniversityEmail } from "@/lib/university";

function makeServerNameFromDomain(domain: string) {
  const root = domain.split(".")[0] ?? "campus";
  return `${root.toUpperCase()} Campus`;
}

function makeServerSlugFromDomain(domain: string) {
  return `${domain.split(".")[0]?.toLowerCase()}-campus`;
}

export async function POST(req: Request) {
  try {
    console.log("1. signup route hit");

    const body = await req.json();
    console.log("2. body parsed", body);

    const parsed = signUpSchema.safeParse(body);
    console.log("3. validation done", parsed.success);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const { name, email, password } = parsed.data;
    console.log("4. extracted fields", email);

    if (!isAllowedUniversityEmail(email)) {
      console.log("5. invalid university email");
      return NextResponse.json(
        { error: "Use a valid university email address." },
        { status: 403 },
      );
    }

    const existingUser = await db.user.findUnique({
      where: { email },
    });
    console.log("6. checked existing user");

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists." },
        { status: 409 },
      );
    }

    const domain = extractEmailDomain(email);
    console.log("7. domain extracted", domain);

    let university = await db.university.findUnique({
      where: { domain },
    });
    console.log("8. searched university");

    if (!university) {
      university = await db.university.create({
        data: {
          name,
          domain,
          isVerified: true,
        },
      });
      console.log("9. university created");
    }

    const passwordHash = await hash(password, 10);
    console.log("10. password hashed");

    const user = await db.user.create({
      data: {
        name,
        email,
        passwordHash,
        universityId: university.id,
      },
    });
    console.log("11. user created", user.id);

    let server = await db.server.findUnique({
      where: {
        slug: makeServerSlugFromDomain(domain),
      },
    });
    console.log("12. searched server");

    if (!server) {
      server = await db.server.create({
        data: {
          name: makeServerNameFromDomain(domain),
          slug: makeServerSlugFromDomain(domain),
          universityId: university.id,
          createdById: user.id,
          description: `Default verified server for ${university.name}`,
        },
      });
      console.log("13. server created", server.id);
    }

    await db.membership.create({
      data: {
        userId: user.id,
        serverId: server.id,
        role: "MEMBER",
        status: "ACTIVE",
      },
    });
    console.log("14. membership created");

    return NextResponse.json(
      {
        message: "Account created successfully.",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("SIGNUP_ERROR", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}