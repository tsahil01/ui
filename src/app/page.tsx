"use client";

import { cn } from "@/lib/utils";
import { FileUpload, UploadConfig } from "@ui/file-upload";

export default function Home() {
  const config: UploadConfig = {
    variant: "dragDrop",
    size: "sm",
    allowMultiple: true
    ,
    maxSizeInMb: 10,
    accept: ["image/*", "application/pdf"],
    label: {
      button: "Upload Documents",
      dropZone: "Drag and drop files here.",
    },
    theme: {
      bgTheme: "dark",
      radius: "none",
      borderStyle: "double",
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
