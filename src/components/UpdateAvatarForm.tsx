"use client";

import { updateAvatar } from "@/updateAvatar";
import { Loader2Icon, UserPenIcon } from "lucide-react";
import { useState } from "react";
import { useFilePicker } from "use-file-picker";
import { FileSizeValidator } from "use-file-picker/validators";
import { Avatar, AvatarFallback, AvatarImage } from "./shadcnui/avatar";
import { Button } from "./shadcnui/button";
import { CardContent, CardFooter } from "./shadcnui/card";
import { toast } from "./shadcnui/toast";

type AvatarFormProps = {
  prevImageUrl: string | null | undefined;
};

const UpdateAvatarForm = ({ prevImageUrl }: AvatarFormProps) => {
  const [isFile, SetIsFile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { openFilePicker, filesContent, plainFiles, clear } = useFilePicker({
    multiple: false,
    accept: "image/*",
    readAs: "DataURL",
    onFilesSuccessfullySelected: () => SetIsFile(true),
    onClear: () => SetIsFile(false),

    validators: [
      new FileSizeValidator({ maxFileSize: 1 * 1024 * 1024 /*1MB*/ }),
    ],
  });

  const updateAvatarHandler = async () => {
    setIsLoading(true);
    await new Promise<void>((resolve) => setTimeout(resolve, 1500));

    const { isSuccess, msg } = await updateAvatar(prevImageUrl, plainFiles[0]);

    if (isSuccess) {
      toast.add({
        type: "success",
        title: msg,
      });
    } else {
      toast.add({
        type: "error",
        title: msg,
      });
    }
    clear();
    setIsLoading(false);
  };

  return (
    <>
      <CardContent className="items-center">
        <button
          type="button"
          onClick={openFilePicker}
          className="grid place-items-center">
          {!isFile && (
            <Avatar className={"size-64"}>
              {prevImageUrl && <AvatarImage src={`/${prevImageUrl}`} />}

              <AvatarFallback className={`text-2xl`}>No Image</AvatarFallback>
            </Avatar>
          )}

          {filesContent.map(({ size, content, name }) => (
            <Avatar
              key={size}
              className="size-64">
              <AvatarImage src={content} />
              <AvatarFallback>{name}</AvatarFallback>
            </Avatar>
          ))}
        </button>
      </CardContent>
      <CardFooter>
        <Button
          type="button"

          size="lg"
          onClick={updateAvatarHandler}
          className={"w-full"}
          disabled={!isFile || isLoading}>
          {isLoading ?
            <>
              <Loader2Icon className="animate-spin" /> Updating Avatar .....
            </>
          : <>
              <UserPenIcon />
              Update
            </>
          }
        </Button>
      </CardFooter>
    </>
  );
};

export default UpdateAvatarForm;
