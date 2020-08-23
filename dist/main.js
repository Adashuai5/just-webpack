
    (function(parseGraph) {
      function require(fileName) {
        function localRequire(params) {
          return require(parseGraph[fileName].dependents[params])
        }
        var exports = {};
        (function(require, exports, code) {
          eval(code)
        })(localRequire, exports, parseGraph[fileName].code);
        return exports;
      }
      require("./src/index.js")
    })({"./src/index.js":{"code":"\"use strict\";\n\nvar _helper = require(\"./helper.js\");\n\nvar a = 2;\nvar b = 1;\nvar addNum = (0, _helper.add)(a, b);\nvar minusNum = (0, _helper.minus)(a, b);\nconsole.log(addNum, minusNum);","dependents":{"./helper.js":"src\\helper.js"}},"src\\helper.js":{"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.minus = exports.add = void 0;\n\nvar add = function add(a, b) {\n  return a + b;\n};\n\nexports.add = add;\n\nvar minus = function minus(a, b) {\n  return a - b;\n};\n\nexports.minus = minus;","dependents":{}}})
    