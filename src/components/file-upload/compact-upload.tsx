import { UploadConfig } from "./types";

export function CompactUpload({ config, ref, validateFile, setFiles }: { config: UploadConfig, ref: React.RefObject<HTMLInputElement | null>, validateFile: (fileList: FileList) => File[], setFiles: (files: File[]) => void }) {
    const { variant, size, label, theme } = config;
    const fileInputRef = ref;

    return (
        <div>
            <h1>Compact Upload</h1>
        </div>
    )
}