export default function useFirebaseAnalytics({ enabled, firebaseReady, routerLocation, pathToPageName }: {
    enabled?: boolean | undefined;
    firebaseReady: any;
    routerLocation: any;
    pathToPageName: any;
}): {
    analyticsPageView: (pageName: any, path: any) => void;
    analyticsEvent: (name: any, value: any) => void;
    error: null;
};
