'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _immutable = require('immutable');

var _utils = require('../utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 处理数据工具方法
 */
var CollectionUtils = function (_Utils) {
    _inherits(CollectionUtils, _Utils);

    function CollectionUtils() {
        _classCallCheck(this, CollectionUtils);

        return _possibleConstructorReturn(this, (CollectionUtils.__proto__ || Object.getPrototypeOf(CollectionUtils)).apply(this, arguments));
    }

    _createClass(CollectionUtils, null, [{
        key: 'getList',


        /**
         * 返回一个List 对象
         * @param  {初始化数组值}
         * @return {[List对象]}
         */
        value: function getList(array) {
            // 如果参数为数组类型
            if (Array.isArray(array)) {
                // 返回有初始值的List
                return (0, _immutable.List)(array);
            }
            // 返回空值List
            return _immutable.List.of();
        }

        /**
         * 检查对象是否为Map类型
         * @param  {[doc]}
         * @return {Boolean}
         */

    }, {
        key: 'isMap',
        value: function isMap(doc) {
            return _immutable.Map.isMap(doc);
        }

        /**
         * 检查对象是否为List类型
         * @param  {[doc]}
         * @return {Boolean}
         */

    }, {
        key: 'isList',
        value: function isList(doc) {
            return _immutable.List.isList(doc);
        }

        /**
         * [getParamObj 获取调用接口所需参数]
         * @param  {[doc]}
         * @param  {[arr]}
         * @return {普通对象}
         */

    }, {
        key: 'getParamObj',
        value: function getParamObj(doc, arr) {
            var paramObj = {};

            if ((typeof doc === 'undefined' ? 'undefined' : _typeof(doc)) == "object") {
                if (!arr[1]) {
                    if (arr[0]) {
                        paramObj = CollectionUtils.getKeyObj(doc, arr[0]);
                    } else {
                        paramObj = doc;
                    }
                } else {
                    paramObj = CollectionUtils.withoutKeyObj(doc, arr[0]);
                }
            } else if (typeof doc == "string") {
                paramObj = doc;
            } else {
                return false;
            }

            if (!paramObj || $.isEmptyObject(paramObj)) {
                console.error('参数为空');
                return false;
            }

            return paramObj;
        }

        /**
         * [setLocalData 更新数据]
         * @param  {[type]} colName [集合名称]
         * @param  {[type]} data [插入数据]
         * @return {[type]}         [description]
         */

    }, {
        key: 'setLocalData',
        value: function setLocalData(colName, data) {
            window.db[colName].items = data;
            window.localStorage.setItem('db', JSON.stringify(window.db));
        }

        /**
         * [updateData 更新操作后更新数据]
         * @param  {[data]}
         * @return {普通对象}
         */

    }, {
        key: 'updateData',
        value: function updateData(colName, data, key) {
            var db = window.db && window.db[colName].items;

            if (db && db.size > 0) {
                var _ret = function () {
                    var nowdb = (0, _immutable.List)();
                    var update = (0, _immutable.List)();

                    db.forEach(function (val, i) {
                        if (val[key] == data[key]) {
                            var n;

                            (function () {
                                var oldobj = (0, _immutable.Map)(val);

                                for (n in data) {
                                    oldobj.map(function (v, j) {
                                        if (j == n) {
                                            update = oldobj.set(n, data[n]);
                                        }
                                    });
                                }

                                var newobj = update.toObject();
                                newobj.cacheTime = new Date().getTime();
                                nowdb = db.set(i, newobj);
                            })();
                        }
                    });

                    if (nowdb && nowdb.size > 0) {
                        CollectionUtils.setLocalData(colName, nowdb);
                    } else {
                        console.error('更改的数据不存在！');
                    }

                    return {
                        v: update.toObject()
                    };
                }();

                if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
            } else {
                console.error('更改的数据不存在！');
            }
        }

        /**
         * [removeData 更新操作后更新数据]
         * @param  {[data]}
         * @return {普通对象}
         */

    }, {
        key: 'removeData',
        value: function removeData(colName, data, key) {
            var db = window.db && window.db[colName].items;

            if (db && db.size > 0) {
                var nowdb = (0, _immutable.List)();
                var remove = false;
                var res = void 0;

                db.forEach(function (val, i) {
                    if (val[key] == data) {
                        remove = true;
                        nowdb = db.remove(i);
                        res = val;
                    }
                });

                if (remove) {
                    CollectionUtils.setLocalData(colName, nowdb);
                } else {
                    console.error('删除的数据不存在！');
                }

                return res;
            } else {
                console.error('删除的数据不存在！');
            }
        }

        /**
         * 获取对象数据
         * @param  {immutable对象||普通对象||普通数组} list 集合名称
         * @param  {字符串||普通数组} key  关键词
         * @return {普通对象}      
         */

    }, {
        key: 'getKeyObj',
        value: function getKeyObj(list, key) {

            if (!list || CollectionUtils.isEmpty(list) || !key) return;
            var obj = {};
            var keyAry = [];
            if (key.constructor == String) {
                keyAry.push(key);
            } else if (key.constructor == Array) {
                keyAry = key;
            }

            for (var i = 0; i < keyAry.length; i++) {
                var nowKey = keyAry[i];
                if (_immutable.Map.isMap(list)) {
                    if (list.get(nowKey) != undefined) obj[nowKey] = list.get(nowKey);
                } else if (list.constructor == Object) {
                    if (list[nowKey] != undefined) obj[nowKey] = list[nowKey];
                } else if (list.constructor == Array) {
                    if (list[0][nowKey] != undefined) obj[nowKey] = list[0][nowKey];
                }
            };

            return obj;
        }

        /**
         * 获取对象列表数据
         * @param  {普通数组} list 总列表数据
         * @param  {字符串，普通数组} key  关键词
         * @return {普通数组}      
         */

    }, {
        key: 'getListKeyObj',
        value: function getListKeyObj(list, key) {
            if (!list || !key) return;
            var listObj = [];
            for (var i = 0; i < list.length; i++) {
                var newObj = this.getKeyObj(list[i], key);
                if (!CollectionUtils.isEmpty(newObj)) listObj.push(newObj);
            };
            return listObj;
        }

        /**
         * 筛选符合查询条件的数组
         * @param  {immutable数组||普通数组} list  被筛选数组
         * @param  {普通对象} query 筛选对象
         * @return {普通数组}       筛选出的数组
         */

    }, {
        key: 'filterListKey',
        value: function filterListKey(list, query) {

            if (!list || CollectionUtils.isEmpty(list) || !query) return;
            var result;
            if (_immutable.List.isList(list)) {
                return this.filterMapListKey(list, query);
            } else if (list.constructor == Array) {
                return this.filterMapListKey((0, _immutable.List)(list), query);
            }
        }

        /**
         * 筛选符合查询条件的immutable数组
         * @param  {immutable数组} list  被筛选数组
         * @param  {普通对象} query 筛选对象
         * @return {普通数组}       筛选出的数组
         */

    }, {
        key: 'filterMapListKey',
        value: function filterMapListKey(list, query) {

            if (!list || !query || !_immutable.List.isList(list)) return;

            var mapQuery = (0, _immutable.Map)(query);
            var mapData = list.filter(function (obj) {
                var testHaskey = true;
                mapQuery.map(function (val, k) {
                    if (val != (0, _immutable.Map)(obj).get(k)) {
                        testHaskey = false;
                    }
                });
                return testHaskey;
            });
            return mapData;
        }

        /**
         * 排除key值的对象数据
         * @param  {immutable对象||普通对象} list 集合名称
         * @param  {字符串||普通数组} key  关键词
         * @return {普通对象}      
         */

    }, {
        key: 'withoutKeyObj',
        value: function withoutKeyObj(list, key) {

            if (!list || CollectionUtils.isEmpty(list) || !key) return;
            var obj;
            if (_immutable.Map.isMap(list)) {
                obj = this.withoutMapKeyObj(list, key);
            } else if (list.constructor == Object) {
                var newList = (0, _immutable.Map)(list);
                obj = this.withoutMapKeyObj(newList, key);
            } else if (list.constructor == Array) {
                obj = [];
                for (var i = 0; i < list.length; i++) {
                    var rObj = this.withoutMapKeyObj((0, _immutable.Map)(list[i]), key);
                    obj.push(rObj);
                };
            }

            return obj;
        }

        /**
         * 排除key值的immutable数组
         * @param  {immutable对象} list 集合名称
         * @param  {字符串||普通数组} key  关键词
         * @return {普通对象}      
         */

    }, {
        key: 'withoutMapKeyObj',
        value: function withoutMapKeyObj(list, key) {

            if (!list || !key || !_immutable.Map.isMap(list)) return;
            var newList;
            if (key.constructor == String) {
                newList = list.filterNot(function (val, k) {
                    return key == k;
                });
            } else if (key.constructor == Array) {
                var newKey = (0, _immutable.List)(key);
                newList = list.filterNot(function (val, k) {
                    return newKey.includes(k);
                });
            }

            return newList.toObject();
        }
    }]);

    return CollectionUtils;
}(_utils2.default);

exports.default = CollectionUtils;