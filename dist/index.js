function ___$insertStyle(e){var t;if(e&&"undefined"!=typeof window)return(t=document.createElement("style")).setAttribute("type","text/css"),t.innerHTML=e,document.head.appendChild(t),e}function _interopDefault(e){return e&&"object"==typeof e&&"default"in e?e.default:e}Object.defineProperty(exports,"__esModule",{value:!0});var react=require("react"),PropTypes=_interopDefault(require("prop-types")),reactNative=require("react-native"),validateInitialValue=function(e){return"string"==typeof e&&(console.log("you have passed a string when a number is required. It still may work however. Please pass a number."),e=parseInt(e,10)),isNaN(e)&&(console.log("you really want to break the validation. Please pass a number as parameter. Defaulting to zero."),e=0),e},useCounter=function(e){var t=validateInitialValue(e=void 0===e?0:e),e=react.useState(t),r=e[0],i=e[1];return{count:r,increment:react.useCallback(function(){return i(function(e){return e+1})},[]),decrement:react.useCallback(function(){return i(function(e){return e-1})},[]),reset:react.useCallback(function(){return i(t)},[t])}};function useAppVisibility(){var r=react.useRef(reactNative.AppState.currentState),e=r.current,t=react.useState(!1),i=t[0],n=t[1],t=react.useState(!1),u=t[0],a=t[1],t="active"===e;return react.useEffect(function(){a(!1),n(!0)},[]),react.useEffect(function(){var e=reactNative.AppState.addEventListener("change",function(e){var t="inactive"===(r.current=e);n("active"===e),a(t)});return function(){null!=e&&e.remove()}}),{activeState:e,isActive:t,foreground:i,background:u}}useCounter.PropTypes={initialValue:PropTypes.number.isRequired},useCounter.defaultProps={initialValue:0},exports.useAppVisibility=useAppVisibility,exports.useCounter=useCounter,exports.useCurrentScreen=useAppVisibility,exports.useDimensions=useAppVisibility,exports.useGPS=useAppVisibility,exports.usePlatform=useAppVisibility,exports.usePrevious=useAppVisibility;
//# sourceMappingURL=index.js.map