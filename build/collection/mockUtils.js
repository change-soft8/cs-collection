'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _collectionUtils = require('./collection-utils');

var _collectionUtils2 = _interopRequireDefault(_collectionUtils);

var _mockConf = require('../config/mock.conf.js');

var _mockConf2 = _interopRequireDefault(_mockConf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MockUtils = function () {
    function MockUtils() {
        _classCallCheck(this, MockUtils);
    }

    _createClass(MockUtils, null, [{
        key: 'getKeyItems',


        /**
         * [getKeyItems 获得对象key]
         * @param  {[type]} obj [对象]
         * @return {[type]}         [description]
         */

        // 三级mock数据，非常长


        // mock数据 长度级别
        // 一级mock数据，较正常
        value: function getKeyItems(obj) {
            // 初始对象key数组
            var tmpArr = [];
            // 遍历对象
            for (var i in obj) {
                // 把key值赋值给key数组
                tmpArr.push(i);
            }
            // 返回key数组
            return tmpArr;
        }

        /**
         * [mockUUID 随机生成一个指定长度的UUID]
         * @param  {[type]} obj [操作返回对象]
         * @param  {[type]} mockStr [mock数据结构]
         * @param  {[type]} sp [存放数据字段]
         * @return {[type]}   [description]
         */

        // mock数据长度级别

        // 二级mock数据，较长

    }, {
        key: 'mockUUID',
        value: function mockUUID(obj, mockStr, sp) {
            if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object') {
                // 获取需要uuid的主键
                var key = MockUtils.getKeyItems(obj)[0];
                // 获取主键长度
                var len = obj[key].length || 32;
                // 随机数（默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1）
                var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
                // 赋值给主键
                obj[key] = MockUtils.getRandomString(len, $chars);
                // 赋值
                mockStr[sp] = obj;
                // 返回
                return mockStr;
            }
        }

        /**
         * [createMockContent 生成mock数据]
         * @param  {[type]} ret [操作返回对象]
         * @return {[type]}   [description]
         */

    }, {
        key: 'createMockContent',
        value: function createMockContent(ret, fields) {
            // 赋值操作返回对象
            var obj = JSON.parse(JSON.stringify(ret));
            // 如果返回配置是对象
            if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object') {
                // 长度级别数组
                var levelArr = _mockConf2.default[MockUtils.mockLevel] || _mockConf2.default[MockUtils.level_1];

                MockUtils.getMockData(obj, levelArr, fields);

                return obj;
            }
        }

        /**
         * [getMockData 遍历生产mock]
         * @param  {[type]} obj [数据]
         * @param  {[type]} levelArr [长度]
         * @param  {[type]} fields [key配置]
         * @return {[type]} [description]
         */

    }, {
        key: 'getMockData',
        value: function getMockData(obj, levelArr, fields) {
            // 获取操作返回key数组
            var attrArr = MockUtils.getKeyItems(obj);

            attrArr.forEach(function (key, i) {
                // 如果字段是数组
                if ($.isArray(obj[key])) {
                    // 返回数组
                    var valArr = [];
                    // 数组随机长度
                    var len = MockUtils.getRandomlength(levelArr.array);

                    if (_typeof(obj[key][0]) !== 'object') {
                        // 遍历
                        for (var n = 0; n < len; n++) {
                            // 返回数组赋值
                            valArr.push(MockUtils.getItemValue(obj[key][0], levelArr));
                        }
                    } else {
                        for (var m = 0; m < len; m++) {
                            var arr = JSON.parse(JSON.stringify(MockUtils.getMockData(obj[key][0], levelArr, fields)));
                            valArr[m] = arr;
                        }

                        // 赋值给字段
                        obj[key] = valArr;
                    }
                } else {
                    // 其他情况字段赋值
                    obj[key] = MockUtils.getItemValue(fields[key], levelArr);
                }
            });

            return obj;
        }

        /**
         * [getItemValue 根据类型返回相应值]
         * @param {[type]} type [类型]
         * @param {[type]} levelArr [长度级别数组]
         */

    }, {
        key: 'getItemValue',
        value: function getItemValue(type, levelArr) {
            // 返回变量
            var value = '';

            if (type === 'string') {
                // 国际化
                var i18n = window.collectionI18n;
                // 获取随机长度字符串
                value = MockUtils.getSpecialItem(i18n, levelArr[i18n]);
            } else if (type === 'int') {
                // 随机长度数字
                value = MockUtils.getSpecialItem('int', levelArr['int']);
            } else if (type === 'money') {
                // 随机长度整数
                var integer = MockUtils.getSpecialItem('int', levelArr['int']);
                // 浮点数，两小数位
                value = parseFloat(integer / 100).toFixed(2);
            } else if (type === 'time') {
                // 时间戳
                value = new Date().toString('yyyy-MM-dd');
            } else if (_collectionUtils2.default.isObject(type) && !$.isArray(type)) {
                // 时间戳
                if (type.type === 'time') {
                    value = new Date().toString(type.format);
                }
            } else if ($.isArray(type)) {
                var k = Math.floor(Math.random() * type.length);
                value = type[k];
            }

            return value;
        }

        /**
         * [getRandomlength 根据数组返回随机的长度]
         * @param {[type]} level [级别数组]
         */

    }, {
        key: 'getRandomlength',
        value: function getRandomlength(level) {
            // 判断有级别
            if (level && level.length == 2) {
                // 范围
                var range = level[1] - level[0] + 1;
                // 随机数
                var rand = Math.random();
                // 返回级别范围内的长度
                return level[0] + Math.round(rand * range);
            }
        }

        /**
         * [getRandomString 随机生成一个指定长度的字符串]
         * @param  {[type]} obj [操作返回对象]
         * @return {[type]}   [description]
         */

    }, {
        key: 'getRandomString',
        value: function getRandomString(len, chars) {
            // 随机数长度
            var maxPos = chars.length;

            // 字符串
            var str = '';
            for (var i = 0; i < len; i++) {
                // 产生随机数　
                str += chars.charAt(Math.floor(Math.random() * maxPos));
            }

            // 返回随机生成的字符串
            return str;
        }

        /**
         * [getSpecialItem 根据类型和长度返回数据]
         * @param  {[String]} type [类型]
         * @param  {[int]} level [长度]
         * @return {[type]}   [description]
         */

    }, {
        key: 'getSpecialItem',
        value: function getSpecialItem(type, level) {
            if (type && level) {
                if (type == 'int') {
                    // 获取此类型随机长度
                    var len = MockUtils.getRandomlength(level);
                    // 随机数
                    var $ints = '0123456789';
                    // 返回随机字符串
                    return parseInt(MockUtils.getRandomString(len, $ints));
                } else if (type == 'en') {
                    // 初始返回字符串
                    var str = '';
                    // 获取此类型随机长度
                    var _len = MockUtils.getRandomlength(level);
                    // 随机数（默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1）
                    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
                    // 返回随机字符串
                    return MockUtils.getRandomString(_len, $chars);
                } else if (type == 'zh') {
                    // 编码区间数组
                    var arr = new Array();
                    // 获取此类型随机长度
                    var length = MockUtils.getRandomlength(level);
                    // 遍历
                    for (var i = 0; i < length; i++) {
                        // 元素赋值为汉字对应编码区间值
                        arr[i] = Math.round(Math.random() * 20927) + 19968;
                    }

                    // 汉字数组
                    var arr1 = new Array();
                    // 遍历
                    for (var i in arr) {
                        // 元素赋值编码区间对应的汉字
                        arr1.push(String.fromCodePoint(arr[i]));
                    }
                    // 返回长度级别内的汉字
                    return arr1.join("");
                }
            }
        }
    }]);

    return MockUtils;
}();

MockUtils.level_1 = 'level_1';
MockUtils.level_2 = 'level_2';
MockUtils.level_3 = 'level_3';

MockUtils.mockLevel = function () {
    // 获得当前浏览器url
    var href = location.href;

    // 如果url包含mock
    if (href.includes('mock')) {
        // mock级别开始索引
        var start = href.indexOf('mock') + 5;
        // mock级别结束索引
        var end = href.indexOf('&', start);
        // 如果结束索引无效，则为url长度
        if (end < 0) {
            // 设置为url长度
            end = href.length;
        }
        // 返回mock级别，如无规定，则返回级别一
        return href.substring(start, end) || MockUtils.level_1;
    }
}();

exports.default = MockUtils;