
;(function (global) {
  
  

  var _exports = (function () {
    var module = undefined;
    var exports = undefined;
    return requirejs('packages/svg-renderer/svg-renderer');
  }).call(global);
  if ( typeof module === "object" && typeof module.exports === "object" ) {
    module.exports = _exports;
  } else {
    global.SVGRenderer = _exports;
  }
})(typeof window !== 'undefined' ? window : this || {});