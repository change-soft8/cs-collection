'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _collection = require('./collection/collection');

var _collection2 = _interopRequireDefault(_collection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Localstorage = function () {

    /**
     * [constructor 数据存储构造函数]
     * @param  {[type]} colName [集合名称]
     * @param  {[type]} list    [初始化列表数据]
     * @return {[type]}         [description]
     */
    function Localstorage(config, i18n, mock) {
        _classCallCheck(this, Localstorage);

        // 传入配置有误情况
        if (!config || (typeof config === 'undefined' ? 'undefined' : _typeof(config)) != 'object') {
            console.error('没有配置或者配置错误');
            return;
        }

        // 设置配置
        window.collectionConfig = config;
        // 设置集合国际化
        window.collectionI18n = i18n || 'en';
        // 设置默认JSON
        if (typeof mock == 'string') {
            window.collectionMock = JSON.parse(mock);
        } else {
            window.collectionMock = mock || { 'millis': 34, 'code': 'SUCCESS', 'message': '操作成功', 'entity': '' };
        }

        var oldurl = window.localStorage.getItem('oldUrl') || '';
        var isClear = false;

        if (oldurl.includes('mock') != location.href.includes('mock')) {
            isClear = true;
            window.localStorage.setItem('oldUrl', location.href);
        }

        if (isClear) {
            window.localStorage.setItem('db', '{}');
        }

        window.db = {};
        var olddb = window.localStorage.getItem('db') || '{}';
        olddb = JSON.parse(olddb);

        for (var i in config) {
            var match = false;
            for (var k in olddb) {
                if (k === i) {
                    match = true;
                }
            }

            var list = [];
            if (match) {
                list = olddb[i].items;
            }
            window.db[i] = new _collection2.default(i, list);
        }
    }

    /**
     * [setCollectionI18n 设置集合国际化]
     * @param  {[type]} i18n [国际化]
     * @return {[type]}         [description]
     */


    _createClass(Localstorage, [{
        key: 'setCollectionI18n',
        value: function setCollectionI18n(i18n) {
            // 设置集合国际化
            window.collectionI18n = i18n || 'en';
        }
    }]);

    return Localstorage;
}();

exports.default = Localstorage;