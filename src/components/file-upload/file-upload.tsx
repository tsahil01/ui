"use client";

import { useRef, useState } from "react";
import { UploadConfig } from "./types";
import { ButtonUpload } from "./button-upload";
import { DragDropUpload } from "./drag-drop-upload";
import { PreviewUpload, FilePreviewDialog } from "./preview-upload";
import FileList from "./file-list";
import { CompactUpload } from "./compact-upload";

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
        {compactVariant && (<CompactUpload config={config} ref={fileInputRef} />)}

        {!previewVariant &&
            <FileList files={files} onRemove={handleRemoveFile} onPreview={handleFilePreview} size={size} theme={theme?.bgTheme} />
        }
        <FilePreviewDialog file={selectedFile} isOpen={isDialogOpen} onOpenChange={setIsDialogOpen} theme={theme?.bgTheme} />
    </div>
    )
}






