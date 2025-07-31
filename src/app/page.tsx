"use client";

import FileUpload from "@/components/file-upload/file-upload";
import { UploadConfig } from "@/components/file-upload/types";
import { cn } from "@/lib/utils";

export default function Home() {
  const config: UploadConfig = {
    variant: "dragDrop",
    size: "lg",
    allowMultiple: true
    ,
    maxSizeInMb: 10,
    accept: ["image/*"],
    label: {
      button: "Upload",
      dropZone: "Drag and drop files here.",
    },
    theme: {
      bgTheme: "dark",
      radius: "md",
      borderStyle: "solid",

    },
  }

  const handleUpload = () => {
    console.log("Uploading...");
  }

  return (
    <div className={cn("flex items-center justify-center h-screen w-screen mx-auto p-4", {
      "bg-zinc-100": config.theme?.bgTheme === "light",
      "bg-zinc-950": config.theme?.bgTheme === "dark",
    })}>
      <FileUpload config={config} onUpload={handleUpload} />
    </div>
  );
}
