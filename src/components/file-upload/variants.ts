import { cva } from "class-variance-authority";

export const fileUploadVariants = cva("flex flex-col gap-2 p-3", {
    variants: {
        variant: {
            button: "",
            dragDrop: "",
            preview: "",
            compact: "",
        },
        size: {
            sm: "",
            md: "",
            lg: "",
        },
    },
    defaultVariants: {
        variant: "button",
        size: "md",
    },
})