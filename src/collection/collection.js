import Persist from './persist';
import Utils from './collection-utils';
import Query from './query';
import PubSub from 'pubsub-js';

export default class Collection {

    /**
     * [constructor 集合操作构造函数]
     * @param  {[type]} colName [集合名称]
     * @param  {[type]} list    [初始化列表数据]
     * @return {[type]}         [description]
     */
    constructor(colName, list) {
        // 设置集合id
        this.id = Utils.uuid();
        // 设置集合名称
        this.colName = colName;
        // 初始化参数为集合
        this.items = Utils.getList(list);
        // 初始化组件
        this.widgets = [];
    }

    /**
     * [bindWidget 绑定组件]
     * @param  {[type]} id [组件Id]
     * @param  {Function} callback [集合变更，回调执行函数]
     * @return {[type]}            [description]
     */
    bindWidget(id, callback) {
        // 组件
        var w = {};
        // 组件id
        w.id = id;
        w.colName = this.colName;
        w.pubsubKey = `${this.colName}.${id}`;
        // 组件方法
        w.findOne = this.findOne.bind(w);
        w.find = this.find.bind(w);
        w.insert = this.insert.bind(w);
        w.update = this.update.bind(w);
        w.remove = this.remove.bind(w);

        // 订阅指定集合的事件
        w.pubsub = PubSub.subscribe(w.pubsubKey, callback);

        // 取消事件订阅
        w.unsubscribe = () => {
            PubSub.unsubscribe(w.pubsub);
        }

        // 存放组件
        this.widgets.push({
            widget: w
        });

        return w;
    }

    /**
     * [publishRelated 发布关联事件]
     * @param  {[type]} colName [集合名称]
     * @return {[type]}            [description]
     */
    static publishRelated(colName) {
        let w = window.db && window.db[colName] && window.db[colName].widgets;
        let db = window.db && window.db[colName] && window.db[colName].items;

        for (var i = 0; i < w.length; i++) {
            if (w[i].hasOwnProperty("query")) {
                let query = w[i].query;

                if (Utils.isEmpty(query)) {
                    PubSub.publish(w[i].widget.pubsubKey, db);
                } else {
                    let match = Utils.filterListKey(db, query);

                    if (match) {
                        PubSub.publish(w[i].widget.pubsubKey, match);
                    }
                }
            }
        }
    }

    /**
     * [clearCacheData 清除缓存数据]
     * @param  {[type]} colName [集合名称]
     * @param  {[type]} p [操作]
     * @return {[type]}         [description]
     */
    static clearCacheData(colName, p) {
        // 获取过期时间
        let timeout = Persist.getCacheTimeOut(colName);
        // 当前时间
        let time = new Date().getTime();
        // 当前集合数据
        let db = window.db && window.db[colName].items.toArray();
        // 需要删除的数组初始化
        let reArr = [];

        for (var i in db) {
            // 开始时间
            let start = db[i].cacheTime;

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
        Utils.setLocalData(colName, Utils.getList(db));
    }

    /**
     * [findOne 查询数据详情]
     * @param  {[type]} id [组件id]
     * @param  {[type]} doc [查询对象 或 数据编号]
     * @param  {[type]} type [url类型]
     * @return {[type]}     [description]
     */
    findOne(doc, type) {
        // 初始化请求数据
        let query = {};
        // 不符合查询规则
        if (doc && typeof (doc) == "object") {
            // 如果传入数据为 object 类型
            for (let key in doc) {
                let value = doc[key];
                if (typeof (value) != "object") {
                    // 等值搜索
                    query[key] = value;
                } else {
                    // 条件搜索
                    for (let inKey in value) {
                        // 查询器的值
                        let inValue = value[inKey];
                        if (inKey.indexOf("$") == 0) {
                            // 搜索查询器
                            let tag = inKey;

                            // 按照 查询器 解析 查询条件
                            try {
                                let v = Query[tag](inValue);
                                if (v) {
                                    query[key] = v
                                } else {
                                    return false;
                                }
                            } catch ( e ) {
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
        Collection.clearCacheData(this.colName, 'findOne');

        let w = db[this.colName].widgets;
        for (var i = 0; i < w.length; i++) {
            if (w[i].widget.id == this.id) {
                w[i].query = query;
            }
        }

        // 调用持久化对象 查询 数据详情
        if (Persist.isMock) {
            // mock数据
            let mock = Persist.findOne.bind(this)(this.colName, doc, query, type);
            if (mock) {
                if (typeof (mock.then) === 'function') {
                    return mock.then(((data) => {
                        // 集合变更，发布事件
                        PubSub.publish(this.pubsubKey, data.nowItems);
                    }).bind(this));
                } else {
                    // 集合变更发布事件
                    PubSub.publish(this.pubsubKey, mock.nowItems);
                }
            }
        } else {
            return Persist.findOne.bind(this)(this.colName, doc, query, type).then(((data) => {
                // 集合变更发布事件
                PubSub.publish(this.pubsubKey, data.nowItems);
            }).bind(this));
        }
    }

    /**
     * [find 根据查询器，查询集合]
     * @param  {[type]} doc   [查询器]
     * @param  {[type]} param   [配置getUrl方法所需外部传入的param]
     * @param  {[type]} type [url类型]
     * @return {[type]}       [description]
     */
    find(doc, param, type) {
        // 初始化请求数据
        let query = {};
        // 不符合查询规则
        if (doc && typeof (doc) == "object") {
            // 如果传入数据为 object 类型
            for (let key in doc) {
                let value = doc[key];
                if (typeof (value) != "object") {
                    // 等值搜索
                    query[key] = value;
                } else {
                    // 条件搜索
                    for (let inKey in value) {
                        // 查询器的值
                        let inValue = value[inKey];
                        if (inKey.indexOf("$") == 0) {
                            // 搜索查询器
                            let tag = inKey;

                            // 按照 查询器 解析 查询条件
                            try {
                                let v = Query[tag](inValue);
                                if (v) {
                                    query[key] = v
                                } else {
                                    return false;
                                }
                            } catch ( e ) {
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

        let w = db[this.colName].widgets;
        for (var i = 0; i < w.length; i++) {
            if (w[i].widget.id == this.id) {
                w[i].query = query;
            }
        }

        // 调用持久化对象 查询 数据详情
        if (Persist.isMock) {
            // mock数据
            let mock = Persist.find.bind(this)(doc, query, param, type);
            if (mock) {
                if (typeof (mock.then) === 'function') {
                    return mock.then(((data) => {
                        // 集合变更，发布事件
                        PubSub.publish(this.pubsubKey, data.nowItems);
                    }).bind(this));
                } else {
                    let deferred = $.Deferred();
                    // 集合变更发布事件
                    PubSub.publish(this.pubsubKey, mock.nowItems);
                    deferred.resolve();

                    return deferred.promise();
                }
            }

        } else {
            // 调用持久化对象 查询 数据详情
            return Persist.find.bind(this)(doc, query, param, type).then(((data) => {
                // 集合变更发布事件
                PubSub.publish(this.pubsubKey, data.nowItems);
            }).bind(this));
        }
    }

    /**
     * [insert 向集合插入单条数据]
     * @param  {[type]} doc [单条数据]
     * @param  {[type]} type [url类型]
     * @return {[type]}      [description]
     */
    insert(doc, type) {
        // 清缓存
        Collection.clearCacheData(this.colName, 'insert');
        // 调用持久化对象 查询 数据详情
        if (Persist.isMock) {
            // mock
            let mock = Persist.insert.bind(this)(this.colName, doc, type);
            if (mock) {
                if (typeof (mock.then) === 'function') {
                    return mock.then(((data) => {
                        // 集合变更，发布事件
                        PubSub.publish(this.pubsubKey, data.nowItems);
                    }).bind(this));
                } else {
                    // 集合变更，发布事件
                    PubSub.publish(this.pubsubKey, mock.nowItems);
                }
            }
        } else {
            // 请求次数
            let num = Persist.getRequestNum(this.colName);
            let i = 1;

            let p = Persist.insert.bind(this)(this.colName, doc, type).then(((data) => {
                // 集合变更发布事件
                PubSub.publish(this.pubsubKey, data.nowItems);

                Collection.publishRelated(this.colName);
            }).bind(this));

            if (num > 1) {
                var inter = setInterval(function() {
                    if (i == num - 1) {
                        clearInterval(inter);
                    }

                    Persist.insert(this.colName, doc, type);

                    i++;
                }.bind(this), 50);
            }

            return p;
        }
    }

    /**
     * [update 更新集合中单条数据]
     * @param  {[type]} doc [单条数据]
     * @param  {[type]} type [url类型]
     * @return {[type]}     [description]
     */
    update(doc, type) {
        // 清缓存
        Collection.clearCacheData(this.colName, 'update');
        // 调用持久对象，更新单条数据
        if (Persist.isMock) {
            // mock
            let mock = Persist.update.bind(this)(this.colName, doc, type);
            if (mock) {
                if (typeof (mock.then) === 'function') {
                    return mock.then(((data) => {
                        // 集合变更，发布事件
                        PubSub.publish(this.pubsubKey, data.nowItems);
                    }).bind(this));
                } else {
                    // 集合变更，发布事件
                    PubSub.publish(this.pubsubKey, mock.nowItems);
                }
            }
        } else {
            return Persist.update.bind(this)(this.colName, doc, type).then(((data) => {
                // 集合变更，发布事件
                PubSub.publish(this.pubsubKey, data.nowItems);

                Collection.publishRelated(this.colName);
            }).bind(this));
        }
    }

    /**
     * [remove 向集合删除单条信息]
     * @param  {[type]} doc [单条数据 或 数据编号]
     * @param  {[type]} type [url类型]
     * @return {[type]}     [description]
     */
    remove(doc, type) {
        // 清缓存
        Collection.clearCacheData(this.colName, 'remove');
        // 调用持久对象，更新单条数据
        if (Persist.isMock) {
            // mock
            let mock = Persist.remove.bind(this)(this.colName, doc, type);
            if (mock) {
                if (typeof (mock.then) === 'function') {
                    return mock.then(((data) => {
                        // 集合变更，发布事件
                        PubSub.publish(this.pubsubKey, data.nowItems);
                    }).bind(this));
                } else {
                    // 集合变更，发布事件
                    PubSub.publish(this.pubsubKey, mock.nowItems);
                }
            }
        } else {
            // 请求次数
            let num = Persist.getRequestNum(this.colName);
            let i = 1;

            let p = Persist.remove.bind(this)(this.colName, doc, type).then(((data) => {
                // 集合变更，发布事件
                PubSub.publish(this.pubsubKey, data.nowItems);

                Collection.publishRelated(this.colName);
            }).bind(this));

            if (num > 1) {
                var inter = setInterval(function() {
                    if (i == num - 1) {
                        clearInterval(inter);
                    }

                    Persist.remove(this.colName, doc, type);

                    i++;
                }.bind(this), 50);
            }

            return p;
        }
    }
}
