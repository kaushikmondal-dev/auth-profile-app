"use client";

import { authClient } from "@/lib/auth-client";
import { Loader2Icon, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../shadcnui/button";
import { toast } from "../shadcnui/toast";

const LogoutButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { replace } = useRouter();

  const logoutHandler = async () => {
    setIsLoading(true);

    await new Promise<void>((resolve) => setTimeout(resolve, 1500));

    const { error } = await authClient.signOut();

    if (error) {
      toast.add({
        type: "error",
        title: "logout failed ❌ ",
      });
    } else {
      toast.add({
        type: "success",
        title: "You have been logout successfully ✅",
      });

      replace("/login");
    }

    setIsLoading(false);
  };
  return (
    <Button
      type="button"
      onClick={logoutHandler}
      variant="destructive"
      disabled={isLoading}>
      {isLoading ?
        <>
          <Loader2Icon className="animate-spin" />
          Logging Out...
        </>
      : <>
          <LogOut />
          Logout
        </>
      }
    </Button>
  );
};

export default LogoutButton;
