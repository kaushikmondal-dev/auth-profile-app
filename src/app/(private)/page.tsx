import LogoutButton from "@/components/Auth/LogoutButton";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/shadcnui/avatar";
import { buttonVariants } from "@/components/shadcnui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/shadcnui/card";
import { auth } from "@/lib/auth";
import { UserPenIcon } from "lucide-react";
import { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Profil | Auth Profile App",
  description: "Profil  page of Auth Profile App",
};

const page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    return redirect("/login");
  }

  const { name, email, image } = session.user;

  return (
    <section className="grid h-dvh place-items-center">
      <Card>
        <CardHeader className="flex flex-col items-center">
          <Avatar className={"size-64"}>
            {image && <AvatarImage src={`/${image}`} />}

            <AvatarFallback className={`text-2xl`}>No Image</AvatarFallback>
          </Avatar>
        </CardHeader>
        <CardContent className="text-center">
          <div className="text-3xl">Welcome, {name} 👋 </div>
          <div className="text-xl">{email}</div>
        </CardContent>
        <CardFooter className="grid grid-cols-2 gap-4">
          <Link
            href={"/edit"}
            className={buttonVariants({
              variant: "outline",
              size: "lg",
            })}>
            <UserPenIcon />
            Edit
          </Link>
          <LogoutButton />
        </CardFooter>
      </Card>
    </section>
  );
};

export default page;
