import { cva } from "class-variance-authority";

export const fileUploadVariants = cva("relative", {
    variants: {
        variant: {
            button: "flex flex-row gap-2 p-3 cursor-pointer mx-auto justify-center items-center",
            dragDrop: "flex flex-col cursor-pointer gap-2 items-center justify-center",
            preview: "flex flex-col gap-2 p-3 border-2 border-dashed border-gray-300 rounded-md cursor-pointer",
            compact: "flex flex-col gap-2 p-3 border-2 border-dashed border-gray-300 rounded-md cursor-pointer",
        },
        size: {
            sm: "text-xs p-2",
            md: "text-base p-3",
            lg: "text-lg p-4",
        },
        bgTheme: {
            light: 'bg-white text-black border border-zinc-300 hover:bg-gray-100',
            dark: 'bg-zinc-900 text-white border border-zinc-700 hover:bg-zinc-800 hover:text-white'
        },
        radius: {
            none: 'rounded-none',
            sm: 'rounded-sm',
            md: 'rounded-md',
            lg: 'rounded-lg',
            xl: 'rounded-xl',
            full: 'rounded-full',
        },
        borderStyle: {
            solid: 'border-solid',
            dashed: 'border-dashed',
            dotted: 'border-dotted',
            double: 'border-double',
        }
    },
    defaultVariants: {
        variant: "button",
        size: "md",
        bgTheme: "dark",
        radius: "md",
    },
})