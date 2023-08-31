import currentProfile from "@/lib/currentProfile";
import { db } from "@/lib/db";
import { serverSchemaValidator } from "@/lib/validators/server";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

export let POST = async (req: Request) => {
  try {
    let body = await req.json();
    let { name, imageUrl } = serverSchemaValidator.parse(body);
    let profile = await currentProfile();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    let server = await db.server.create({
      data: {
        profileId: profile.id,
        name,
        imageUrl,
        inviteCode: uuidv4(),
        channel: {
          create: [{ name: "general", profileId: profile.id }],
        },
        member: {
          create: [{ profileId: profile.id, role: MemberRole.ADMIN }],
        },
      },
    });
    return NextResponse.json(server);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(error.message, { status: 400 });
    }
    return new NextResponse(
      "Could Not Create Server Right Now Please try Again Later",
      { status: 500 }
    );
  }
};
