import InitialServerModal from "@/components/models/InitialServerModal";
import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initialProfile";
import { redirect } from "next/navigation";

let Home = async () => {
  let profile = await initialProfile();
  let server = await db.server.findFirst({
    where: {
      member: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });
  if (server) {
    return redirect(`/servers/${server.id}`);
  }
  return <InitialServerModal />;
};
export default Home;
