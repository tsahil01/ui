"use client";

import { useRef, useState } from "react";
import { UploadConfig } from "./types";
import { cn } from "@/lib/utils";
import { fileUploadVariants } from "./variants";
import { MdAdd, MdCloudUpload } from "react-icons/md";
import FileList, { FilePreview } from "./file-list";
import * as Dialog from "@radix-ui/react-dialog";
import * as Slot from "@radix-ui/react-slot";
import { GrDocument } from "react-icons/gr";

interface UploadProps {
    config: UploadConfig;
    onUpload: () => void
}

export default function FileUpload({ config, onUpload }: UploadProps) {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const { variant, size, allowMultiple, maxSizeInMb, accept, label, theme } = config;
    const [files, setFiles] = useState<File[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const validateFile = (fileList: FileList): File[] => {
        const validFiles: File[] = [];
        const newFiles = Array.from(fileList);

        for (const file of newFiles) {
            if (!maxSizeInMb || file.size <= maxSizeInMb * 1024 * 1024) {
                validFiles.push(file);
            } else {
                setErrors(prev => [...prev, `File ${file.name} is too large`])
            }
        }
        return validFiles;
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files;
        if (selectedFiles) {
            const validFiles = validateFile(selectedFiles);
            setFiles(validFiles);
        }
    }

    const handleUpload = async () => {
        if (files.length === 0) return;
        setIsUploading(true);
        setErrors([]);
        setTimeout(() => {
            setIsUploading(false);
            onUpload();
        }, 2000);
    }

    const handleRemoveFile = (index: number) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
    }

    const handleFilePreview = (file: File) => {
        setSelectedFile(file);
        setIsDialogOpen(true);
    }


    const buttonVariant = variant === "button";
    const dragDropVariant = variant === "dragDrop";
    const previewVariant = variant === "preview";
    const compactVariant = variant === "compact";


    return (<div>
        <input
            ref={fileInputRef}
            type="file"
            multiple={allowMultiple}
            accept={accept.join(',')}
            onChange={handleFileChange}
            className="sr-only"
            disabled={isUploading}
            aria-describedby="file-upload-description"
        />
        {buttonVariant && (<ButtonUpload config={config} ref={fileInputRef} />)}
        {dragDropVariant && (<DragDropUpload config={config} ref={fileInputRef} validateFile={validateFile} setFiles={setFiles} />)}
        {previewVariant && (<PreviewUpload config={config} ref={fileInputRef} validateFile={validateFile} setFiles={setFiles} files={files} onPreview={handleFilePreview} />)}
        {/* {compactVariant && (<CompactUpload config={config} onUpload={onUpload} />)} */}

        {!previewVariant &&
            <FileList files={files} onRemove={handleRemoveFile} onPreview={handleFilePreview} size={size} theme={theme?.bgTheme} />
        }
        <FilePreviewDialog file={selectedFile} isOpen={isDialogOpen} onOpenChange={setIsDialogOpen} theme={theme?.bgTheme} />
    </div>
    )
}



function ButtonUpload({ config, ref, children }: { config: UploadConfig, ref: React.RefObject<HTMLInputElement | null>, children?: React.ReactNode }) {
    const { variant, size, label, theme } = config;
    const fileInputRef = ref;

    return (
        <Slot.Root>
            <button className={cn(fileUploadVariants({ variant, size, bgTheme: theme?.bgTheme, radius: theme?.radius }))} onClick={() => fileInputRef.current?.click()}>
                {!children && (<>
                    <MdCloudUpload className={cn(size === "xs" ? "w-4 h-4" : size === "sm" ? "w-5 h-5" : size === "md" ? "w-6 h-6" : "w-7 h-7")} />
                    {label.button}
                </>)}
                {children}
            </button>
        </Slot.Root>
    )
}

function DragDropUpload({ config, ref, validateFile, setFiles }: { config: UploadConfig, ref: React.RefObject<HTMLInputElement | null>, validateFile: (fileList: FileList) => File[], setFiles: (files: File[]) => void }) {
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

function PreviewUpload({ config, ref, validateFile, setFiles, files, onPreview }: { config: UploadConfig, ref: React.RefObject<HTMLInputElement | null>, validateFile: (fileList: FileList) => File[], setFiles: (files: File[] | ((prev: File[]) => File[])) => void, files: File[], onPreview: (file: File) => void }) {
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

function FilePreviewDialog({ file, isOpen, onOpenChange, theme }: { file: File | null, isOpen: boolean, onOpenChange: (open: boolean) => void, theme?: "light" | "dark" }) {
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