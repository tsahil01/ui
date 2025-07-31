"use client";

import { cn } from "@/lib/utils";
import { FileUpload, UploadConfig } from "@tsahil01/file-upload";
import { useState } from "react";

export default function DemoPage() {
    const [config, setConfig] = useState<UploadConfig>({
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
    });

    const llmTxt = ` 
// installation
npm install @tsahil01/file-upload

// config
interface UploadConfig {
    variant: 'button' | 'dragDrop' | 'preview' | 'compact';
    size: 'xs' | 'sm' | 'md' | 'lg';
    allowMultiple: boolean;
    maxSizeInMb: number;
    accept: string[];
    label: {
        button: string;
        dropZone: string;
    };
    theme?: {
        radius?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
        borderStyle?: 'solid' | 'dashed' | 'dotted' | 'double';
        bgTheme?: 'dark' | 'light';
    };
}`

    const [configJson, setConfigJson] = useState(() =>
        JSON.stringify(config, null, 2)
    );

    const handleUpload = () => {
        console.log("Uploading files...");
    };

    const handleConfigChange = (newConfig: string) => {
        setConfigJson(newConfig);
        try {
            const parsed = JSON.parse(newConfig);
            setConfig(parsed);
        } catch (error) {
            console.error("Invalid JSON config");
        }
    };

    const updateConfig = (updates: Partial<UploadConfig>) => {
        const newConfig = { ...config, ...updates };
        setConfig(newConfig);
        setConfigJson(JSON.stringify(newConfig, null, 2));
    };

    return (
        <>
            <div className="flex flex-col lg:flex-row h-screen bg-zinc-950">
                <div className="flex-1 flex items-center justify-center w-full h-full p-4 lg:p-8">
                    <div className={cn("p-4 lg:p-8 rounded-lg", {
                        "bg-white": config.theme?.bgTheme === "light",
                        "bg-zinc-900": config.theme?.bgTheme === "dark",
                    })}>
                        <FileUpload config={config} onUpload={handleUpload} />
                    </div>
                </div>

                <div className="w-full lg:w-1/3 bg-zinc-900 lg:border-l border-zinc-800 p-4 lg:p-6 overflow-y-auto">
                    <div className="flex items-center justify-between mb-4 lg:mb-6">
                        <h2 className="text-lg lg:text-xl font-semibold text-white">Live Config Editor</h2>
                    </div>
                    
                    <div className="mb-4">
                        <div className="mt-2 p-3 lg:p-4 bg-zinc-800 rounded-lg text-xs text-zinc-300 space-y-3">
                            <div>
                                <h4 className="font-medium text-zinc-200 mb-2">llm.txt</h4>
                                <pre className="bg-zinc-900 p-2 rounded overflow-x-auto text-xs">
                                    {llmTxt}
                                </pre>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="flex-1">
                            <div className="relative">
                                <textarea
                                    value={configJson}
                                    onChange={(e) => handleConfigChange(e.target.value)}
                                    className={cn(
                                        "w-full h-48 lg:h-96 p-3 lg:p-4 font-mono text-xs lg:text-sm bg-zinc-800 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none",
                                        "border-zinc-700 focus:ring-blue-500"
                                    )}
                                    placeholder="Enter JSON configuration..."
                                    spellCheck={false}
                                    autoComplete="off"
                                    autoCorrect="off"
                                    autoCapitalize="off"
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div>
                                <h3 className="text-xs font-medium text-zinc-300 mb-1">Variant</h3>
                                <div className="grid grid-cols-2 gap-2">
                                    {(['button', 'dragDrop', 'preview', 'compact'] as const).map((variant) => (
                                        <button
                                            key={variant}
                                            onClick={() => updateConfig({ variant })}
                                            className={cn(
                                                "px-2 lg:px-3 py-2 rounded-md text-xs lg:text-sm font-medium transition-colors",
                                                config.variant === variant
                                                    ? "bg-blue-600 text-white"
                                                    : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                                            )}
                                        >
                                            {variant.replace(/([A-Z])/g, ' $1').trim()}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xs font-medium text-zinc-300 mb-1">Size</h3>
                                <div className="grid grid-cols-3 gap-2">
                                    {(['sm', 'md', 'lg'] as const).map((size) => (
                                        <button
                                            key={size}
                                            onClick={() => updateConfig({ size })}
                                            className={cn(
                                                "px-2 lg:px-3 py-2 rounded-md text-xs lg:text-sm font-medium transition-colors",
                                                config.size === size
                                                    ? "bg-blue-600 text-white"
                                                    : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                                            )}
                                        >
                                            {size.toUpperCase()}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        id="allowMultiple"
                                        checked={config.allowMultiple}
                                        onChange={(e) => updateConfig({ allowMultiple: e.target.checked })}
                                        className="w-3 h-3 text-blue-600 bg-zinc-800 border-zinc-700 rounded focus:ring-blue-500"
                                    />
                                    <label htmlFor="allowMultiple" className="text-xs text-zinc-300">
                                        Allow Multiple Files
                                    </label>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        id="darkTheme"
                                        checked={config.theme?.bgTheme === "dark"}
                                        onChange={(e) => updateConfig({
                                            theme: { ...config.theme, bgTheme: e.target.checked ? "dark" : "light" }
                                        })}
                                        className="w-3 h-3 text-blue-600 bg-zinc-800 border-zinc-700 rounded focus:ring-blue-500"
                                    />
                                    <label htmlFor="darkTheme" className="text-xs text-zinc-300">
                                        Dark Theme
                                    </label>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xs font-medium text-zinc-300 mb-1">Border Radius</h3>
                                <div className="grid grid-cols-3 gap-2">
                                    {(['none', 'sm', 'md', 'lg', 'xl', 'full'] as const).map((radius) => (
                                        <button
                                            key={radius}
                                            onClick={() => updateConfig({
                                                theme: { ...config.theme, radius }
                                            })}
                                            className={cn(
                                                "px-2 lg:px-3 py-2 rounded-md text-xs lg:text-sm font-medium transition-colors",
                                                config.theme?.radius === radius
                                                    ? "bg-blue-600 text-white"
                                                    : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                                            )}
                                        >
                                            {radius.toUpperCase()}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xs font-medium text-zinc-300 mb-1">Border Style</h3>
                                <div className="grid grid-cols-2 gap-2">
                                    {(['solid', 'dashed', 'dotted', 'double'] as const).map((style) => (
                                        <button
                                            key={style}
                                            onClick={() => updateConfig({
                                                theme: { ...config.theme, borderStyle: style }
                                            })}
                                            className={cn(
                                                "px-2 lg:px-3 py-2 rounded-md text-xs lg:text-sm font-medium transition-colors",
                                                config.theme?.borderStyle === style
                                                    ? "bg-blue-600 text-white"
                                                    : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                                            )}
                                        >
                                            {style}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="text-xs text-zinc-300 block mb-1">Max Size (MB)</label>
                                <input
                                    type="number"
                                    value={config.maxSizeInMb}
                                    onChange={(e) => updateConfig({ maxSizeInMb: Number(e.target.value) })}
                                    className="w-full px-2 py-1 bg-zinc-800 border border-zinc-700 rounded text-white text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    min="1"
                                    max="100"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
