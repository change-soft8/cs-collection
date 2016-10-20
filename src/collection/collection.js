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
    }

    /**
     * [pubsub 集合变更，事件订阅]
     * @param  {Function} callback [集合变更，回调执行函数]
     * @return {[type]}            [description]
     */
    pubsub(p, callback) {
        // 订阅指定集合的事件
        PubSub.subscribe(this.pubsubKey(p), callback);
    }

    /**
     * [unsubscribe 取消事件订阅]
     * @param  {[type]} p [集合操作]
     * @return {[type]}            [description]
     */
    unsubscribe(p) {
        // 取消订阅指定集合的事件
        PubSub.unsubscribe(this.pubsubKey(p));
    }

    /**
     * [pubsubKey 生成订阅事件key]
     * @return {[type]} [description]
     */
    pubsubKey(p) {
        return `collection.${this.colName}.${p}.${this.id}`;
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
     * @param  {[type]} doc [查询对象 或 数据编号]
     * @return {[type]}     [description]
     */
    findOne(doc) {
        // 清缓存
        Collection.clearCacheData(this.colName, 'findOne');

        // 调用持久化对象 查询 数据详情
        /*if (Persist.isMock) {
            // mock数据
            let mock = Persist.findOne(this.colName, doc, this.pubsubKey('findOne'));
            if (mock) {
                if (typeof(mock.then) === 'function') {
                    return mock.then(((data) => {
                        // 集合变更，发布事件
                        PubSub.publish(this.pubsubKey('findOne'), data.nowItems);
                    }).bind(this));
                } else {
                    // 集合变更发布事件
                    PubSub.publish(this.pubsubKey('findOne'), mock.nowItems);
                }
            }
        } else {
            return Persist.findOne(this.colName, doc, this.pubsubKey('findOne')).then(((data) => {
                // 集合变更发布事件
                PubSub.publish(this.pubsubKey('findOne'), data.nowItems);
            }).bind(this));
        }*/

        // 模仿数据
        let data = Persist.findOne(this.colName, doc, this.pubsubKey('findOne'));
        PubSub.publish(this.pubsubKey('findOne'), data.nowItems);
    }

    /**
     * [find 根据查询器，查询集合]
     * @param  {[type]} doc   [查询器]
     * @param  {[type]} rtSet [返回指定键]
     * @return {[type]}       [description]
     */
    find(doc, rtSet) {
        // 不符合查询规则
        if (!doc || !typeof(doc) == "object") return false;

        // 初始化请求数据
        let query = {};

        // 如果传入数据为 object 类型
        for (let key in doc) {
            let value = doc[key];
            if (typeof(value) != "object") {
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

        // 清缓存
        Collection.clearCacheData(this.colName, 'find');

        // 调用持久化对象 查询 数据详情
        /*if (Persist.isMock) {
            // mock数据
            let mock = Persist.find(this.colName, doc, this.pubsubKey('find'));
            if (mock) {
                if (typeof(mock.then) === 'function') {
                    return mock.then(((data) => {
                        // 集合变更，发布事件
                        PubSub.publish(this.pubsubKey('find'), data.nowItems);
                    }).bind(this));
                } else {
                    // 集合变更发布事件
                    PubSub.publish(this.pubsubKey('find'), mock.nowItems);
                }
            }

        } else {
            // 调用持久化对象 查询 数据详情
            return Persist.find(this.colName, query, this.pubsubKey('find')).then(((data) => {
                // 集合变更发布事件
                PubSub.publish(this.pubsubKey('find'), data.nowItems);
            }).bind(this));
        }*/

        // 模仿数据
        let data = Persist.find(this.colName, doc, this.pubsubKey('find'));
        PubSub.publish(this.pubsubKey('find'), data.nowItems);
    }

    /**
     * [insert 向集合插入单条数据]
     * @param  {[type]} doc [单条数据]
     * @return {[type]}      [description]
     */
    insert(doc) {
        // 清缓存
        Collection.clearCacheData(this.colName, 'insert');
        // 调用持久化对象 查询 数据详情
        /*if (Persist.isMock) {
            // mock
            let mock = Persist.insert(this.colName, doc);
            if (mock) {
                if (typeof(mock.then) === 'function') {
                    return mock.then(((data) => {
                        // 集合变更，发布事件
                        PubSub.publish(this.pubsubKey('insert'), data.nowItems);
                    }).bind(this));
                } else {
                    // 集合变更，发布事件
                    PubSub.publish(this.pubsubKey('insert'), mock.nowItems);
                }
            }
        } else {
            // 请求次数
            let num = Persist.getRequestNum(this.colName);

            return Persist.insert(this.colName, doc).then(((data) => {
                // 集合变更发布事件
                PubSub.publish(this.pubsubKey('insert'), data.nowItems);
            }).bind(this));
        }*/

        /*== 模仿数据 ==*/
        // 请求次数
        let num = Persist.getRequestNum(this.colName);
        for (var i = 0; i < num; i++) {
            let data = Persist.insert(this.colName, doc);
            PubSub.publish(this.pubsubKey('insert'), data.nowItems);
        }
    }

    /**
     * [update 更新集合中单条数据]
     * @param  {[type]} doc [单条数据]
     * @return {[type]}     [description]
     */
    update(doc) {
        // 清缓存
        Collection.clearCacheData(this.colName, 'update');
        // 调用持久对象，更新单条数据
        if (Persist.isMock) {
            // mock
            let mock = Persist.update(this.colName, doc);
            if (mock) {
                if (typeof(mock.then) === 'function') {
                    return mock.then(((data) => {
                        // 集合变更，发布事件
                        PubSub.publish(this.pubsubKey('update'), data.nowItems);
                    }).bind(this));
                } else {
                    // 集合变更，发布事件
                    PubSub.publish(this.pubsubKey('update'), mock.nowItems);
                }
            }
        } else {
            return Persist.update(this.colName, doc).then(((data) => {
                // 集合变更，发布事件
                PubSub.publish(this.pubsubKey('update'), data.nowItems);
            }).bind(this));
        }

        /*// 模拟数据
        let data = Persist.update(this.colName, doc)
        PubSub.publish(this.pubsubKey('update'), data.nowItems);*/
    }

    /**
     * [remove 向集合删除单条信息]
     * @param  {[type]} doc [单条数据 或 数据编号]
     * @return {[type]}     [description]
     */
    remove(doc) {
        // 清缓存
        Collection.clearCacheData(this.colName, 'remove');
        // 调用持久对象，更新单条数据
        /*if (Persist.isMock) {
            // mock
            let mock = Persist.remove(this.colName, doc);
            if (mock) {
                if (typeof(mock.then) === 'function') {
                    return mock.then(((data) => {
                        // 集合变更，发布事件
                        PubSub.publish(this.pubsubKey('remove'), data.nowItems);
                    }).bind(this));
                } else {
                    // 集合变更，发布事件
                    PubSub.publish(this.pubsubKey('remove'), mock.nowItems);
                }
            }
        } else {
            // 请求次数
            let num = Persist.getRequestNum(this.colName);

            return Persist.remove(this.colName, doc).then(((data) => {
                // 集合变更，发布事件
                PubSub.publish(this.pubsubKey('remove'), data.nowItems);
            }).bind(this));
        }*/

        /*== 模仿数据 ==*/
        // 请求次数
        let num = Persist.getRequestNum(this.colName);
        for (var i = 0; i < num; i++) {
            let data = Persist.remove(this.colName, doc);
            PubSub.publish(this.pubsubKey('remove'), data.nowItems);
        }
    }
}
