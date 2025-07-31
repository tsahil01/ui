import { cn } from "@/lib/utils";
import { MdClose } from "react-icons/md";

export default function FileList({ files, onRemove, size }: { files: File[], onRemove: (index: number) => void, size: "sm" | "md" | "lg" }) {
    const textSize = size === "sm" ? "text-xs" : size === "md" ? "text-sm" : "text-base";
    return (
        <div className="flex flex-col gap-2 mt-2">
            {files.map((file, index) => (
                <div key={index} className="flex items-center gap-2">
                    <button onClick={() => onRemove(index)}>
                        <MdClose />
                    </button>
                    <span className={cn(textSize)}>
                        {file.name.length > 20 ? file.name.slice(0, 20) + "..." : file.name}
                    </span>
                </div>
            ))}
        </div>
    )
}