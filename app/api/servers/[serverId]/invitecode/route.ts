import currentProfile from "@/lib/currentProfile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export let PATCH = async (
  req: Request,
  { params }: { params: { serverId: string } }
) => {
  try {
    let { serverId } = params;
    let profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!serverId) {
      return new NextResponse("Server Id missing", { status: 400 });
    }

    let server = await db.server.update({
      where: {
        id: serverId,
        profileId: profile.id,
      },
      data: {
        inviteCode: uuidv4(),
      },
    });
    return new NextResponse(JSON.stringify(server));
  } catch (error) {
    return new NextResponse("Can not generate new link", { status: 500 });
  }
};
