import { Card, CardHeader, CardTitle } from "@/components/shadcnui/card";
import UpdateAvatarForm from "@/components/UpdateAvatarForm";
import UpdateNameForm from "@/components/UpdateNameForm";
import { auth } from "@/lib/auth";
import { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Edit | Auth Profile App",
  description: "Edit page of Auth Profile App",
};

const page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    return redirect("/login");
  }

  const { name, image } = session.user;
  return (
    <section className="grid h-dvh place-items-center">
      <Card className="w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-center text-2xl"> Update Avatar</CardTitle>
        </CardHeader>
        <UpdateAvatarForm prevImageUrl={image} />
      </Card>

      <Card className="w-sm">
        <CardHeader>
          <CardTitle className="text-center text-2xl"> Update Name</CardTitle>
        </CardHeader>
        <UpdateNameForm prevName={name} />
      </Card>
    </section>
  );
};

export default page;
