'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _persist = require('./persist');

var _persist2 = _interopRequireDefault(_persist);

var _collectionUtils = require('./collection-utils');

var _collectionUtils2 = _interopRequireDefault(_collectionUtils);

var _query = require('./query');

var _query2 = _interopRequireDefault(_query);

var _pubsubJs = require('pubsub-js');

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
     * [pubsub 集合变更，事件订阅]
     * @param  {Function} callback [集合变更，回调执行函数]
     * @return {[type]}            [description]
     */


    _createClass(Collection, [{
        key: 'pubsub',
        value: function pubsub(p, callback) {
            // 订阅指定集合的事件
            _pubsubJs2.default.subscribe(this.pubsubKey(p), callback);
        }

        /**
         * [unsubscribe 取消事件订阅]
         * @param  {[type]} p [集合操作]
         * @return {[type]}            [description]
         */

    }, {
        key: 'unsubscribe',
        value: function unsubscribe(p) {
            // 取消订阅指定集合的事件
            _pubsubJs2.default.unsubscribe(this.pubsubKey(p));
        }

        /**
         * [pubsubKey 生成订阅事件key]
         * @return {[type]} [description]
         */

    }, {
        key: 'pubsubKey',
        value: function pubsubKey(p) {
            return 'collection.' + this.colName + '.' + p + '.' + this.id;
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
                var mock = _persist2.default.findOne(this.colName, doc, this.pubsubKey('findOne'), type);
                if (mock) {
                    if (typeof mock.then === 'function') {
                        return mock.then(function (data) {
                            // 集合变更，发布事件
                            _pubsubJs2.default.publish(_this.pubsubKey('findOne'), data.nowItems);
                        }.bind(this));
                    } else {
                        // 集合变更发布事件
                        _pubsubJs2.default.publish(this.pubsubKey('findOne'), mock.nowItems);
                    }
                }
            } else {
                return _persist2.default.findOne(this.colName, doc, this.pubsubKey('findOne'), type).then(function (data) {
                    // 集合变更发布事件
                    _pubsubJs2.default.publish(_this.pubsubKey('findOne'), data.nowItems);
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
                var mock = _persist2.default.find(this.colName, doc, val, this.pubsubKey('find'), type);
                if (mock) {
                    if (typeof mock.then === 'function') {
                        return mock.then(function (data) {
                            // 集合变更，发布事件
                            _pubsubJs2.default.publish(_this2.pubsubKey('find'), data.nowItems);
                        }.bind(this));
                    } else {
                        var deferred = $.Deferred();
                        // 集合变更发布事件
                        _pubsubJs2.default.publish(this.pubsubKey('find'), mock.nowItems);
                        deferred.resolve();

                        return deferred.promise();
                    }
                }
            } else {
                // 调用持久化对象 查询 数据详情
                return _persist2.default.find(this.colName, query, val, this.pubsubKey('find'), type).then(function (data) {
                    // 集合变更发布事件
                    _pubsubJs2.default.publish(_this2.pubsubKey('find'), data.nowItems);
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
                            _pubsubJs2.default.publish(_this3.pubsubKey('insert'), data.nowItems);
                        }.bind(this));
                    } else {
                        // 集合变更，发布事件
                        _pubsubJs2.default.publish(this.pubsubKey('insert'), mock.nowItems);
                    }
                }
            } else {
                // 请求次数
                var num = _persist2.default.getRequestNum(this.colName);

                for (var i = 0; i < num; i++) {
                    if (i == num - 1) {
                        return _persist2.default.insert(this.colName, doc, type).then(function (data) {
                            // 集合变更发布事件
                            _pubsubJs2.default.publish(_this3.pubsubKey('insert'), data.nowItems);
                        }.bind(this));
                    }

                    _persist2.default.insert(this.colName, doc, type).then(function (data) {
                        // 集合变更发布事件
                        _pubsubJs2.default.publish(_this3.pubsubKey('insert'), data.nowItems);
                    }.bind(this));
                }
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
            var _this4 = this;

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
                            _pubsubJs2.default.publish(_this4.pubsubKey('update'), data.nowItems);
                        }.bind(this));
                    } else {
                        // 集合变更，发布事件
                        _pubsubJs2.default.publish(this.pubsubKey('update'), mock.nowItems);
                    }
                }
            } else {
                return _persist2.default.update(this.colName, doc, type).then(function (data) {
                    // 集合变更，发布事件
                    _pubsubJs2.default.publish(_this4.pubsubKey('update'), data.nowItems);
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
            var _this5 = this;

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
                            _pubsubJs2.default.publish(_this5.pubsubKey('remove'), data.nowItems);
                        }.bind(this));
                    } else {
                        // 集合变更，发布事件
                        _pubsubJs2.default.publish(this.pubsubKey('remove'), mock.nowItems);
                    }
                }
            } else {
                // 请求次数
                var num = _persist2.default.getRequestNum(this.colName);

                for (var i = 0; i < num; i++) {
                    if (i == num - 1) {
                        return _persist2.default.remove(this.colName, doc, type).then(function (data) {
                            // 集合变更，发布事件
                            _pubsubJs2.default.publish(_this5.pubsubKey('remove'), data.nowItems);
                        }.bind(this));
                    }

                    _persist2.default.remove(this.colName, doc, type).then(function (data) {
                        // 集合变更，发布事件
                        _pubsubJs2.default.publish(_this5.pubsubKey('remove'), data.nowItems);
                    }.bind(this));
                }
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