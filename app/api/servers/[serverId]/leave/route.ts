import currentProfile from "@/lib/currentProfile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export let PATCH = async (
  req: Request,
  { params }: { params: { serverId: string } }
) => {
  try {
    let { serverId } = params;
    let profile = await currentProfile();
    if (!profile) {
      return new NextResponse("Unauthorize", { status: 401 });
    }
    if (!serverId) {
      return new NextResponse("Server Id missing", { status: 400 });
    }

    let server = await db.server.update({
      where: {
        id: serverId,
        profileId: {
          not: profile.id,
        },
        member: {
          some: {
            profileId: profile.id,
          },
        },
      },
      data: {
        member: {
          deleteMany: {
            profileId: profile.id,
          },
        },
      },
    });
    return new NextResponse(JSON.stringify(server));
  } catch (error) {
    return new NextResponse("Cannot leave", { status: 400 });
  }
};
