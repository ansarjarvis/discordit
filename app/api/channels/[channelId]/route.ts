import currentProfile from "@/lib/currentProfile";
import { db } from "@/lib/db";
import { channelSchemaValidator } from "@/lib/validators/channel";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";

export let PATCH = async (
  req: Request,
  { params }: { params: { channelId: string } }
) => {
  try {
    let { channelId } = params;
    let body = await req.json();
    let { name, type } = channelSchemaValidator.parse(body);
    let { searchParams } = new URL(req.url);
    let serverId = searchParams.get("serverId");

    let profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!serverId) {
      return new NextResponse("Server Id missing ", { status: 400 });
    }

    if (!channelId) {
      return new NextResponse("Channel Id missing ", { status: 400 });
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
          update: {
            where: {
              id: channelId,
              NOT: {
                name: "general",
              },
            },
            data: {
              name,
              type,
            },
          },
        },
      },
    });

    return new NextResponse(JSON.stringify(server));
  } catch (error) {
    return new NextResponse("Cannot update server", { status: 400 });
  }
};

export let DELETE = async (
  req: Request,
  { params }: { params: { channelId: string } }
) => {
  try {
    let { channelId } = params;
    let { searchParams } = new URL(req.url);
    let serverId = searchParams.get("serverId");

    let profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!serverId) {
      return new NextResponse("Server Id missing ", { status: 400 });
    }

    if (!channelId) {
      return new NextResponse("Channel Id missing ", { status: 400 });
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
          delete: {
            id: channelId,
            name: {
              not: "general",
            },
          },
        },
      },
    });

    return new NextResponse(JSON.stringify(server));
  } catch (error) {
    return new NextResponse("Cannot delete channel", { status: 400 });
  }
};
