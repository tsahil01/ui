import { cn } from "@/lib/utils";
import { MdClose, MdDocumentScanner } from "react-icons/md";

interface FileListProps {
    files: File[];
    onRemove: (index: number) => void;
    size: "xs" | "sm" | "md" | "lg";
    theme?: "light" | "dark";
}

export default function FileList({ files, onRemove, size, theme }: FileListProps) {
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
                    <span className={cn(textSize, {
                        "text-zinc-700": theme !== "dark",
                        "text-zinc-300": theme === "dark",
                    })}>
                        {file.name.length > 20 ? file.name.slice(0, 30) + "..." : file.name}
                    </span>
                </div>
            ))}
        </div>
    )
}

export function FilePreview({ files, onRemove, size, theme }: FileListProps) {
    const textSize = size === "sm" ? "text-xs" : size === "md" ? "text-sm" : "text-base";
    const gapSize = size === "sm" ? "gap-1" : "gap-2";
    const paddingSize = size === "sm" ? "p-1" : "p-2";

    const isImage = (file: File) => {
        return file.type.startsWith('image/');
    };

    return (
        <div className={cn({
            "grid grid-cols-3 gap-1": size === "sm",
            "flex flex-row gap-2": size === "md" || size === "lg",
        })}>
            {files.map((file, index) => (
                <div 
                    key={index} 
                    className={cn("relative flex items-center rounded-md cursor-pointer group", {
                        "bg-white": theme === "light",
                        "bg-zinc-900": theme === "dark",
                    })}
                >
                    {isImage(file) ? (
                        <img
                            src={URL.createObjectURL(file)}
                            alt={file.name}
                            className={cn("w-8 h-8 object-cover rounded", {
                                "w-8 h-8": size === "xs",
                                "w-16 h-16": size === "sm",
                                "w-24 h-24": size === "md",
                                "w-32 h-32": size === "lg",
                            })}
                        />
                    ) :
                        <MdDocumentScanner className={cn("w-8 h-8", {
                            "w-8 h-8": size === "xs",
                            "w-10 h-10": size === "sm",
                            "w-12 h-12": size === "md",
                            "w-14 h-14": size === "lg",
                        })} />
                    }
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onRemove(index);
                        }}
                        className={cn("absolute -top-1 -right-1 bg-zinc-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity", {
                            "w-4 h-4": size === "xs",
                            "w-5 h-5": size === "sm",
                            "w-6 h-6": size === "md",
                            "w-7 h-7": size === "lg",
                        })}
                    >
                        <MdClose className="w-full h-full" />
                    </button>
                </div>
            ))}
        </div>
    )
}