import { cn } from "@/lib/utils";
import { MdClose } from "react-icons/md";

interface FileListProps {
    files: File[];
    onRemove: (index: number) => void;
    size: "sm" | "md" | "lg";
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
                    "bg-zinc-100": theme === "light",
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
                        {file.name.length > 20 ? file.name.slice(0, 20) + "..." : file.name}
                    </span>
                </div>
            ))}
        </div>
    )
}