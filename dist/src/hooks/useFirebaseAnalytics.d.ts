export default function useFirebaseAnalytics({ enabled, firebase, firebaseReady, routerLocation, pathToPageName }: {
    enabled?: boolean | undefined;
    firebase: any;
    firebaseReady: any;
    routerLocation: any;
    pathToPageName: any;
}): {
    analyticsPageView: (pageName: any, path: any) => void;
    analyticsEvent: (name: any, value: any) => void;
    error: null;
};
