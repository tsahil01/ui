"use client";

import { cn } from "@/lib/utils";
import { FileUpload, UploadConfig } from "@tsahil01/file-upload";
import { useState } from "react";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as Switch from "@radix-ui/react-switch";
import * as Tabs from "@radix-ui/react-tabs";



export default function DemoPage() {
    const [config, setConfig] = useState<UploadConfig>({
        variant: "dragDrop",
        size: "md",
        allowMultiple: true,
        maxSizeInMb: 10,
        accept: ["image/*", "application/pdf"],
        label: {
            button: "Upload Documents",
            dropZone: "Drag and drop files here.",
        },
        theme: {
            bgTheme: "dark",
            radius: "lg",
            borderStyle: "double",
        },
    });

    const handleUpload = () => {
        console.log("Uploading...");
    }

    const updateConfig = (updates: Partial<UploadConfig>) => {
        setConfig(prev => ({ ...prev, ...updates }));
    };

    const updateTheme = (updates: Partial<UploadConfig['theme']>) => {
        setConfig(prev => ({
            ...prev,
            theme: { ...prev.theme, ...updates }
        }));
    };

    const updateLabels = (updates: Partial<UploadConfig['label']>) => {
        setConfig(prev => ({
            ...prev,
            label: { ...prev.label, ...updates }
        }));
    };

    return (
        <div className={cn("flex flex-col md:flex-row items-center justify-between h-screen w-screen mx-auto gap-4 bg-zinc-950")}>
            <div className={cn("flex flex-col items-center justify-center w-1/2 h-full", {
                "bg-zinc-100": config.theme?.bgTheme === "light",
                "bg-zinc-950": config.theme?.bgTheme === "dark",
            })}>
                <FileUpload config={config} onUpload={handleUpload} />
            </div>
            <div className="flex flex-col w-1/2 bg-zinc-900 h-full p-6 overflow-y-auto">
                <h2 className="text-xl font-semibold text-white mb-6">Config</h2>
                
                <Tabs.Root defaultValue="variant" className="w-full">
                    <Tabs.List className="flex space-x-1 bg-zinc-800 p-1 rounded-lg mb-6">
                        <Tabs.Trigger
                            value="variant"
                            className="flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors data-[state=active]:bg-zinc-700 data-[state=active]:text-white text-zinc-400"
                        >
                            Variant
                        </Tabs.Trigger>
                        <Tabs.Trigger
                            value="theme"
                            className="flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors data-[state=active]:bg-zinc-700 data-[state=active]:text-white text-zinc-400"
                        >
                            Theme
                        </Tabs.Trigger>
                        <Tabs.Trigger
                            value="settings"
                            className="flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors data-[state=active]:bg-zinc-700 data-[state=active]:text-white text-zinc-400"
                        >
                            Settings
                        </Tabs.Trigger>
                    </Tabs.List>

                    <Tabs.Content value="variant" className="space-y-4">
                        <div>
                            <h3 className="text-sm font-medium text-zinc-300 mb-3">Variant</h3>
                            <div className="grid grid-cols-2 gap-2">
                                {(['button', 'dragDrop', 'preview', 'compact'] as const).map((variant) => (
                                    <Checkbox.Root
                                        key={variant}
                                        checked={config.variant === variant}
                                        onCheckedChange={() => updateConfig({ variant })}
                                        className="flex items-center space-x-2 p-3 rounded-lg border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 transition-colors"
                                    >
                                        <Checkbox.Indicator className="text-blue-500">
                                            <div className="w-4 h-4 bg-blue-500 rounded-sm flex items-center justify-center">
                                                <div className="w-2 h-2 bg-white rounded-sm"></div>
                                            </div>
                                        </Checkbox.Indicator>
                                        <span className="text-sm text-zinc-300 capitalize">
                                            {variant.replace(/([A-Z])/g, ' $1').trim()}
                                        </span>
                                    </Checkbox.Root>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-medium text-zinc-300 mb-3">Size</h3>
                            <div className="grid grid-cols-4 gap-2">
                                {(['xs', 'sm', 'md', 'lg'] as const).map((size) => (
                                    <Checkbox.Root
                                        key={size}
                                        checked={config.size === size}
                                        onCheckedChange={() => updateConfig({ size })}
                                        className="flex items-center justify-center p-2 rounded-lg border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 transition-colors"
                                    >
                                        <Checkbox.Indicator className="text-blue-500">
                                            <div className="w-4 h-4 bg-blue-500 rounded-sm flex items-center justify-center">
                                                <div className="w-2 h-2 bg-white rounded-sm"></div>
                                            </div>
                                        </Checkbox.Indicator>
                                        <span className="text-sm text-zinc-300 font-medium">
                                            {size.toUpperCase()}
                                        </span>
                                    </Checkbox.Root>
                                ))}
                            </div>
                        </div>
                    </Tabs.Content>

                    <Tabs.Content value="theme" className="space-y-4">
                        <div>
                            <h3 className="text-sm font-medium text-zinc-300 mb-3">Background</h3>
                            <div className="grid grid-cols-2 gap-2">
                                {(['light', 'dark'] as const).map((theme) => (
                                    <Checkbox.Root
                                        key={theme}
                                        checked={config.theme?.bgTheme === theme}
                                        onCheckedChange={() => updateTheme({ bgTheme: theme })}
                                        className="flex items-center space-x-2 p-3 rounded-lg border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 transition-colors"
                                    >
                                        <Checkbox.Indicator className="text-blue-500">
                                            <div className="w-4 h-4 bg-blue-500 rounded-sm flex items-center justify-center">
                                                <div className="w-2 h-2 bg-white rounded-sm"></div>
                                            </div>
                                        </Checkbox.Indicator>
                                        <span className="text-sm text-zinc-300 capitalize">
                                            {theme}
                                        </span>
                                    </Checkbox.Root>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-medium text-zinc-300 mb-3">Border Radius</h3>
                            <div className="grid grid-cols-3 gap-2">
                                {(['none', 'sm', 'md', 'lg', 'xl', 'full'] as const).map((radius) => (
                                    <Checkbox.Root
                                        key={radius}
                                        checked={config.theme?.radius === radius}
                                        onCheckedChange={() => updateTheme({ radius })}
                                        className="flex items-center justify-center p-2 rounded-lg border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 transition-colors"
                                    >
                                        <Checkbox.Indicator className="text-blue-500">
                                            <div className="w-4 h-4 bg-blue-500 rounded-sm flex items-center justify-center">
                                                <div className="w-2 h-2 bg-white rounded-sm"></div>
                                            </div>
                                        </Checkbox.Indicator>
                                        <span className="text-xs text-zinc-300 font-medium">
                                            {radius.toUpperCase()}
                                        </span>
                                    </Checkbox.Root>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-medium text-zinc-300 mb-3">Border Style</h3>
                            <div className="grid grid-cols-2 gap-2">
                                {(['solid', 'dashed', 'dotted', 'double'] as const).map((style) => (
                                    <Checkbox.Root
                                        key={style}
                                        checked={config.theme?.borderStyle === style}
                                        onCheckedChange={() => updateTheme({ borderStyle: style })}
                                        className="flex items-center space-x-2 p-3 rounded-lg border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 transition-colors"
                                    >
                                        <Checkbox.Indicator className="text-blue-500">
                                            <div className="w-4 h-4 bg-blue-500 rounded-sm flex items-center justify-center">
                                                <div className="w-2 h-2 bg-white rounded-sm"></div>
                                            </div>
                                        </Checkbox.Indicator>
                                        <span className="text-sm text-zinc-300 capitalize">
                                            {style}
                                        </span>
                                    </Checkbox.Root>
                                ))}
                            </div>
                        </div>
                    </Tabs.Content>

                    <Tabs.Content value="settings" className="space-y-4">
                        <div className="flex items-center justify-between p-3 rounded-lg border border-zinc-700 bg-zinc-800">
                            <label className="text-sm text-zinc-300">Multiple Files</label>
                            <Switch.Root
                                checked={config.allowMultiple}
                                onCheckedChange={(checked) => updateConfig({ allowMultiple: checked })}
                                className="w-11 h-6 bg-zinc-700 rounded-full relative data-[state=checked]:bg-blue-600 transition-colors"
                            >
                                <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[22px]" />
                            </Switch.Root>
                        </div>

                        <div>
                            <label className="text-sm text-zinc-300 block mb-2">Max Size (MB)</label>
                            <input
                                type="number"
                                value={config.maxSizeInMb}
                                onChange={(e) => updateConfig({ maxSizeInMb: Number(e.target.value) })}
                                className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                min="1"
                                max="100"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-zinc-300 block mb-2">Button Label</label>
                            <input
                                type="text"
                                value={config.label.button}
                                onChange={(e) => updateLabels({ button: e.target.value })}
                                className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-zinc-300 block mb-2">Drop Zone Label</label>
                            <input
                                type="text"
                                value={config.label.dropZone}
                                onChange={(e) => updateLabels({ dropZone: e.target.value })}
                                className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </Tabs.Content>
                </Tabs.Root>
            </div>
        </div>
    );
}
