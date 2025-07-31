"use client";

import { useRef, useState } from "react";
import { UploadConfig } from "./types";
import { cn } from "@/lib/utils";
import { fileUploadVariants } from "./variants";
import { MdCloudUpload } from "react-icons/md";
import FileList from "./file-list";

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
        {/* {previewVariant && (<PreviewUpload config={config} onUpload={onUpload} />)}
        {compactVariant && (<CompactUpload config={config} onUpload={onUpload} />)} */}

        <FileList files={files} onRemove={handleRemoveFile} size={size} theme={theme?.bgTheme} />
    </div>
    )
}



function ButtonUpload({ config, ref }: { config: UploadConfig, ref: React.RefObject<HTMLInputElement | null> }) {
    const { variant, size, label, theme } = config;
    const fileInputRef = ref;

    return (
        <button className={cn(fileUploadVariants({ variant, size, bgTheme: theme?.bgTheme, radius: theme?.radius }))} onClick={() => fileInputRef.current?.click()}>
            <MdCloudUpload className={cn(size === "sm" ? "w-4 h-4" : size === "md" ? "w-5 h-5" : "w-6 h-6")} />
            {label.button}
        </button>
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