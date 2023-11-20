function ___$insertStyle(e){var t;if(e&&"undefined"!=typeof window)return(t=document.createElement("style")).setAttribute("type","text/css"),t.innerHTML=e,document.head.appendChild(t),e}function _interopDefault(e){return e&&"object"==typeof e&&"default"in e?e.default:e}Object.defineProperty(exports,"__esModule",{value:!0});var react=require("react"),reactNative=require("react-native"),reactNativeSafeAreaContext=require("react-native-safe-area-context"),Geolocation=_interopDefault(require("@react-native-community/geolocation"));function usePrevious(e){var t=react.useRef(null);return react.useEffect(function(){t.current=e}),t.current}function usePlatform(){var e=reactNative.Dimensions.get("window"),t=e.width,e=e.height,t=(void 0===t?9:t)/(void 0===e?16:e),e="android"===reactNative.Platform.OS,i="ios"===reactNative.Platform.OS,n="web"===reactNative.Platform.OS,r=e||i,t=n&&t&&1<t;return{platform:Object.keys({android:e,ios:i,web:n,desktopWeb:t}).find(Boolean),isAndroid:e,isIos:i,isMobile:r,isWeb:n,isDesktopWeb:t}}function useAppVisibility(){var i=react.useRef(reactNative.AppState.currentState),e=i.current,t=react.useState(!1),n=t[0],r=t[1],t=react.useState(!1),a=t[0],o=t[1],t="active"===e;return react.useEffect(function(){o(!1),r(!0)},[]),react.useEffect(function(){var e=reactNative.AppState.addEventListener("change",function(e){var t="inactive"===(i.current=e);r("active"===e),o(t)});return function(){null!=e&&e.remove()}}),{activeState:e,isActive:t,foreground:n,background:a}}function useDimensions(e){var r=e.isWeb,a=e.isDesktopWeb,e=react.useState(reactNative.Dimensions.get("window")),t=e[0],o=e[1],s=reactNativeSafeAreaContext.useSafeAreaFrame();return react.useEffect(function(){t();var e=reactNative.Dimensions.addEventListener("change",t);function t(){var e=reactNative.Dimensions.get("window"),t=r||a?e:s,i=t.width,t=t.height,n=e.scale,e=e.fontScale;o({width:i,height:t,scale:n,fontScale:e})}return function(){null!=e&&e.remove()}},[r,a,s]),t}var screens=[{size:"sm",width:480},{size:"md",width:720},{size:"lg",width:1080},{size:"xl",width:1440}];function useCurrentScreen(){var e=react.useState("md"),t=e[0],i=e[1],n=reactNative.Dimensions.get("window");return react.useEffect(function(){var e;i((null==(e=screens.find(function(e){n.width,e.width}))?void 0:e.size)||"xs")},[n.width]),t}var __assign=function(){return(__assign=Object.assign||function(e){for(var t,i=1,n=arguments.length;i<n;i++)for(var r in t=arguments[i])Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e}).apply(this,arguments)};function __rest(e,t){var i={};for(r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(i[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var n=0,r=Object.getOwnPropertySymbols(e);n<r.length;n++)t.indexOf(r[n])<0&&Object.prototype.propertyIsEnumerable.call(e,r[n])&&(i[r[n]]=e[r[n]]);return i}var defaultCconfig={skipPermissionRequests:!1,enableBackgroundLocationUpdates:!1,authorizationLevel:"whenInUse",locationProvider:"auto"},defaultGetOptions={enableHighAccuracy:!0,timeout:1e4,maximumAge:1e4},defaultStreamOptions={enableHighAccuracy:!0,interval:2500,fastestInterval:1e3,timeout:1e4,maximumAge:1e4,distanceFilter:25};function usePosition(e){var e=void 0===e?{}:e,t=e.streamPosition,i=void 0!==t&&t,t=e.config,t=void 0===t?defaultCconfig:t,n=e.getOptions,n=void 0===n?defaultGetOptions:n,e=e.streamOptions,e=void 0===e?defaultStreamOptions:e,r=__assign(__assign({},defaultCconfig),t),a=__assign(__assign({},defaultGetOptions),n),o=__assign(__assign({},defaultStreamOptions),e),t=react.useState(null),n=t[0],s=t[1],e=react.useState(null),t=e[0],u=e[1],e=react.useState(),c=e[0],f=e[1],e=react.useState(!1),l=e[0],d=e[1];function v(e){var t=e.coords,e=e.timestamp,i={speed:t.speed,heading:t.heading},t={latitude:t.latitude,longitude:t.longitude,accuracy:t.accuracy,altitude:t.altitude,altitudeAccuracy:t.altitudeAccuracy,timestamp:e};return s(t),u(i),d(!0),t}function p(e){var t=e.code,i=e.message,n=__rest(e,["code","message"]),r=["PERMISSION_DENIED","POSITION_UNAVAILABLE","TIMEOUT"],e={status:Object.keys(n).find(function(e){var t=n[e];return Boolean(Number(t))&&r.includes(e)})||"UNKNOWN_ERROR",message:i,code:t};return f(e),d(!0),e}return react.useEffect(function(){Geolocation.setRNConfiguration(r)},[]),react.useEffect(function(){var t=!!i&&Geolocation.watchPosition(v,p,o);return function(){var e;(e=t)&&Geolocation.clearWatch(e)}},[i,o]),{position:n,motion:t,error:c,ready:l,getPosition:function(){return new Promise(function(t,i){Geolocation.getCurrentPosition(function(e){e=v(e),t(e)},function(e){p(e),i(e)},a)})}}}exports.useAppVisibility=useAppVisibility,exports.useCurrentScreen=useCurrentScreen,exports.useDimensions=useDimensions,exports.usePlatform=usePlatform,exports.usePosition=usePosition,exports.usePrevious=usePrevious;
//# sourceMappingURL=index.js.map
