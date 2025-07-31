import { cn } from "@/lib/utils";
import { fileUploadVariants } from "./variants";
import { UploadConfig } from "./types";
import { MdCloudUpload } from "react-icons/md";
import { MdAdd } from "react-icons/md";
import { ButtonUpload } from "./button-upload";
import { FilePreview } from "./file-list";
import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { GrDocument } from "react-icons/gr";

export function PreviewUpload({ config, ref, validateFile, setFiles, files, onPreview }: { config: UploadConfig, ref: React.RefObject<HTMLInputElement | null>, validateFile: (fileList: FileList) => File[], setFiles: (files: File[] | ((prev: File[]) => File[])) => void, files: File[], onPreview: (file: File) => void }) {
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

    const handleRemoveFile = (index: number) => {
        setFiles((prev: File[]) => prev.filter((_, i) => i !== index));
    }

    return (
        <>
            {files.length === 0 && (
                <div className={cn(fileUploadVariants({ variant, size, bgTheme: theme?.bgTheme, radius: theme?.radius, borderStyle: theme?.borderStyle }), {
                    "p-4": size === "sm",
                    "p-12": size === "md",
                    "p-16": size === "lg",
                    "bg-accent/50 border-3 border-dashed border-zinc-500": isDragging,
                }, "border-2")} data-dragging={isDragging} onDragEnter={handleDragEnter} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>

                    <div className={cn("flex gap-2 items-center justify-center min-h-[60px] my-auto", {
                        "p-4 flex-row justify-center items-center gap-4": size === "sm",
                        "p-12 flex-col justify-center items-center gap-4": size === "md" || size === "lg",
                    })}>
                        <MdCloudUpload className={cn(size === "sm" ? "hidden" : size === "md" ? "w-5 h-5" : "w-6 h-6")} />
                        <div className="flex flex-col gap-2">
                            <p className={cn(size === "sm" ? "text-xs" : size === "md" ? "text-sm" : "text-base", "w-48 text-center")}>
                                {isDragging ? "Drop files here..." : label.dropZone}
                            </p>
                            <p className={cn("text-xs text-zinc-500 mx-auto")}>Max size: {maxSizeInMb}MB</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <ButtonUpload config={{ ...config, variant: "button", size: "sm" }} ref={fileInputRef} >
                                <MdAdd className={cn("w-4 h-4")} />
                                {label.button}
                            </ButtonUpload>
                        </div>
                    </div>
                </div>
            )}

            {files.length > 0 && (
                <div className={cn(fileUploadVariants({ variant, size, bgTheme: theme?.bgTheme, radius: theme?.radius, borderStyle: theme?.borderStyle }), "flex flex-col my-auto h-full w-full", {
                })}>
                    <div className="flex flex-row justify-between w-full my-auto mb-2">
                        <p className={cn(size === "sm" ? "text-xs" : size === "md" ? "text-sm" : "text-base", "font-bold text-center my-auto")}>Files</p>
                        <ButtonUpload config={{ ...config, variant: "button", size: "xs" }} ref={fileInputRef}>
                            <MdAdd className={cn("w-4 h-4")} />
                        </ButtonUpload>
                    </div>
                    <div className="flex flex-col gap-2">
                        <FilePreview files={files} onRemove={handleRemoveFile} onPreview={onPreview} size={size} theme={theme?.bgTheme} />
                    </div>
                </div>
            )}

        </>
    )
}

export function FilePreviewDialog({ file, isOpen, onOpenChange, theme }: { file: File | null, isOpen: boolean, onOpenChange: (open: boolean) => void, theme?: "light" | "dark" }) {
    if (!file) return null;

    const isImage = file.type.startsWith('image/');
    const fileSize = (file.size / 1024 / 1024).toFixed(2);

    return (
        <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
                <Dialog.Content className={cn("fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-xl p-6 z-50 max-w-md w-full mx-4", {
                    "bg-white text-zinc-900": theme !== "dark",
                    "bg-zinc-900 text-zinc-100": theme === "dark",
                })}>
                    <Dialog.Title className="text-lg font-semibold mb-4">
                        File Preview
                    </Dialog.Title>

                    <div className="space-y-4">
                        {isImage ? (
                            <img
                                src={URL.createObjectURL(file)}
                                alt={file.name}
                                className="w-full h-48 object-cover rounded-md"
                            />
                        ) : (
                            <div className={cn("w-full h-48 rounded-md flex items-center justify-center", {
                                "bg-gray-100": theme !== "dark",
                                "bg-zinc-800": theme === "dark",
                            })}>
                                <GrDocument className={cn("w-16 h-16", {
                                    "text-gray-400": theme !== "dark",
                                    "text-zinc-500": theme === "dark",
                                })} />
                            </div>
                        )}

                        <div className="space-y-2">
                            <p className="font-medium">{file.name}</p>
                            <p className={cn("text-sm", {
                                "text-gray-500": theme !== "dark",
                                "text-zinc-400": theme === "dark",
                            })}>Size: {fileSize} MB</p>
                            <p className={cn("text-sm", {
                                "text-gray-500": theme !== "dark",
                                "text-zinc-400": theme === "dark",
                            })}>Type: {file.type}</p>
                        </div>
                    </div>

                    <div className="flex justify-end gap-2 mt-6">
                        <Dialog.Close asChild>
                            <button className={cn("px-4 py-2 rounded-md transition-colors", {
                                "text-gray-600 hover:text-gray-800 hover:bg-gray-100": theme !== "dark",
                                "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800": theme === "dark",
                            })}>
                                Close
                            </button>
                        </Dialog.Close>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}