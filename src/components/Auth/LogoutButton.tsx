"use client";

import { Loader2Icon, LogOut } from "lucide-react";
import { useState } from "react";
import { Button } from "../shadcnui/button";

const LogoutButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  //   const { refresh } = useRouter();

  const logoutHandler = async () => {
    setIsLoading(true);

    await new Promise<void>((resolve) => setTimeout(resolve, 1500));

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
