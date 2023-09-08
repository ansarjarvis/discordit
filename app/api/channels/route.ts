import currentProfile from "@/lib/currentProfile";
import { db } from "@/lib/db";
import { channelSchemaValidator } from "@/lib/validators/channel";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";

export let POST = async (req: Request) => {
  try {
    let { searchParams } = new URL(req.url);
    let serverId = searchParams.get("serverId");
    let body = await req.json();
    let { name, type } = channelSchemaValidator.parse(body);

    let profile = await currentProfile();
    if (!profile) {
      return new NextResponse("unauthorized", { status: 401 });
    }

    if (!serverId) {
      return new NextResponse("Server ID missing", { status: 400 });
    }

    if (name === "general") {
      return new NextResponse("Name cannot be 'general'", { status: 400 });
    }

    let server = await db.server.update({
      where: {
        id: serverId,
        member: {
          some: {
            profileId: profile.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR],
            },
          },
        },
      },
      data: {
        channel: {
          create: {
            profileId: profile.id,
            name,
            type,
          },
        },
      },
    });
    return new NextResponse(JSON.stringify(server));
  } catch (error) {
    return new NextResponse("Cannot create channel", { status: 500 });
  }
};
