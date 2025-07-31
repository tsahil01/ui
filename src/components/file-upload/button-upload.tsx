import { cn } from "@/lib/utils";
import { MdCloudUpload } from "react-icons/md";
import { Root } from "@radix-ui/react-slot";
import { fileUploadVariants } from "./variants";
import { UploadConfig } from "./types";

export function ButtonUpload({ config, ref, children }: { config: UploadConfig, ref: React.RefObject<HTMLInputElement | null>, children?: React.ReactNode }) {
    const { variant, size, label, theme } = config;
    const fileInputRef = ref;

    return (
        <Root>
            <button className={cn(fileUploadVariants({ variant, size, bgTheme: theme?.bgTheme, radius: theme?.radius }))} onClick={() => fileInputRef.current?.click()}>
                {!children && (<>
                    <MdCloudUpload className={cn(size === "xs" ? "w-4 h-4" : size === "sm" ? "w-5 h-5" : size === "md" ? "w-6 h-6" : "w-7 h-7")} />
                    {label.button}
                </>)}
                {children}
            </button>
        </Root>
    )
}
