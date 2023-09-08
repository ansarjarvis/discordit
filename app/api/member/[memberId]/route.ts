import currentProfile from "@/lib/currentProfile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export let DELETE = async (
  req: Request,
  { params }: { params: { memberId: string } }
) => {
  try {
    let { searchParams } = new URL(req.url);
    let { memberId } = params;
    let serverId = searchParams.get("serverId");
    let profile = await currentProfile();
    if (!profile) {
      return new NextResponse("unauthorized", { status: 401 });
    }

    if (!serverId) {
      return new NextResponse("Server Id missing ", { status: 400 });
    }

    if (!memberId) {
      return new NextResponse("MemberId missing ", { status: 400 });
    }

    let server = await db.server.update({
      where: {
        id: serverId,
        profileId: profile.id,
      },
      data: {
        member: {
          deleteMany: {
            id: memberId,
            profileId: {
              not: profile.id,
            },
          },
        },
      },
      include: {
        member: {
          include: {
            profile: true,
          },
          orderBy: {
            role: "asc",
          },
        },
      },
    });

    return new NextResponse(JSON.stringify(server));
  } catch (error) {
    return new NextResponse("Can not kick out User right now", { status: 500 });
  }
};

export let PATCH = async (
  req: Request,
  { params }: { params: { memberId: string } }
) => {
  try {
    let { role } = await req.json();
    let { searchParams } = new URL(req.url);
    let { memberId } = params;
    let serverId = searchParams.get("serverId");
    let profile = await currentProfile();

    if (!profile) {
      return new NextResponse("unauthorized", { status: 401 });
    }

    if (!serverId) {
      return new NextResponse("Server Id missing ", { status: 400 });
    }

    if (!memberId) {
      return new NextResponse("MemberId missing ", { status: 400 });
    }

    let server = await db.server.update({
      where: {
        id: serverId,
        profileId: profile.id,
      },
      data: {
        member: {
          update: {
            where: {
              id: memberId,
              profileId: {
                not: profile.id,
              },
            },
            data: {
              role,
            },
          },
        },
      },
      include: {
        member: {
          include: {
            profile: true,
          },
          orderBy: {
            role: "asc",
          },
        },
      },
    });
    return new NextResponse(JSON.stringify(server));
  } catch (error) {
    return new NextResponse("Can not update role, try again ", {
      status: 500,
    });
  }
};
