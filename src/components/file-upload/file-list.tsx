import { cn } from "@/lib/utils";
import { GrDocument } from "react-icons/gr";
import { MdClose } from "react-icons/md";

interface FileListProps {
    files: File[];
    onRemove: (index: number) => void;
    onPreview?: (file: File) => void;
    size: "xs" | "sm" | "md" | "lg";
    theme?: "light" | "dark";
}

export default function FileList({ files, onRemove, onPreview, size, theme }: FileListProps) {
    const textSize = size === "sm" ? "text-xs" : size === "md" ? "text-sm" : "text-base";
    const gapSize = size === "sm" ? "gap-1" : "gap-2";
    const paddingSize = size === "sm" ? "p-1" : "p-2";

    return (
        <div className={cn("flex flex-col mt-2", gapSize)}>
            {files.map((file, index) => (
                <div key={index} className={cn("flex items-center gap-2 p-2 rounded-md", {
                    "bg-white": theme === "light",
                    "bg-zinc-900": theme === "dark",
                })}>
                    <button
                        onClick={() => onRemove(index)}
                        className={cn("rounded p-1", paddingSize, {
                            "bg-zinc-200 hover:bg-zinc-300 active:bg-zinc-400": theme !== "dark",
                            "bg-zinc-800 hover:bg-zinc-700 active:bg-zinc-600": theme === "dark",
                        })}
                    >
                        <MdClose className="w-4 h-4" />
                    </button>
                    <span 
                        className={cn(textSize, "cursor-pointer hover:underline", {
                            "text-zinc-700": theme !== "dark",
                            "text-zinc-300": theme === "dark",
                        })}
                        onClick={() => onPreview?.(file)}
                    >
                        {file.name.length > 20 ? file.name.slice(0, 30) + "..." : file.name}
                    </span>
                </div>
            ))}
        </div>
    )
}

export function FilePreview({ files, onRemove, onPreview, size, theme }: FileListProps) {
    const isImage = (file: File) => {
        return file.type.startsWith('image/');
    };

    const renderFilePreview = (file: File, index: number) => {
        const imageSize = {
            "w-8 h-8": size === "xs",
            "w-16 h-16": size === "sm",
            "w-full h-24": size === "md",
            "w-full h-36": size === "lg",
        };

        return (
            <div className="relative w-full h-full">
                {isImage(file) ? (
                    <img
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        className={cn("object-cover rounded-md cursor-pointer", imageSize)}
                        onClick={() => onPreview?.(file)}
                    />
                ) : (
                    <GrDocument 
                        className={cn("text-zinc-500 rounded-md cursor-pointer", imageSize)} 
                        onClick={() => onPreview?.(file)}
                    />
                )}
                <div className={cn("absolute bottom-0 left-0 right-0 px-1 py-0.5 rounded-b text-center shadow-sm text-xs", {
                    "bg-white/90 text-zinc-800": theme === "light",
                    "bg-zinc-800/90 text-zinc-200": theme === "dark",
                })}>
                    {file.name.length > 10 ? file.name.slice(0, 10) + ".." : file.name}
                </div>
            </div>
        );
    };

    return (
        <div className={cn("w-full", {
            "grid grid-cols-3 gap-1": size === "sm",
            "grid grid-cols-2 gap-2": size === "md",
            "grid grid-cols-1 gap-2": size === "lg",
        })}>
            {files.map((file, index) => (
                <div
                    key={index}
                    className={cn("relative flex items-center rounded-md cursor-pointer group", {
                        "bg-white": theme === "light",
                        "bg-zinc-900": theme === "dark",
                    })}
                >
                    {renderFilePreview(file, index)}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onRemove(index);
                        }}
                        className={cn("absolute -top-1 -right-1 bg-zinc-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity w-4 h-4"
                        )}
                    >
                        <MdClose className="w-full h-full" />
                    </button>
                </div>
            ))}
        </div>
    )
}