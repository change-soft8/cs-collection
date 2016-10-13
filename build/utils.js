'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _immutable = require('immutable');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 处理数据工具方法
 */
var Utils = function () {
    function Utils() {
        _classCallCheck(this, Utils);
    }

    _createClass(Utils, null, [{
        key: 'pushPollFuns',


        /**
         * [pushPollFuns 向轮巡回调数组，放入轮巡函数] todo 接收对象，时间倍数
         * @param  {[type]} obj [需要轮巡的函数，结构 function 或 {func: ()=> {}, delay: 10}]
         * @return {[type]}      [description]
         */


        // 轮巡回调函数数组
        value: function pushPollFuns(obj) {
            // 设置func 值
            var func = obj;
            // 如果obj 为对象类型
            if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object') {
                // 获取对象 func 属性
                func = obj.func;
            }
            // 当为函数类型
            if (typeof func === 'function') {
                // 向数组放置，需轮巡的函数 或对象
                Utils.pollFuns.push(obj);
            }
        }

        // 返回页面对象key


        // 对系统进行轮巡

    }, {
        key: 'getKey',


        /**
         * 返回一个唯一的key <React key={Utils.getKey('react')} />
         * @param  { 唯一key前缀 }
         * @return {[react_1 字符串作为唯一key]}
         */
        value: function getKey(prefix) {
            // 构建前缀字符串
            var p = (prefix || 'key') + '_';
            // 全局key 自增1
            Utils.key = Utils.key + 1;
            // 返回唯一key
            return p + Utils.key;
        }

        /**
         * [uuid 生成uuid字符串]
         * @return {[type]} [description]
         */

    }, {
        key: 'uuid',
        value: function uuid() {
            // 返回uuid字符串
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0,
                    v = c == 'x' ? r : r & 0x3 | 0x8;
                return v.toString(16);
            });
        }

        /**
         * 判断是否为空
         * @param  {[type]}  obj 对象
         * @return {Boolean}     [description]
         */

    }, {
        key: 'isEmpty',
        value: function isEmpty(obj) {
            if (!obj) return true;
            if (this.isArray(obj)) {
                return obj.length == 0;
            } else if (this.isObject(obj)) {
                for (var name in obj) {
                    return false;
                }
                return true;
            }
            return false;
        }
    }, {
        key: 'isObject',


        /**
         * 判断是否为对象
         * @param  {[type]}  obj 对象
         * @return {Boolean}     [description]
         */
        value: function isObject(obj) {
            var type = typeof obj === 'undefined' ? 'undefined' : _typeof(obj);
            return type === 'function' || type === 'object' && !!obj;
        }
    }, {
        key: 'isArray',


        /**
         * 判断是否为数组
         * @param  {[type]}  obj 数组
         * @return {Boolean}     [description]
         */
        value: function isArray(obj) {
            return Array.isArray(obj) || toString.call(obj) === '[object Array]';
        }
    }]);

    return Utils;
}();

Utils.pollFuns = [];

Utils.poll = function () {
    // 1秒轮巡
    setInterval(function () {
        // 便利需轮巡的数组
        for (var i in Utils.pollFuns) {
            // 获取需要轮巡的对象
            var obj = Utils.pollFuns[i];
            // 如果该值为函数类型
            if (typeof obj === 'function') {
                // 直接轮巡函数
                obj();
                // 如果为对象类型
            } else {
                // 获得当前延迟秒数
                obj.cur = (obj.cur || obj.delay) - 1;
                // 如果不需要延迟
                if (obj.cur < 1) {
                    // 如果对象 func 为函数类型
                    if (typeof obj.func === 'function') {
                        // 执行轮巡函数
                        obj.func();
                    }
                    // 延迟时间重置
                    obj.cur = obj.delay;
                }
            }
        }
    }, 1000);
}();

Utils.key = 0;
exports.default = Utils;