import { cn } from "@/lib/utils";
import { UploadConfig } from "./types";
import { fileUploadVariants } from "./variants";
import { ButtonUpload } from "./button-upload";
import { MdAdd } from "react-icons/md";

interface CompactUploadProps {
    config: UploadConfig;
    ref: React.RefObject<HTMLInputElement | null>;
}

export function CompactUpload({ config, ref }: CompactUploadProps) {
    const { variant, size, label, theme } = config;
    const fileInputRef = ref;

    return (
        <div className={cn(fileUploadVariants({ variant, size, bgTheme: theme?.bgTheme, radius: theme?.radius, borderStyle: theme?.borderStyle}))}>
            {label.button && (
                <p className={cn(size === "sm" ? "text-xs" : size === "md" ? "text-sm" : "text-base")}>
                    {label.button} 
                </p>
            )}
            <ButtonUpload config={{ ...config, variant: "button", size: "sm" }} ref={fileInputRef} >
                <MdAdd className={cn("w-4 h-4")} />
            </ButtonUpload>
        </div>
    )
}