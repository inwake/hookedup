export default function usePlatform(): {
    platform: string | undefined;
    isAndroid: boolean;
    isIos: boolean;
    isMobile: boolean;
    isWeb: boolean;
    isDesktopWeb: boolean | 0;
};
