'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mockUtils = require('./mockUtils');

var _mockUtils2 = _interopRequireDefault(_mockUtils);

var _collectionUtils = require('./collection-utils');

var _collectionUtils2 = _interopRequireDefault(_collectionUtils);

var _immutable = require('immutable');

var _pubsubJs = require('pubsub-js');

var _pubsubJs2 = _interopRequireDefault(_pubsubJs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 持久化数据对象
 */
var Persist = function () {
    function Persist() {
        _classCallCheck(this, Persist);
    }

    _createClass(Persist, null, [{
        key: 'isMockUrl',


        /**
         * [isMockUrl 是否有mockurl]
         * @param  {[type]} colName [集合名称]
         * @param  {[type]} oper    [操作名称]
         * @return {[type]}         [description]
         */


        // 初始化jquery
        value: function isMockUrl(colName, oper) {
            // 获得集合相关配置
            var col = window.collectionConfig[colName];
            // 获得集合操作相关配置
            var op = col && col[oper];
            // 获取集合指定的json文件
            var url = op && op.mockUrl || '';

            return url;
        }

        /**
         * [getStoreParam 获取mock存放字段]
         * @param  {[type]} colName [集合名称]
         * @param  {[type]} oper    [操作名称]
         * @return {[type]}         [description]
         */


        // 是否需要mock数据

    }, {
        key: 'getStoreParam',
        value: function getStoreParam(colName, oper) {
            // 获得集合相关配置
            var col = window.collectionConfig[colName];
            // 获得集合操作相关配置
            var op = col && col[oper];
            // 获得集合操作mock结构数据存放字段
            var sp = op && op.storeParam || 'entity';

            return sp;
        }

        /**
         * [getFields 获取fields配置]
         * @param  {[type]} colName [集合名称]
         * @param  {[type]} oper    [操作名称]
         * @return {[type]}         [description]
         */

    }, {
        key: 'getFields',
        value: function getFields(colName, oper) {
            // 获得集合相关配置
            var col = window.collectionConfig[colName];
            // 获得集合操作相关配置
            var op = col && col[oper];
            // 获取集合fields配置
            var fields = col && col.entity && col.entity.fields;

            return fields;
        }

        /**
         * [mock 根据集合名称、操作、参数，生产mock数据]
         * @param  {[type]} colName [集合名称]
         * @param  {[type]} oper    [操作名称]
         * @param  {[type]} doc     [操作参数]
         * @return {[type]}         [description]
         */

    }, {
        key: 'mock',
        value: function mock(colName, oper, doc) {
            // 获得集合相关配置
            var col = window.collectionConfig[colName];
            // 获得集合操作相关配置
            var op = col && col[oper];
            // 获得集合操作返回值相关配置
            var ret = op && op.return;
            // 获得集合操作mock结构
            var mockStr = op && op.structure || {
                "millis": 32,
                "code": "SUCCESS",
                "message": "操作成功",
                "entity": ''
            };
            // 获得集合操作mock结构数据存放字段
            var sp = Persist.getStoreParam(colName, oper);
            // 获取集合主键
            var key = Persist.getPrimaryKey(colName);
            // 获取集合fields配置
            var mockFields = Persist.getFields(colName, oper);

            // 如果没有return参数、return为null或者return为空对象
            if (!ret || $.isEmptyObject(ret)) {
                // 是否有mockurl
                var url = Persist.isMockUrl(colName, oper);
                // 返回url地址的JSON数据或者默认JSON数据
                return url ? url : window.collectionMock;

                // 只要求返回主键情况
            } else if (ret.hasOwnProperty(key) && Persist.getObjLength(ret) == 1) {
                // 随机生产一个唯一标识
                return _mockUtils2.default.mockUUID(ret, mockStr, sp);
                // 根据return返回数据（有return和fileds一般为查询接口）
            } else if (ret && mockFields) {
                // 生成的对象
                var obj = _mockUtils2.default.createMockContent(ret, mockFields);
                // 赋值
                mockStr[sp] = obj;

                // 返回
                return mockStr;
            }
        }

        /**
         * [getObjectLength 获得对象长度]
         * @param  {[type]} obj [对象]
         * @return {[type]}         [description]
         */

    }, {
        key: 'getObjLength',
        value: function getObjLength(obj) {
            // 对象初始长度为0
            var count = 0;
            // 遍历对象
            for (var i in obj) {
                // 对象长度累加
                count++;
            }
            // 返回对象长度
            return count;
        }

        /**
         * [getUrl 获得集合操作url]
         * @param  {[type]} colName [集合名称]
         * @param  {[type]} oper    [操作名称]
         * @param  {[type]} param   [操作参数]
         * @param  {[type]} type    [url类型]
         * @return {[type]}         [description]
         */

    }, {
        key: 'getUrl',
        value: function getUrl(colName, oper, param, type) {
            // 获得集合相关配置
            var col = window.collectionConfig[colName];
            // 获得集合--操作相关配置
            var op = col && col[oper];
            // 获得结合--操作--url
            return op && op.getUrl(param, type);
        }

        /**
         * [getPrimaryKey 获得集合返回链]
         * @param  {[type]} colName [集合名称]
         * @param  {[type]} oper    [操作名称]
         * @return {[type]}         [description]
         */

    }, {
        key: 'getReturnChain',
        value: function getReturnChain(colName, oper) {
            // 获得集合相关配置
            var col = window.collectionConfig[colName];
            // 获得集合--操作相关配置
            var op = col && col[oper];
            // 获得返回链
            return op && op.returnChain;
        }

        /**
         * [getCacheTimeOut 获得集合过期时间]
         * @param  {[type]} colName [集合名称]
         * @return {[type]}         [description]
         */

    }, {
        key: 'getCacheTimeOut',
        value: function getCacheTimeOut(colName) {
            // 获得集合相关配置
            var col = window.collectionConfig[colName];
            // 获得过期时间
            return col && col.cacheTimeOut;
        }

        /**
         * [getRequestNum 获得集合请求次数]
         * @param  {[type]} colName [集合名称]
         * @return {[type]}         [description]
         */

    }, {
        key: 'getRequestNum',
        value: function getRequestNum(colName) {
            // 获得集合相关配置
            var col = window.collectionConfig[colName];
            // 获得请求次数
            return col && col.requestNum;
        }

        /**
         * [getIsMongoQuery 是否禁用mongodb查询策略]
         * @param  {[type]} colName [集合名称]
         * @return {[type]}         [description]
         */

    }, {
        key: 'getIsMongoQuery',
        value: function getIsMongoQuery(colName) {
            // 获得集合相关配置
            var col = window.collectionConfig[colName];
            // 获得请求次数
            return col.isMongoQuery ? col.isMongoQuery : false;
        }

        /**
         * [getPrimaryKey 获得集合主键]
         * @param  {[type]} colName [集合名称]
         * @return {[type]}         [description]
         */

    }, {
        key: 'getPrimaryKey',
        value: function getPrimaryKey(colName) {
            // 获得集合相关配置
            var col = window.collectionConfig[colName];
            // 获得集合--entity
            var en = col && col.entity;
            // 获得主键
            return en && en.primaryKey;
        }

        /**
         * [getParamValue 获得键值对的值]
         * @param  {[type]} doc [参数对]
         * @param  {[type]} key [所需key]
         * @return {[type]}         [description]
         */

    }, {
        key: 'getParamValue',
        value: function getParamValue(doc, key) {
            // 空则退出
            if (!doc || !key) return false;
            // 获得键值对
            var param = _collectionUtils2.default.getKeyObj(doc, key);

            // 如果不存在则报错退出
            if (!param) {
                console.error('找不到该key值');
                return false;
            }

            // 返回该key值
            return param[key];
        }

        /**
         * [getPrimaryKeyValue 获得主键键值对的值]
         * @param  {[type]} doc [参数对]
         * @return {[type]}         [description]
         */

    }, {
        key: 'getPrimaryKeyValue',
        value: function getPrimaryKeyValue(colName, doc) {
            // 获取主键值
            var val = '';

            if (typeof doc == 'string') {
                val = doc;
            } else {
                // 获取主键
                var key = Persist.getPrimaryKey(colName);
                // 获取参数中的主键值对
                val = Persist.getParamValue(doc, key);
            }

            // 如果没有则报错退出
            if (!val) {
                console.error('找不到主键值');
                return false;
            }

            return val;
        }

        /**
         * [getNowdbData 获取新集合数据]
         * @param  {[type]} colName [集合名称]
         * @param  {[type]} chain [返回链]
         * @param  {[type]} p [集合操作]
         * @param  {[type]} data [插入数据]
         * @param  {[type]} key [主键]
         * @return {[type]}         [description]
         */

    }, {
        key: 'getNowdbData',
        value: function getNowdbData(colName, chain, p, data, key) {
            var newdb = [];
            var sp = Persist.getStoreParam(colName, p);
            var d = data[sp];

            if (chain) {
                var cArr = chain.split('.');
                newdb = data;

                for (var i = 0; i < cArr.length; i++) {
                    newdb = newdb[cArr[i]];
                }
            } else {
                if (d[key]) {
                    newdb = d;
                } else {
                    for (var i in d) {
                        if (d[i] && d[i].length > 0) {
                            newdb = d[i];
                        }
                    }
                }
            }

            if (p == 'findOne' && newdb && newdb.length > 0) {
                newdb = newdb[0];
            }

            return newdb;
        }

        /**
         * [isInsert 判断是否可插入]
         * @param  {[type]} colName [集合名称]
         * @param  {[type]} p [操作名称]
         * @param  {[type]} data [待插入数据]
         * @param  {[type]} key [主键]
         * @return {[type]}         [description]
         */

    }, {
        key: 'isInsert',
        value: function isInsert(colName, p, data, key) {
            var insert = true;
            var db = window.db && window.db[colName] && window.db[colName].items;
            var extend = (0, _immutable.List)();

            if (db && db.size > 0) {
                db.forEach(function (val, i) {
                    if (val[key] == (typeof data == 'string' ? data : data[key])) {
                        insert = false;

                        if (p == 'findOne') {
                            var one = $.extend({}, val, data);
                            extend = db.set(i, one);
                        }
                    }
                });
            }

            if (p == 'findOne') {
                return $.extend({
                    'isInsert': insert
                }, {
                    'extend': extend
                });
            }

            return insert;
        }

        /**
         * [getDataKey 获得集合需要的key值对]
         * [p 操作名称]
         * @return {[type]} [description]
         */

    }, {
        key: 'getDataKey',
        value: function getDataKey(colName, p) {
            // 获得集合配置
            var col = window.collectionConfig[colName];
            if (col && col[p] && col[p].include) {
                // 返回include所需参数
                return [col && col[p] && col[p].include, false];
            } else if (col && col[p] && col[p].exclusive) {
                // 返回exclusive所需参数
                return [col && col[p] && col[p].exclusive, true];
            } else {
                // 返回用户输入参数
                return ['', false];
            }
        }

        /**
         * [getTimeKey 需要进行时间转换的数据]
         * @param  {[type]} colName [集合名称]
         * @param  {[type]} oper [集合操作]
         * @return {[type]} [description]
         */

    }, {
        key: 'getTimeKey',
        value: function getTimeKey(colName, oper) {
            // 获取集合fields配置
            var fs = Persist.getFields(colName, oper);
            var keys = [];

            for (var i in fs) {
                if (_collectionUtils2.default.isObject(fs[i])) {
                    if (fs[i].type === 'time') {
                        keys.push(i);
                    }
                } else if (fs[i] === 'time') {
                    keys.push(i);
                }
            }

            return keys;
        }

        /**
         * [forKeyData 遍历数据key]
         * @param  {[type]} data [数据]
         * @param  {[type]} keys [时间keys]
         * @param  {[type]} fs [key配置]
         * @return {[type]} [description]
         */

    }, {
        key: 'forKeyData',
        value: function forKeyData(data, keys, fs) {
            for (var i in data) {
                if (_collectionUtils2.default.isObject(data[i])) {
                    Persist.forKeyData(data[i], keys, fs);
                } else {
                    for (var j in keys) {
                        if (i === keys[j]) {
                            data[i] = new Date(data[i]).toString(fs[i].format ? fs[i].format : 'yyyy-MM-dd');
                        }
                    }
                }
            }

            return data;
        }

        /**
         * [getTimeData 对数据进行时间转换]
         * @param  {[type]} colName [集合名称]
         * @param  {[type]} oper [集合操作]
         * @param  {[type]} data [数据]
         * @return {[type]} [description]
         */

    }, {
        key: 'getTimeData',
        value: function getTimeData(colName, oper, data) {
            // 获取集合fields配置
            var fs = Persist.getFields(colName, oper);
            // 获取需要进行时间转换的key列表
            var keys = Persist.getTimeKey(colName, oper);

            return Persist.forKeyData(data, keys, fs);
        }

        /**
         * [findOne 查询集合某数据详情]
         * @param  {[type]} colName [集合名称]
         * @param  {[type]} doc     [单条数据]
         * @param  {[type]} query   [解析后数据]
         * @param  {[type]} params  [外部传入url所需参数]
         * @param  {[type]} type [url类型]
         * @return {[type]}         [description]
         */

    }, {
        key: 'findOne',
        value: function findOne(colName, doc, query, params, type) {
            var _this = this;

            // 操作名称
            var p = 'findOne';

            // 如果需要返回mock数据
            if (Persist.isMock) {
                // 生成相关mock数据
                var mock = Persist.mock(colName, p, doc);

                if (typeof mock === 'string') {
                    return $.getJSON(mock, null, function (data) {
                        // 返回相关操作数据
                        Persist.setFindOneData(colName, p, data);
                    });
                } else {
                    // 返回相关操作数据
                    return Persist.setFindOneData(colName, p, mock);
                }
            }

            // 是否禁用mongodb查询策略
            var mongo = Persist.getIsMongoQuery(colName);
            // 获取主键
            var key = Persist.getPrimaryKey(colName);
            // 获取主键值
            var param = Persist.getPrimaryKeyValue(colName, doc);

            if (db && db.size > 0) {
                db.forEach(function (val, i) {
                    if (val[key] == param) {
                        _pubsubJs2.default.publish(_this.pubsubKey, (0, _immutable.Map)(val));
                    }
                });
            }

            if (mongo) {
                var url = '/' + colName + '?query=' + doc;
            } else {
                var url = Persist.getUrl(colName, p, params, type);
            }

            // 执行ajax请求查询某集合数据详情    
            return $.get(url, query, function (data) {
                if (data.code === 'SUCCESS') {
                    data = Persist.getTimeData(colName, p, data);
                    Persist.setFindOneData(colName, p, data);
                }
            });
        }

        /**
         * [setFindOneData 对值进行操作]
         * @param  {[type]} colName [集合名称]
         * @param  {[type]} p     [操作名称]
         * @param  {[type]} data     [数据]
         * @return {[type]} [description]
         */

    }, {
        key: 'setFindOneData',
        value: function setFindOneData(colName, p, data) {
            // 获取返回链
            var chain = Persist.getReturnChain(colName, p);
            // 获取主键
            var key = Persist.getPrimaryKey(colName);

            var newdb = Persist.getNowdbData(colName, chain, p, data, key);

            if (!newdb) {
                console.error(colName + '\u8FD4\u56DE\u94FE' + chain + '\uFF0C\u914D\u7F6E\u6709\u8BEF\uFF01');
                return;
            }

            newdb.cacheTime = new Date().getTime();

            var arr = Persist.isInsert(colName, p, newdb, key);
            var db = window.db && window.db[colName] && window.db[colName].items;
            if (arr.isInsert && db) {
                _collectionUtils2.default.setLocalData(colName, window.db[colName].items.push(newdb));
            }

            if (!arr.isInsert && db) {
                _collectionUtils2.default.setLocalData(colName, arr.extend);
            }

            data.nowItems = (0, _immutable.Map)(newdb);

            return data;
        }

        /**
         * [find 查询数据集合]
         * @param  {[type]} doc     [数据参数]
         * @param  {[type]} query   [解析后的参数]
         * @param  {[type]} params  [外部传入url所需参数]
         * @param  {[type]} type    [url类型]
         * @return {[type]}         [description]
         */

    }, {
        key: 'find',
        value: function find(doc, query, params, type) {
            var _this2 = this;

            // 操作名称
            var p = 'find';

            // 如果需要返回mock数据
            if (Persist.isMock) {
                // 生成相关mock数据
                var mock = Persist.mock(this.colName, p, query);

                if (typeof mock === 'string') {
                    return $.getJSON(mock, null, function (data) {
                        // 返回相关操作数据
                        Persist.setFindData(_this2.colName, p, data);
                    });
                } else {
                    // 返回相关操作数据
                    return Persist.setFindData(this.colName, p, mock);
                }
            }

            var db = window.db && window.db[this.colName] && window.db[this.colName].items;
            var match = _collectionUtils2.default.filterListKey(db, query);

            if (match) {
                _pubsubJs2.default.publish(this.pubsubKey, match);
            }

            // 是否禁用mongodb查询策略
            var mongo = Persist.getIsMongoQuery(this.colName);
            if (mongo) {
                var url = '/' + this.colName + '?query=' + doc;
            } else {
                var url = Persist.getUrl(this.colName, p, params, type);
            }

            // 执行ajax请求查询某集合数据详情
            return $.get(url, query, function (data) {
                if (data.code === 'SUCCESS') {
                    data = Persist.getTimeData(_this2.colName, p, data);
                    Persist.setFindData(_this2.colName, p, data);
                }
            });
        }

        /**
         * [setFindData 对值进行操作]
         * @param  {[type]} colName [集合名称]
         * @param  {[type]} p     [操作名称]
         * @param  {[type]} data     [数据]
         * @return {[type]} [description]
         */

    }, {
        key: 'setFindData',
        value: function setFindData(colName, p, data) {
            // 获取返回链
            var chain = Persist.getReturnChain(colName, p);
            // 获取主键
            var key = Persist.getPrimaryKey(colName);

            var newdb = Persist.getNowdbData(colName, chain, p, data, key);

            window.db[colName].result = data;

            if (!newdb) {
                console.error(colName + '\u8FD4\u56DE\u94FE' + chain + '\uFF0C\u914D\u7F6E\u6709\u8BEF\uFF01');
                return;
            }

            var db = window.db && window.db[colName] && window.db[colName].items;

            if (db && db.size > 0) {
                var nowdb = (0, _immutable.List)();

                for (var n in newdb) {
                    var insert = true;

                    db = nowdb.size > 0 ? nowdb : db;
                    db.forEach(function (val, i) {
                        newdb[n].cacheTime = new Date().getTime();

                        if (val[key] == newdb[n][key]) {
                            insert = false;
                            nowdb = db.set(i, newdb[n]);
                        }
                    });

                    if (insert) {
                        _collectionUtils2.default.setLocalData(colName, window.db[colName].items.push(newdb[n]));
                    } else {
                        _collectionUtils2.default.setLocalData(colName, nowdb);
                    }
                }
            } else {
                if (db) {
                    for (var i in newdb) {
                        newdb[i].cacheTime = new Date().getTime();
                        _collectionUtils2.default.setLocalData(colName, window.db[colName].items.push(newdb[i]));
                    }
                }
            }

            data.nowItems = (0, _immutable.List)(newdb);
            return data;
        }

        /**
         * [insert 向集合插入单条数据]
         * @param  {[type]} colName [集合名称]
         * @param  {[type]} doc [单条数据]
         * @param  {[type]} type [url类型]
         * @return {[type]}         [description]
         */

    }, {
        key: 'insert',
        value: function insert(colName, doc, type) {
            // 操作名称
            var p = "insert";
            // 获取实际所需参数key值
            var arr = Persist.getDataKey(colName, p);
            // 获取接口调用需要的参数值对
            var paramObj = _collectionUtils2.default.getParamObj(doc, arr);

            // 如果需要返回mock数据
            if (Persist.isMock) {
                // 生成相关mock数据
                var mock = Persist.mock(colName, p, doc);

                if (typeof mock === 'string') {
                    return $.getJSON(mock, null, function (data) {
                        // 返回相关操作数据
                        Persist.setInsertData(colName, p, data, paramObj);
                    });
                } else {
                    // 返回相关操作数据
                    return Persist.setInsertData(colName, p, mock, paramObj);
                }
            }

            // 执行ajax请求查询某集合数据详情
            return $.post(Persist.getUrl(colName, p, doc, type), paramObj, function (data) {
                if (data.code === 'SUCCESS') {
                    data = Persist.getTimeData(colName, p, data);
                    Persist.setInsertData(colName, p, data, paramObj);
                }
            });
        }

        /**
         * [setInsertData 对值进行操作]
         * @param  {[type]} colName [集合名称]
         * @param  {[type]} p     [操作名称]
         * @param  {[type]} data     [数据]
         * @param  {[type]} paramObj     [参数]
         * @return {[type]} [description]
         */

    }, {
        key: 'setInsertData',
        value: function setInsertData(colName, p, data, paramObj) {
            // 获取主键
            var key = Persist.getPrimaryKey(colName);

            var sp = Persist.getStoreParam(colName, p);
            var d = data[sp];
            var insert = Persist.isInsert(colName, p, d, key);

            if (insert) {
                var one = $.extend({
                    "cacheTime": new Date().getTime()
                }, paramObj);

                if (typeof d === 'string') {
                    one = $.extend(one, _defineProperty({}, key, d));
                } else {
                    for (var i in d) {
                        one = $.extend(one, _defineProperty({}, i, d[i]));
                    }
                }

                var _db = window.db && window.db[colName] && window.db[colName].items;
                if (_db) {
                    window.db[colName].items = window.db[colName].items.push(one);
                    window.localStorage.setItem('db', JSON.stringify(window.db));
                }

                data.nowItems = (0, _immutable.Map)(one);
                return data;
            } else {
                console.error('已存在此数据，不能重复新建！');
            }
        }

        /**
         * [update 更新集合中单条数据]
         * @param  {[type]} colName [集合名称]
         * @param  {[type]} doc [单条数据]
         * @param  {[type]} type [url类型]
         * @return {[type]}         [description]
         */

    }, {
        key: 'update',
        value: function update(colName, doc, type) {
            var p = 'update';

            // 如果需要返回mock数据
            if (Persist.isMock) {
                // 生成相关mock数据
                var mock = Persist.mock(colName, p, doc);

                if (typeof mock === 'string') {
                    return $.getJSON(mock, null, function (data) {
                        // 返回相关操作数据
                        Persist.setUpdateData(colName, p, data, doc);
                    });
                } else {
                    // 返回相关操作数据
                    return Persist.setUpdateData(colName, p, mock, doc);
                }
            }

            // 获取实际所需参数key值
            var arr = Persist.getDataKey(colName, p);
            // 获取接口调用需要的参数值对
            var paramObj = _collectionUtils2.default.getParamObj(doc, arr);
            // 获取主键值
            var param = Persist.getPrimaryKeyValue(colName, doc);
            // 执行ajax请求查询某集合数据详情
            return $.put(Persist.getUrl(colName, p, doc, type), paramObj, function (data) {
                if (data.code === 'SUCCESS') {
                    data = Persist.getTimeData(colName, p, data);
                    Persist.setUpdateData(colName, p, data, doc);
                }
            });
        }

        /**
         * [setUpdateData 对值进行操作]
         * @param  {[type]} colName [集合名称]
         * @param  {[type]} p     [操作名称]
         * @param  {[type]} data     [数据]
         * @param  {[type]} doc     [传入参数]
         * @return {[type]} [description]
         */

    }, {
        key: 'setUpdateData',
        value: function setUpdateData(colName, p, data, doc) {
            // 获取主键
            var key = Persist.getPrimaryKey(colName);

            var sp = Persist.getStoreParam(colName, p);
            var d = data[sp];

            if (d && d.length > 0) {
                data.nowItems = (0, _immutable.Map)(_collectionUtils2.default.updateData(colName, d, key));
                return data;
            } else {
                data.nowItems = (0, _immutable.Map)(_collectionUtils2.default.updateData(colName, doc, key));
                return data;
            }
        }

        /**
         * [remove 向集合删除单条信息]
         * @param  {[type]} colName [集合名称]
         * @param  {[type]} doc [单条数据 或 数据编号]
         * @param  {[type]} type [url类型]
         * @return {[type]}         [description]
         */

    }, {
        key: 'remove',
        value: function remove(colName, doc, type) {
            var p = 'remove';
            // 获取主键
            var key = Persist.getPrimaryKey(colName);
            // 获取主键值
            var param = Persist.getPrimaryKeyValue(colName, doc);

            // 如果需要返回mock数据
            if (Persist.isMock) {
                // 生成相关mock数据
                var mock = Persist.mock(colName, p, doc);

                if (typeof mock === 'string') {
                    return $.getJSON(mock, null, function (data) {
                        // 返回相关操作数据
                        data.nowItems = (0, _immutable.Map)(_collectionUtils2.default.removeData(colName, param, key));
                    });
                } else {
                    // 返回相关操作数据
                    mock.nowItems = (0, _immutable.Map)(_collectionUtils2.default.removeData(colName, param, key));
                    return mock;
                }
            }

            // 执行ajax请求查询某集合数据详情
            return $.delete(Persist.getUrl(colName, p, doc, type), doc, function (data) {
                if (data.code === 'SUCCESS') {
                    data = Persist.getTimeData(colName, p, data);
                    data.nowItems = (0, _immutable.Map)(_collectionUtils2.default.removeData(colName, param, key));
                }
            });
        }
    }]);

    return Persist;
}();

Persist.initJquery = function () {
    // ajax全局配置选项设置
    $.ajaxSetup({
        cache: false
    });

    // 发送ajax拦截方法
    $(document).ajaxSend(function (evt, request, settings) {});

    // ajax请求成功, 拦截后台操作错误的提示消息
    $(document).ajaxSuccess(function (event, xhr, settings) {});

    // ajax请求失败, 提示网络请求错误消息
    $(document).ajaxError(function (event, xhr, settings, exception) {});

    // 扩展jquery ajax支持put delete方法.
    jQuery.each(["put", "delete"], function (i, method) {

        jQuery[method] = function (url, data, callback, type) {
            // shift arguments if data argument was omitted
            if (jQuery.isFunction(data)) {
                type = type || callback || 'json';
                callback = data;
                data = undefined;
            }

            return jQuery.ajax({
                url: url,
                type: method,
                dataType: type,
                data: data,
                success: callback
            });
        };
    });
}();

Persist.isMock = function () {
    // 初始化非mock数据
    var isMock = false;
    // 获得当前 浏览器url
    var href = location.href;

    // 如果url包含mock
    if (href.includes('mock')) {
        // 需要mock数据
        isMock = true;
    }

    return isMock;
}();

exports.default = Persist;