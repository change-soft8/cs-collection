"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Query 查询器
 */
var Query = function () {
  function Query() {
    _classCallCheck(this, Query);
  }

  _createClass(Query, null, [{
    key: "$in",


    /**
     * [$in 查询器 查询条件 解析]
     * @param         {[type]}                 array [查询数组]
     * @return        {[type]}                       [查询字符串]
     */
    value: function $in(array) {
      return !Array.isArray(array) ? false : array.toString();
    }
  }]);

  return Query;
}();

exports.default = Query;