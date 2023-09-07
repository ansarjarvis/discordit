import currentProfile from "@/lib/currentProfile";
import { db } from "@/lib/db";
import { serverSchemaValidator } from "@/lib/validators/server";
import { NextResponse } from "next/server";

export let PATCH = async (
  req: Request,
  { params }: { params: { serverId: string } }
) => {
  try {
    let body = await req.json();
    let { serverId } = params;
    let { name, imageUrl } = serverSchemaValidator.parse(body);
    let profile = await currentProfile();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    let server = await db.server.update({
      where: {
        id: serverId,
        profileId: profile.id,
      },
      data: {
        name,
        imageUrl,
      },
    });

    return new NextResponse(JSON.stringify(server));
  } catch (error) {
    return new NextResponse("Can not updata server", { status: 500 });
  }
};
