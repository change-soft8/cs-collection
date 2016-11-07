(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("Immutable"), require("PubSub"));
	else if(typeof define === 'function' && define.amd)
		define(["Immutable", "PubSub"], factory);
	else if(typeof exports === 'object')
		exports["CsCollection"] = factory(require("Immutable"), require("PubSub"));
	else
		root["CsCollection"] = factory(root["Immutable"], root["PubSub"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_6__, __WEBPACK_EXTERNAL_MODULE_8__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _collection = __webpack_require__(1);

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

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _persist = __webpack_require__(2);

	var _persist2 = _interopRequireDefault(_persist);

	var _collectionUtils = __webpack_require__(5);

	var _collectionUtils2 = _interopRequireDefault(_collectionUtils);

	var _query = __webpack_require__(9);

	var _query2 = _interopRequireDefault(_query);

	var _pubsubJs = __webpack_require__(8);

	var _pubsubJs2 = _interopRequireDefault(_pubsubJs);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Collection = function () {

	    /**
	     * [constructor 集合操作构造函数]
	     * @param  {[type]} colName [集合名称]
	     * @param  {[type]} list    [初始化列表数据]
	     * @return {[type]}         [description]
	     */
	    function Collection(colName, list) {
	        _classCallCheck(this, Collection);

	        // 设置集合id
	        this.id = _collectionUtils2.default.uuid();
	        // 设置集合名称
	        this.colName = colName;
	        // 初始化参数为集合
	        this.items = _collectionUtils2.default.getList(list);
	    }

	    /**
	     * [bindWidget 绑定组件]
	     * @param  {Function} callback [集合变更，回调执行函数]
	     * @return {[type]}            [description]
	     */


	    _createClass(Collection, [{
	        key: 'bindWidget',
	        value: function bindWidget(id, callback) {
	            // 组件
	            var w = {};
	            // 组件id
	            w._id = id;
	            w.colName = this.colName;
	            w.pubsubKey = this.colName + '.' + id;
	            // 组件方法
	            w.findOne = this.findOne.bind(w);
	            w.find = this.find.bind(w);
	            w.insert = this.insert.bind(w);
	            w.update = this.update.bind(w);
	            w.remove = this.remove.bind(w);

	            // 订阅指定集合的事件
	            var pub = _pubsubJs2.default.subscribe(w.pubsubKey, callback);

	            // 取消事件订阅
	            w.unsubscribe = function () {
	                _pubsubJs2.default.unsubscribe(pub);
	            };

	            return w;
	        }

	        /**
	         * [clearCacheData 清除缓存数据]
	         * @param  {[type]} colName [集合名称]
	         * @param  {[type]} p [操作]
	         * @return {[type]}         [description]
	         */

	    }, {
	        key: 'findOne',


	        /**
	         * [findOne 查询数据详情]
	         * @param  {[type]} id [组件id]
	         * @param  {[type]} doc [查询对象 或 数据编号]
	         * @param  {[type]} type [url类型]
	         * @return {[type]}     [description]
	         */
	        value: function findOne(doc, type) {
	            var _this = this;

	            // 清缓存
	            Collection.clearCacheData(this.colName, 'findOne');

	            // 调用持久化对象 查询 数据详情
	            if (_persist2.default.isMock) {
	                // mock数据
	                var mock = _persist2.default.findOne(this.colName, doc, this.pubsubKey, type);
	                if (mock) {
	                    if (typeof mock.then === 'function') {
	                        return mock.then(function (data) {
	                            // 集合变更，发布事件
	                            _pubsubJs2.default.publish(_this.pubsubKey, data.nowItems);
	                        }.bind(this));
	                    } else {
	                        // 集合变更发布事件
	                        _pubsubJs2.default.publish(this.pubsubKey, mock.nowItems);
	                    }
	                }
	            } else {
	                return _persist2.default.findOne(this.colName, doc, this.pubsubKey, type).then(function (data) {
	                    // 集合变更发布事件
	                    _pubsubJs2.default.publish(_this.pubsubKey, data.nowItems);
	                }.bind(this));
	            }
	        }

	        /**
	         * [find 根据查询器，查询集合]
	         * @param  {[type]} doc   [查询器]
	         * @param  {[type]} type [url类型]
	         * @return {[type]}       [description]
	         */

	    }, {
	        key: 'find',
	        value: function find(doc, val, type) {
	            var _this2 = this;

	            // 初始化请求数据
	            var query = {};
	            // 不符合查询规则
	            if (doc && (typeof doc === 'undefined' ? 'undefined' : _typeof(doc)) == "object") {
	                // 如果传入数据为 object 类型
	                for (var key in doc) {
	                    var value = doc[key];
	                    if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) != "object") {
	                        // 等值搜索
	                        query[key] = value;
	                    } else {
	                        // 条件搜索
	                        for (var inKey in value) {
	                            // 查询器的值
	                            var inValue = value[inKey];
	                            if (inKey.indexOf("$") == 0) {
	                                // 搜索查询器
	                                var tag = inKey;

	                                // 按照 查询器 解析 查询条件
	                                try {
	                                    var v = _query2.default[tag](inValue);
	                                    if (v) {
	                                        query[key] = v;
	                                    } else {
	                                        return false;
	                                    }
	                                } catch (e) {
	                                    // 查询器暂不支持;
	                                    return false;
	                                }
	                            } else {
	                                // 条件搜搜的查询器不是以 $ 开头
	                                return false;
	                            }
	                        }
	                    }
	                }
	            }

	            // 清缓存
	            Collection.clearCacheData(this.colName, 'find');

	            // 调用持久化对象 查询 数据详情
	            if (_persist2.default.isMock) {
	                // mock数据
	                var mock = _persist2.default.find(this.colName, doc, val, this.pubsubKey, type);
	                if (mock) {
	                    if (typeof mock.then === 'function') {
	                        return mock.then(function (data) {
	                            // 集合变更，发布事件
	                            _pubsubJs2.default.publish(_this2.pubsubKey, data.nowItems);
	                        }.bind(this));
	                    } else {
	                        var deferred = $.Deferred();
	                        // 集合变更发布事件
	                        _pubsubJs2.default.publish(this.pubsubKey, mock.nowItems);
	                        deferred.resolve();

	                        return deferred.promise();
	                    }
	                }
	            } else {
	                // 调用持久化对象 查询 数据详情
	                return _persist2.default.find(this.colName, query, val, this.pubsubKey, type).then(function (data) {
	                    // 集合变更发布事件
	                    _pubsubJs2.default.publish(_this2.pubsubKey, data.nowItems);
	                }.bind(this));
	            }
	        }

	        /**
	         * [insert 向集合插入单条数据]
	         * @param  {[type]} doc [单条数据]
	         * @param  {[type]} type [url类型]
	         * @return {[type]}      [description]
	         */

	    }, {
	        key: 'insert',
	        value: function insert(doc, type) {
	            var _this3 = this;

	            // 清缓存
	            Collection.clearCacheData(this.colName, 'insert');
	            // 调用持久化对象 查询 数据详情
	            if (_persist2.default.isMock) {
	                // mock
	                var mock = _persist2.default.insert(this.colName, doc, type);
	                if (mock) {
	                    if (typeof mock.then === 'function') {
	                        return mock.then(function (data) {
	                            // 集合变更，发布事件
	                            _pubsubJs2.default.publish(_this3.pubsubKey, data.nowItems);
	                        }.bind(this));
	                    } else {
	                        // 集合变更，发布事件
	                        _pubsubJs2.default.publish(this.pubsubKey, mock.nowItems);
	                    }
	                }
	            } else {
	                var inter;

	                (function () {
	                    // 请求次数
	                    var num = _persist2.default.getRequestNum(_this3.colName);
	                    var i = 1;

	                    inter = setInterval(function () {
	                        var _this4 = this;

	                        if (i == num) {
	                            clearInterval(inter);

	                            return _persist2.default.insert(this.colName, doc, type).then(function (data) {
	                                // 集合变更发布事件
	                                _pubsubJs2.default.publish(_this4.pubsubKey, data.nowItems);
	                            }.bind(this));
	                        }

	                        _persist2.default.insert(this.colName, doc, type).then(function (data) {
	                            // 集合变更发布事件
	                            _pubsubJs2.default.publish(_this4.pubsubKey, data.nowItems);
	                        }.bind(this));

	                        i++;
	                    }.bind(_this3), 50);
	                })();
	            }
	        }

	        /**
	         * [update 更新集合中单条数据]
	         * @param  {[type]} doc [单条数据]
	         * @param  {[type]} type [url类型]
	         * @return {[type]}     [description]
	         */

	    }, {
	        key: 'update',
	        value: function update(doc, type) {
	            var _this5 = this;

	            // 清缓存
	            Collection.clearCacheData(this.colName, 'update');
	            // 调用持久对象，更新单条数据
	            if (_persist2.default.isMock) {
	                // mock
	                var mock = _persist2.default.update(this.colName, doc, type);
	                if (mock) {
	                    if (typeof mock.then === 'function') {
	                        return mock.then(function (data) {
	                            // 集合变更，发布事件
	                            _pubsubJs2.default.publish(_this5.pubsubKey, data.nowItems);
	                        }.bind(this));
	                    } else {
	                        // 集合变更，发布事件
	                        _pubsubJs2.default.publish(this.pubsubKey, mock.nowItems);
	                    }
	                }
	            } else {
	                return _persist2.default.update(this.colName, doc, type).then(function (data) {
	                    // 集合变更，发布事件
	                    _pubsubJs2.default.publish(_this5.pubsubKey, data.nowItems);
	                    // PubSub.publish(this.pubsubKey, data.nowItems);
	                    // PubSub.publish(this.pubsubKey, data.nowItems);
	                }.bind(this));
	            }
	        }

	        /**
	         * [remove 向集合删除单条信息]
	         * @param  {[type]} doc [单条数据 或 数据编号]
	         * @param  {[type]} type [url类型]
	         * @return {[type]}     [description]
	         */

	    }, {
	        key: 'remove',
	        value: function remove(doc, type) {
	            var _this6 = this;

	            // 清缓存
	            Collection.clearCacheData(this.colName, 'remove');
	            // 调用持久对象，更新单条数据
	            if (_persist2.default.isMock) {
	                // mock
	                var mock = _persist2.default.remove(this.colName, doc, type);
	                if (mock) {
	                    if (typeof mock.then === 'function') {
	                        return mock.then(function (data) {
	                            // 集合变更，发布事件
	                            _pubsubJs2.default.publish(_this6.pubsubKey, data.nowItems);
	                        }.bind(this));
	                    } else {
	                        // 集合变更，发布事件
	                        _pubsubJs2.default.publish(this.pubsubKey, mock.nowItems);
	                    }
	                }
	            } else {
	                var inter;

	                (function () {
	                    // 请求次数
	                    var num = _persist2.default.getRequestNum(_this6.colName);
	                    var i = 1;

	                    inter = setInterval(function () {
	                        var _this7 = this;

	                        if (i == num) {
	                            clearInterval(inter);

	                            return _persist2.default.remove(this.colName, doc, type).then(function (data) {
	                                // 集合变更，发布事件
	                                _pubsubJs2.default.publish(_this7.pubsubKey, data.nowItems);
	                            }.bind(this));
	                        }

	                        _persist2.default.remove(this.colName, doc, type).then(function (data) {
	                            // 集合变更，发布事件
	                            _pubsubJs2.default.publish(_this7.pubsubKey, data.nowItems);
	                        }.bind(this));

	                        i++;
	                    }.bind(_this6), 50);
	                })();
	            }
	        }
	    }], [{
	        key: 'clearCacheData',
	        value: function clearCacheData(colName, p) {
	            // 获取过期时间
	            var timeout = _persist2.default.getCacheTimeOut(colName);
	            // 当前时间
	            var time = new Date().getTime();
	            // 当前集合数据
	            var db = window.db && window.db[colName].items.toArray();
	            // 需要删除的数组初始化
	            var reArr = [];

	            for (var i in db) {
	                // 开始时间
	                var start = db[i].cacheTime;

	                // 如果过期时间不等于-1，且超过设定的缓存时间
	                if (timeout != -1 && time - timeout > start) {
	                    // 要删除的
	                    reArr.push(i);
	                }
	            }

	            // 倒叙
	            reArr = reArr.reverse();

	            for (var i = 0; i < reArr.length; i++) {
	                // 删除
	                db.splice(reArr[i], 1);
	            }

	            // 更新缓存数据
	            _collectionUtils2.default.setLocalData(colName, _collectionUtils2.default.getList(db));
	        }
	    }]);

	    return Collection;
	}();

	exports.default = Collection;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _mockUtils = __webpack_require__(3);

	var _mockUtils2 = _interopRequireDefault(_mockUtils);

	var _collectionUtils = __webpack_require__(5);

	var _collectionUtils2 = _interopRequireDefault(_collectionUtils);

	var _immutable = __webpack_require__(6);

	var _pubsubJs = __webpack_require__(8);

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
	         * @param  {[type]} pubkey  [发布key]
	         * @param  {[type]} type [url类型]
	         * @return {[type]}         [description]
	         */

	    }, {
	        key: 'findOne',
	        value: function findOne(colName, doc, pubkey, type) {
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

	            // 获取主键
	            var key = Persist.getPrimaryKey(colName);
	            // 获取主键值
	            var param = Persist.getPrimaryKeyValue(colName, doc);

	            var db = window.db && window.db[colName] && window.db[colName].items;
	            // let parammock = db.first() && db.first().projectId; //目前模仿第一条数据，到时删除此行
	            if (db && db.size > 0) {
	                db.forEach(function (val, i) {
	                    if (val[key] == param) {
	                        //目前模仿第一条数据，到时候parammock改为param
	                        _pubsubJs2.default.publish(pubkey, (0, _immutable.Map)(val));
	                    }
	                });
	            }

	            // 执行ajax请求查询某集合数据详情    
	            return $.get(Persist.getUrl(colName, 'findOne', param, type), null, function (data) {
	                if (data.code === 'SUCCESS') {
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
	         * @param  {[type]} colName [集合名称]
	         * @param  {[type]} doc     [数据参数]
	         * @param  {[type]} pubkey  [发布key]
	         * @param  {[type]} type    [url类型]
	         * @return {[type]}         [description]
	         */

	    }, {
	        key: 'find',
	        value: function find(colName, doc, val, pubkey, type) {
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

	            var db = window.db && window.db[colName] && window.db[colName].items;
	            var match = _collectionUtils2.default.filterListKey(db, doc);

	            if (match) {
	                _pubsubJs2.default.publish(pubkey, match);
	            }

	            // 执行ajax请求查询某集合数据详情
	            return $.get(Persist.getUrl(colName, p, val, type), doc, function (data) {
	                if (data.code === 'SUCCESS') {
	                    Persist.setFindData(colName, p, data);
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
	                var one = $.extend({ "cacheTime": new Date().getTime() }, paramObj, _defineProperty({}, key, d[key]));

	                var db = window.db && window.db[colName] && window.db[colName].items;
	                if (db) {
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
	            return $.put(Persist.getUrl(colName, p, param, type), paramObj, function (data) {
	                if (data.code === 'SUCCESS') {
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
	            return $.delete(Persist.getUrl(colName, p, param, type), null, function (data) {
	                if (data.code === 'SUCCESS') {
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

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _mockConf = __webpack_require__(4);

	var _mockConf2 = _interopRequireDefault(_mockConf);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
	                var _ret = function () {
	                    // 获取操作返回key数组
	                    var attrArr = MockUtils.getKeyItems(obj);
	                    // 长度级别数组
	                    var levelArr = _mockConf2.default[MockUtils.mockLevel] || _mockConf2.default[MockUtils.level_1];

	                    // 遍历
	                    attrArr.forEach(function (key, i) {
	                        // 如果字段是数组
	                        if ($.isArray(obj[key])) {
	                            // 返回数组
	                            var valArr = [];
	                            // 数组随机长度
	                            var len = MockUtils.getRandomlength(levelArr.array);

	                            if (_typeof(obj[key][0]) === 'object') {
	                                // 遍历
	                                for (var n = 0; n < len; n++) {
	                                    // 初始对象
	                                    var temp = {};
	                                    // 遍历
	                                    for (var m in obj[key][0]) {
	                                        // 数组内对象
	                                        temp = $.extend(temp, _defineProperty({}, m, MockUtils.getItemValue(fields[m], levelArr)));
	                                    }
	                                    // 返回数组赋值
	                                    valArr.push(temp);
	                                }
	                            } else {
	                                // 遍历
	                                for (var n = 0; n < len; n++) {
	                                    // 返回数组赋值
	                                    valArr.push(MockUtils.getItemValue(obj[key][0], levelArr));
	                                }
	                            }

	                            // 赋值给字段
	                            obj[key] = valArr;
	                        } else {
	                            // 其他情况字段赋值
	                            obj[key] = MockUtils.getItemValue(fields[key], levelArr);
	                        }
	                    });

	                    return {
	                        v: obj
	                    };
	                }();

	                if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	            }
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
	                value = new Date().getTime();
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

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * mock数据相关配置
	 */
	exports.default = {
	    // 一级mock数据长度设置
	    "level_1": {
	        "en": [5, 50],
	        "zh": [1, 20],
	        "int": [1, 10],
	        "array": [0, 20]
	    },
	    // 二级mock数据长度设置
	    "level_2": {
	        "en": [50, 100],
	        "zh": [20, 80],
	        "int": [10, 20],
	        "array": [20, 80]
	    },
	    // 三级mock数据长度设置
	    "level_3": {
	        "en": [100, 200],
	        "zh": [80, 150],
	        "int": [20, 100],
	        "array": [80, 150]
	    }
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _immutable = __webpack_require__(6);

	var _utils = __webpack_require__(7);

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

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _immutable = __webpack_require__(6);

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

	            if (_immutable.List.isList(obj) || _immutable.Map.isMap(obj)) {
	                if (obj.size > 1) {
	                    return false;
	                } else {
	                    return true;
	                }
	            } else {
	                if (this.isArray(obj)) {
	                    return obj.length == 0;
	                } else if (this.isObject(obj)) {
	                    for (var name in obj) {
	                        return false;
	                    }
	                    return true;
	                }
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

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_8__;

/***/ },
/* 9 */
/***/ function(module, exports) {

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

/***/ }
/******/ ])
});
;