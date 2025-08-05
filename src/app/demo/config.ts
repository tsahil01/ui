import { UploadConfig } from "@tsahil01/file-upload";

export const defaultConfig: UploadConfig = {
    variant: "dragDrop",
    size: "md",
    allowMultiple: true,
    maxSizeInMb: 10,
    accept: ["image/*"],
    label: {
        button: "Upload Files",
        dropZone: "Drag and drop files here or click to browse",
    },
    theme: {
        bgTheme: "dark",
        radius: "lg",
        borderStyle: "dashed",
    },
}