export interface UploadConfig {
    variant: 'button' | 'dragDrop' | 'preview' | 'compact';
    size: 'sm' | 'md' | 'lg';
    allowMultiple: boolean;
    maxSizeInMb: number;
    accept:string[];
    label: {
        button: string;
        dropZone: string;
    }
    theme?: {
        radius?: 'none' | 'sm' | 'md' | 'lg' | 'full';
        borderStyle?: 'solid' | 'dashed' | 'dotted';
        bgTheme?: 'dark' | 'light';
    }
};
