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

        // 是否需要mock数据

    }, {
        key: 'getStoreParam',


        /**
         * [getStoreParam 获取mock存放字段]
         * @param  {[type]} colName [集合名称]
         * @param  {[type]} oper    [操作名称]
         * @return {[type]}         [description]
         */
        value: function getStoreParam(colName, oper) {
            // 获得集合相关配置
            var col = window.collectionConfig[colName];
            // 获得集合操作相关配置
            var op = col && col[oper];
            // 获得集合操作mock结构数据存放字段
            var sp = op && op.storeParam || 'entity';

            return sp;
        }
    }, {
        key: 'mock',


        /**
         * [mock 根据集合名称、操作、参数，生产mock数据]
         * @param  {[type]} colName [集合名称]
         * @param  {[type]} oper    [操作名称]
         * @param  {[type]} doc     [操作参数]
         * @return {[type]}         [description]
         */
        value: function mock(colName, oper, doc) {
            // 获得集合相关配置
            var col = window.collectionConfig[colName];
            // 获得集合操作相关配置
            var op = col && col[oper];
            // 获得集合操作返回值相关配置
            var ret = op && op.return;
            // 获取集合fields配置
            var mockFields = col && col.entity && col.entity.fields;
            // 获得集合操作mock结构
            var mockStr = op && op.structure || { "millis": 32, "code": "SUCCESS", "message": "操作成功", "entity": '' };
            // 获得集合操作mock结构数据存放字段
            var sp = Persist.getStoreParam(colName, oper);
            // 获取集合主键
            var key = Persist.getPrimaryKey(colName);

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
         * @return {[type]}         [description]
         */

    }, {
        key: 'getUrl',
        value: function getUrl(colName, oper, param) {
            // 获得集合相关配置
            var col = window.collectionConfig[colName];
            // 获得集合--操作相关配置
            var op = col && col[oper];
            // 获得结合--操作--url
            return op && op.getUrl(param);
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
         * @param  {[type]} oper    [操作名称]
         * @return {[type]}         [description]
         */

    }, {
        key: 'getCacheTimeOut',
        value: function getCacheTimeOut(colName) {
            // 获得集合相关配置
            var col = window.collectionConfig[colName];
            // 获得集合--entity
            var en = col && col.entity;
            // 获得过期时间
            return en && en.cacheTimeOut;
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
                    if (val[key] == data[key]) {
                        insert = false;

                        if (p == 'findOne') {
                            var one = $.extend({}, val, data);
                            extend = db.set(i, one);
                        }
                    }
                });
            }

            if (p == 'findOne') {
                return $.extend({ 'isInsert': insert }, { 'extend': extend });
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
         * [findOne 查询集合某数据详情]
         * @param  {[type]} colName [集合名称]
         * @param  {[type]} doc     [单条数据]
         * @return {[type]}         [description]
         */

    }, {
        key: 'findOne',
        value: function findOne(colName, doc) {
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

            // 获取主键值
            var param = Persist.getPrimaryKeyValue(colName, doc);
            // 执行ajax请求查询某集合数据详情    
            return $.get(Persist.getUrl(colName, 'findOne', param), null, function (data) {
                if (data.code === 'SUCCESS') {
                    Persist.setFindOneData(colName, p, data);
                }
            });

            // 模拟数据
            /*let data = { "millis": 32, "code": "SUCCESS", "message": "操作成功", "entity": { "serviceResultCode": null, "accessToken": null, "allProjectNum": null, "joinNum": 1, "closeNum": 0, "projectInfoList": [{ "projectId": "8c8c8ca956e00caa0156e8be040400dd", "projectName": "来，跟我一起说：耶~", "projectManager": "沈佳芳2233", "projectManagerIcon": "https://file.newtouch.com/yangyang/131d4e16-6509-47d0-a46b-21c39480b89d.png", "projectStatus": "14001", "projectImportanceLevel": "41001", "projectIcon": "https://file.newtouch.com/yangyang/item_logo_4.png", "projectTagList": [], "members": 1, "projectManagerLoginName": "shenjiafang", "projectNameSpace": "sjzmdqkk", "projectNameForShirt": "sjzmd", "projectCode": "wyqkk", "commonFlag": "16001" }], "closeProjectInfoList": [], "commonProjectInfoList": null, "regularProjectInfoList": null } };
            if (data.code === 'SUCCESS') {
                return Persist.setFindOneData(colName, p, data);
            }*/
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

            var newArr = new Array(newdb);
            data.nowItems = (0, _immutable.List)(newArr);

            return data;
        }

        /**
         * [find 查询数据集合]
         * @param  {[type]} colName [集合名称]
         * @param  {[type]} doc     [数据参数]
         * @return {[type]}         [description]
         */

    }, {
        key: 'find',
        value: function find(colName, doc, colEntity) {
            // 操作名称
            var p = 'find';

            // 如果需要返回mock数据
            if (Persist.isMock) {
                // 生成相关mock数据
                var mock = Persist.mock(colName, p, doc);

                if (typeof mock === 'string') {
                    return $.getJSON(mock, null, function (data) {
                        // 返回相关操作数据
                        Persist.setFindData(colName, p, data);
                    });
                } else {
                    // 返回相关操作数据
                    return Persist.setFindData(colName, p, mock);
                }
            }

            // 有缓存数据 && 缓存没有过期
            /*if (window.collectionConfig[colName][p]["fulldata"] && new Date().getTime() <= (colEntity.timeout || 0)) {
                // 获取缓存数据
                return new Promise((resolve, reject) => {
                    resolve(Utils.filterListKey(colEntity.items, doc));
                });
            }*/

            // 执行ajax请求查询某集合数据详情
            return $.get(Persist.getUrl(colName, p, doc), doc, function (data) {
                if (data.code === 'SUCCESS') {
                    Persist.setFindData(colName, p, data);
                }
                // }).then((res) => {
                //             // 设置过期时间
                //             if (window.collectionConfig[colName][p]["fulldata"]) {
                //                 res.timeout = new Date().getTime() + window.collectionConfig[colName][p]["validate"];
                //             }
            });

            // 模拟数据
            /*let data = { "millis": 40, "code": "SUCCESS", "message": "操作成功", "entity": { "serviceResultCode": null, "accessToken": null, "allProjectNum": null, "joinNum": 3, "closeNum": 0, "projectInfoList": [{ "projectId": "8c8c8ca9543dbb2901544b98df3d0963", "projectName": "莫道芳时易度，朝暮1", "projectManager": "沈佳芳", "projectManagerIcon": "https://file.newtouch.com/yangyang/131d4e16-6509-47d0-a46b-21c39480b89d.png", "projectStatus": "14001", "projectImportanceLevel": "41001", "projectIcon": "https://file.newtouch.com/yangyang/item_logo_4.png", "projectTagList": [], "members": 1, "projectManagerLoginName": "shenjiafang", "projectNameSpace": "test0425G30", "projectNameForShirt": "test", "projectCode": "test", "commonFlag": "16001" }, { "projectId": "8c8c8ca95429546201542d0888bc028d", "projectName": "何处几叶萧萧雨1", "projectManager": "沈佳芳", "projectManagerIcon": "https://file.newtouch.com/yangyang/131d4e16-6509-47d0-a46b-21c39480b89d.png", "projectStatus": "14001", "projectImportanceLevel": "41001", "projectIcon": "https://file.newtouch.com/yangyang/item_logo_4.png", "projectTagList": [], "members": 1, "projectManagerLoginName": "shenjiafang", "projectNameSpace": "123456jpg", "projectNameForShirt": "12", "projectCode": "123", "commonFlag": "16001" }], "closeProjectInfoList": [], "commonProjectInfoList": null, "regularProjectInfoList": null } };
            if (data.code === 'SUCCESS') {
                return Persist.setFindData(colName, p, data);
            }*/
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
         * @return {[type]}         [description]
         */

    }, {
        key: 'insert',
        value: function insert(colName, doc) {
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
            return $.post(Persist.getUrl(colName, p, doc), paramObj, function (data) {
                if (data.code === 'SUCCESS') {
                    Persist.setInsertData(colName, p, data, paramObj);
                }
            });

            // 模拟数据
            /*let data = { "millis": 154, "code": "SUCCESS", "message": "操作成功", "entity": { "serviceResultCode": null, "accessToken": null, "projectId": "8c8c8ca956e00caa0156e8be040400dc" } };
            if (data.code === 'SUCCESS') {
                return Persist.setInsertData(colName, p, data, paramObj);
            }*/
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
                var one = $.extend({ "cacheTime": new Date().getTime() }, paramObj, _defineProperty({}, key, d[key]));

                var db = window.db && window.db[colName] && window.db[colName].items;
                if (db) {
                    window.db[colName].items = window.db[colName].items.push(one);
                    window.localStorage.setItem('db', JSON.stringify(window.db));
                }

                var newArr = new Array(one);
                data.nowItems = (0, _immutable.List)(newArr);
                return data;
            } else {
                console.error('已存在此数据，不能重复新建！');
            }
        }

        /**
         * [update 更新集合中单条数据]
         * @param  {[type]} colName [集合名称]
         * @param  {[type]} doc [单条数据]
         * @return {[type]}         [description]
         */

    }, {
        key: 'update',
        value: function update(colName, doc) {
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
            return $.put(Persist.getUrl(colName, p, param), paramObj, function (data) {
                if (data.code === 'SUCCESS') {
                    Persist.setUpdateData(colName, p, data, doc);
                }
            });

            // 模拟数据
            /*let data = { "millis": 112, "code": "SUCCESS", "message": "操作成功", "entity": { "serviceResultCode": null, "accessToken": null, "projectTagInfoList": null, "tagList": [] } };
            if (data.code === 'SUCCESS') {
                return Persist.setUpdateData(colName, p, data, doc);
            }*/
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
                var newArr = new Array(_collectionUtils2.default.updateData(colName, d, key));
                data.nowItems = (0, _immutable.List)(newArr);
                return data;
            } else {
                var _newArr = new Array(_collectionUtils2.default.updateData(colName, doc, key));
                data.nowItems = (0, _immutable.List)(_newArr);
                return data;
            }
        }

        /**
         * [remove 向集合删除单条信息]
         * @param  {[type]} colName [集合名称]
         * @param  {[type]} doc [单条数据 或 数据编号]
         * @return {[type]}         [description]
         */

    }, {
        key: 'remove',
        value: function remove(colName, doc) {
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
                        var newArr = new Array(_collectionUtils2.default.removeData(colName, param, key));
                        data.nowItems = (0, _immutable.List)(newArr);
                    });
                } else {
                    // 返回相关操作数据
                    var newArr = new Array(_collectionUtils2.default.removeData(colName, param, key));
                    mock.nowItems = (0, _immutable.List)(newArr);
                    return mock;
                }
            }

            // 执行ajax请求查询某集合数据详情
            return $.delete(Persist.getUrl(colName, p, param), null, function (data) {
                if (data.code === 'SUCCESS') {
                    var _newArr2 = new Array(_collectionUtils2.default.removeData(colName, param, key));
                    data.nowItems = (0, _immutable.List)(_newArr2);
                }
            });

            // 模拟数据
            /*let data = { "millis": 770, "code": "SUCCESS", "message": "操作成功", "entity": null };
            if (data.code === 'SUCCESS') {
                let newArr = new Array(Utils.removeData(colName, param, key));
                data.nowItems = List(newArr);
                return data;
            }*/
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