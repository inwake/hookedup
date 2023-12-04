function ___$insertStyle(e){var t;if(e&&"undefined"!=typeof window)return(t=document.createElement("style")).setAttribute("type","text/css"),t.innerHTML=e,document.head.appendChild(t),e}function _interopDefault(e){return e&&"object"==typeof e&&"default"in e?e.default:e}Object.defineProperty(exports,"__esModule",{value:!0});var react=require("react"),reactNative=require("react-native"),reactNativeSafeAreaContext=require("react-native-safe-area-context"),Geolocation=_interopDefault(require("@react-native-community/geolocation")),firebase=_interopDefault(require("@react-native-firebase/app")),env=_interopDefault(require("react-native-config")),auth=_interopDefault(require("@react-native-firebase/auth"));function usePrevious(e){var t=react.useRef(null);return react.useEffect(function(){t.current=e}),t.current}function usePlatform(){var e=reactNative.Dimensions.get("window"),t=e.width,e=e.height,t=(void 0===t?9:t)/(void 0===e?16:e),e="android"===reactNative.Platform.OS,n="ios"===reactNative.Platform.OS,a="web"===reactNative.Platform.OS,i=e||n,t=a&&t&&1<t;return{platform:Object.keys({android:e,ios:n,web:a,desktopWeb:t}).find(Boolean),isAndroid:e,isIos:n,isMobile:i,isWeb:a,isDesktopWeb:t}}function useAppVisibility(){var n=react.useRef(reactNative.AppState.currentState),e=n.current,t=react.useState(!1),a=t[0],i=t[1],t=react.useState(!1),r=t[0],s=t[1],t="active"===e;return react.useEffect(function(){s(!1),i(!0)},[]),react.useEffect(function(){var e=reactNative.AppState.addEventListener("change",function(e){var t="inactive"===(n.current=e);i("active"===e),s(t)});return function(){null!=e&&e.remove()}}),{activeState:e,isActive:t,foreground:a,background:r}}function useDimensions(e){var i=e.isWeb,r=e.isDesktopWeb,e=react.useState(reactNative.Dimensions.get("window")),t=e[0],s=e[1],o=reactNativeSafeAreaContext.useSafeAreaFrame();return react.useEffect(function(){t();var e=reactNative.Dimensions.addEventListener("change",t);function t(){var e=reactNative.Dimensions.get("window"),t=i||r?e:o,n=t.width,t=t.height,a=e.scale,e=e.fontScale;s({width:n,height:t,scale:a,fontScale:e})}return function(){null!=e&&e.remove()}},[i,r,o]),t}var screens=[{size:"sm",width:480},{size:"md",width:720},{size:"lg",width:1080},{size:"xl",width:1440}];function useCurrentScreen(){var e=react.useState("md"),t=e[0],n=e[1],a=reactNative.Dimensions.get("window");return react.useEffect(function(){var e;n((null==(e=screens.find(function(e){a.width,e.width}))?void 0:e.size)||"xs")},[a.width]),t}var __assign=function(){return(__assign=Object.assign||function(e){for(var t,n=1,a=arguments.length;n<a;n++)for(var i in t=arguments[n])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e}).apply(this,arguments)};function __rest(e,t){var n={};for(i in e)Object.prototype.hasOwnProperty.call(e,i)&&t.indexOf(i)<0&&(n[i]=e[i]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var a=0,i=Object.getOwnPropertySymbols(e);a<i.length;a++)t.indexOf(i[a])<0&&Object.prototype.propertyIsEnumerable.call(e,i[a])&&(n[i[a]]=e[i[a]]);return n}var defaultCconfig={skipPermissionRequests:!1,enableBackgroundLocationUpdates:!1,authorizationLevel:"whenInUse",locationProvider:"auto"},defaultGetOptions={enableHighAccuracy:!0,timeout:1e4,maximumAge:1e4},defaultStreamOptions={enableHighAccuracy:!0,interval:2500,fastestInterval:1e3,timeout:1e4,maximumAge:1e4,distanceFilter:25};function usePosition(e){var e=void 0===e?{}:e,t=e.streamPosition,n=void 0!==t&&t,t=e.config,t=void 0===t?defaultCconfig:t,a=e.getOptions,a=void 0===a?defaultGetOptions:a,e=e.streamOptions,e=void 0===e?defaultStreamOptions:e,i=__assign(__assign({},defaultCconfig),t),r=__assign(__assign({},defaultGetOptions),a),s=__assign(__assign({},defaultStreamOptions),e),t=react.useState(null),a=t[0],o=t[1],e=react.useState(null),t=e[0],u=e[1],e=react.useState(),c=e[0],l=e[1],e=react.useState(!1),f=e[0],d=e[1];function v(e){var t=e.coords,e=e.timestamp,n={speed:t.speed,heading:t.heading},t={latitude:t.latitude,longitude:t.longitude,accuracy:t.accuracy,altitude:t.altitude,altitudeAccuracy:t.altitudeAccuracy,timestamp:e};return o(t),u(n),d(!0),t}function m(e){var t=e.code,n=e.message,a=__rest(e,["code","message"]),i=["PERMISSION_DENIED","POSITION_UNAVAILABLE","TIMEOUT"],e={status:Object.keys(a).find(function(e){var t=a[e];return Boolean(Number(t))&&i.includes(e)})||"UNKNOWN_ERROR",message:n,code:t};return l(e),d(!0),e}return react.useEffect(function(){Geolocation.setRNConfiguration(i)},[]),react.useEffect(function(){var t=!!n&&Geolocation.watchPosition(v,m,s);return function(){var e;(e=t)&&Geolocation.clearWatch(e)}},[n,s]),{position:a,motion:t,error:c,ready:f,getPosition:function(){return new Promise(function(t,n){Geolocation.getCurrentPosition(function(e){e=v(e),t(e)},function(e){m(e),n(e)},r)})}}}const config={apiKey:env.API_KEY,authDomain:env.AUTH_DOMAIN,databaseURL:env.DATABASE_URL,projectId:env.PROJECT_ID,storageBucket:env.STORAGE_BUCKET,messagingSenderId:env.MESSAGING_SENDER_ID,appId:env.APP_ID};function useFirebase(){const[e,t]=react.useState(!1),[n,a]=react.useState(null);return react.useEffect(()=>{firebase.apps.length?t(!0):firebase.initializeApp(config).then(function(){t(!0)}).catch(function(e){a(e)})},[]),{firebase:firebase,firebaseReady:e,error:n}}function useFirebaseAnalytics({enabled:n=!1,firebase:a,firebaseReady:e,routerLocation:i,pathToPageName:r}){const[s,t]=react.useState(!1),[o,u]=react.useState(null);function c(e,t){return n?s?void a.analytics().logScreenView({screen_name:e,screen_class:t}):u({message:"Analytics not initialized"}):u({message:"Analytics disabled"})}return react.useEffect(function(){e&&a.analytics().setAnalyticsCollectionEnabled(Boolean(n)).then(function(){t(!0)}).catch(function(e){n?u({message:"Failed to enable analytics",error:e}):u({message:"Failed to disable analytics",error:e})})},[n,a,e]),react.useEffect(function(){var t=i?.pathname;if([n,e,s,t].every(Boolean)){let e=t;c(e=r?r(t):e,t)}},[n,s,i,r]),{analyticsPageView:c,analyticsEvent:function(e,t){return n?s?[e,t].every(Boolean)?void a.analytics().logEvent(e,t):u({message:"Event name and value required"}):u({message:"Analytics not initialized"}):u({message:"Analytics disabled"})},error:o}}function useFirebaseAuth({firebaseReady:a}){const[e,i]=react.useState(null),[t,r]=react.useState(null),[n,s]=react.useState(!0),[o,u]=react.useState(null),[c,l]=react.useState(!1);function f(e){r(e),l(!0),s(!1)}return react.useEffect(function(){if(a)return s(!0),auth().onAuthStateChanged(f)},[a]),{auth:auth,user:t,additionalUserInfo:e,loading:n,error:o,userReady:c,signInWithEmailAndPassword:function(e,t){return a?(s(!0),auth().signInWithEmailAndPassword(e,t).then(function({user:e,additionalUserInfo:t}){i(t),r(e),s(!1),l(!0)}).catch(function(e){u({message:"Unsuccessful sign in",error:e})})):u({message:"Firebase not ready"})},signUpWithEmailAndPassword:function(e,t){if(!a)return u({message:"Firebase not ready"});const n={"auth/email-already-in-use":"Email already in use","auth/invalid-email":"Email is invalid"};return s(!0),auth().createUserWithEmailAndPassword(e,t).then(function({user:e,additionalUserInfo:t}){i(t),r(e),s(!1),l(!0)}).catch(function(e){s(!1),u({message:n[e.code]||"Unsuccessful sign up",error:e})})},signOut:function(){return a?t?(s(!0),new Promise(function(e,t){auth().signOut().then(function(){r(null),i(null),s(!1),l(!1),e()}).catch(function(e){e={error:e,message:"Unsuccessful sign out"};u(e),t(e)})})):u({message:"No user signed in"}):u({message:"Firebase not ready"})},findUserByEmail:function(e){return a?new Promise(function(t,n){s(!0),auth().fetchSignInMethodsForEmail(e).then(function(e){t(e)}).catch(function(e){u({message:"Unsuccessful sign in",error:e}),n(e)})}):u({message:"Firebase not ready"})}}}exports.useAppVisibility=useAppVisibility,exports.useCurrentScreen=useCurrentScreen,exports.useDimensions=useDimensions,exports.useFirebase=useFirebase,exports.useFirebaseAnalytics=useFirebaseAnalytics,exports.useFirebaseAuth=useFirebaseAuth,exports.usePlatform=usePlatform,exports.usePosition=usePosition,exports.usePrevious=usePrevious;
//# sourceMappingURL=index.js.map
