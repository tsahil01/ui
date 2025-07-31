import { useState } from "react";
import { UploadConfig } from "./types";
import { cn } from "@/lib/utils";
import { fileUploadVariants } from "./variants";
import { MdCloudUpload } from "react-icons/md";

export function DragDropUpload({ config, ref, validateFile, setFiles }: { config: UploadConfig, ref: React.RefObject<HTMLInputElement | null>, validateFile: (fileList: FileList) => File[], setFiles: (files: File[]) => void }) {
    const { variant, size, label, theme, maxSizeInMb } = config;
    const fileInputRef = ref;
    const [isDragging, setIsDragging] = useState(false);

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    }

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    }

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        const selectedFiles = e.dataTransfer.files;
        if (selectedFiles) {
            const validFiles = validateFile(selectedFiles);
            setFiles(validFiles);
        }
    }

    return (
        <div className={cn(fileUploadVariants({ variant, size, bgTheme: theme?.bgTheme, radius: theme?.radius, borderStyle: theme?.borderStyle }), {

            "p-4": size === "sm",
            "p-12": size === "md",
            "p-16": size === "lg",
            "bg-accent/50 border-3 border-dashed border-zinc-500": isDragging,
        }, "border-2")} data-dragging={isDragging} onDragEnter={handleDragEnter} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} onClick={() => fileInputRef.current?.click()}>

            <div className={cn("flex gap-2 items-center justify-center min-h-[60px] my-auto", {
                "p-4 flex-row justify-center items-center gap-4": size === "sm",
                "p-12 flex-col justify-center items-center gap-4": size === "md" || size === "lg",
            })}>
                <MdCloudUpload className={cn(size === "sm" || size === "md" ? "w-10 h-10" : "w-14 h-14")} />
                <div className="flex flex-col gap-2">
                    <p className={cn(size === "sm" ? "text-xs" : size === "md" ? "text-sm" : "text-base", "w-48 text-center")}>
                        {isDragging ? "Drop files here..." : label.dropZone}
                    </p>
                    <p className={cn("text-xs text-zinc-500 mx-auto")}>Max size: {maxSizeInMb}MB</p>
                </div>
            </div>
        </div>
    )
}