"use client";

import { useState } from "react";
import { UploadConfig } from "./types";

interface UploadProps {
    config: UploadConfig;
    onUpload: () => void
}

export default function FileUpload({config, onUpload}: UploadProps) {
    const {variant, size, allowMultiple, maxSizeInMb, accept, label, theme} = config;
    const [files, setFiles] = useState<File[]>([]);
    const [isDragging, setIsDragging] = useState(false);
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

    const handleClear = () => {
        setFiles([]);
    }

}