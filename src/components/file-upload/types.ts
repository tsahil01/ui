export interface UploadConfig {
    variant: 'button' | 'dragDrop' | 'preview' | 'compact';
    size: 'xs' | 'sm' | 'md' | 'lg';
    allowMultiple: boolean;
    maxSizeInMb: number;
    accept:string[];
    label: {
        button: string;
        dropZone: string;
    }
    theme?: {
        radius?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
        borderStyle?: 'solid' | 'dashed' | 'dotted' | 'double';
        bgTheme?: 'dark' | 'light';
    }
};
