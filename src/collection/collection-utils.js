import { Map, List } from 'immutable';
import Utils from '../utils';

/**
 * 处理数据工具方法
 */
export default class CollectionUtils extends Utils {

    /**
     * 返回一个List 对象
     * @param  {初始化数组值}
     * @return {[List对象]}
     */
    static getList(array) {
        // 如果参数为数组类型
        if (Array.isArray(array)) {
            // 返回有初始值的List
            return List(array);
        }
        // 返回空值List
        return List.of();
    }

    /**
     * 检查对象是否为Map类型
     * @param  {[doc]}
     * @return {Boolean}
     */
    static isMap(doc) {
        return Map.isMap(doc);
    }

    /**
     * 检查对象是否为List类型
     * @param  {[doc]}
     * @return {Boolean}
     */
    static isList(doc) {
        return List.isList(doc);
    }

    /**
     * [getParamObj 获取调用接口所需参数]
     * @param  {[doc]}
     * @param  {[arr]}
     * @return {普通对象}
     */
    static getParamObj(doc, arr) {
        let paramObj = {};

        if (typeof(doc) == "object") {
            if (!arr[1]) {
                if (arr[0]) {
                    paramObj = CollectionUtils.getKeyObj(doc, arr[0]);
                } else {
                    paramObj = doc;
                }
            } else {
                paramObj = CollectionUtils.withoutKeyObj(doc, arr[0]);
            }
        } else if (typeof(doc) == "string") {
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
    static setLocalData(colName, data) {
        window.db[colName].items = data;
        window.localStorage.setItem('db', JSON.stringify(window.db));
    }

    /**
     * [updateData 更新操作后更新数据]
     * @param  {[data]}
     * @return {普通对象}
     */
    static updateData(colName, data, key) {
        let db = window.db && window.db[colName].items;

        if (db && db.size > 0) {
            let nowdb = List();
            let update = List();

            db.forEach((val, i) => {
                if (val[key] == data[key]) {
                    let oldobj = Map(val);

                    for (var n in data) {
                        oldobj.map((v, j) => {
                            if (j == n) {
                                update = oldobj.set(n, data[n]);
                            }
                        });
                    }

                    let newobj = update.toObject();
                    newobj.cacheTime = new Date().getTime();
                    nowdb = db.set(i, newobj);
                }
            });

            if (nowdb && nowdb.size > 0) {
                CollectionUtils.setLocalData(colName, nowdb);
            } else {
                console.error('更改的数据不存在！');
            }

            return update.toObject();
        } else {
            console.error('更改的数据不存在！');
        }
    }

    /**
     * [removeData 更新操作后更新数据]
     * @param  {[data]}
     * @return {普通对象}
     */
    static removeData(colName, data, key) {
        let db = window.db && window.db[colName].items;

        if (db && db.size > 0) {
            let nowdb = List();
            let remove = false;
            let res;

            db.forEach((val, i) => {
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
    static getKeyObj(list, key) {

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
            if (Map.isMap(list)) {
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
    static getListKeyObj(list, key) {
        if (!list || !key) return;
        var listObj = [];
        for (var i = 0; i < list.length; i++) {
            let newObj = this.getKeyObj(list[i], key);
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
    static filterListKey(list, query) {

        if (!list || CollectionUtils.isEmpty(list) || !query) return;
        var result;
        if (List.isList(list)) {
            return this.filterMapListKey(list, query);
        } else if (list.constructor == Array) {
            return this.filterMapListKey(List(list), query);
        }

    }

    /**
     * 筛选符合查询条件的immutable数组
     * @param  {immutable数组} list  被筛选数组
     * @param  {普通对象} query 筛选对象
     * @return {普通数组}       筛选出的数组
     */
    static filterMapListKey(list, query) {

        if (!list || !query || !List.isList(list)) return;

        var mapQuery = Map(query);
        var mapData = list.filter((obj) => {
            var testHaskey = true;
            mapQuery.map((val, k) => {
                if (val != Map(obj).get(k)) {
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
    static withoutKeyObj(list, key) {

        if (!list || CollectionUtils.isEmpty(list) || !key) return;
        var obj;
        if (Map.isMap(list)) {
            obj = this.withoutMapKeyObj(list, key);
        } else if (list.constructor == Object) {
            let newList = Map(list);
            obj = this.withoutMapKeyObj(newList, key);
        } else if (list.constructor == Array) {
            obj = [];
            for (var i = 0; i < list.length; i++) {
                let rObj = this.withoutMapKeyObj(Map(list[i]), key);
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
    static withoutMapKeyObj(list, key) {

        if (!list || !key || !Map.isMap(list)) return;
        var newList;
        if (key.constructor == String) {
            newList = list.filterNot((val, k) => {
                return key == k;
            });
        } else if (key.constructor == Array) {
            var newKey = List(key);
            newList = list.filterNot((val, k) => {
                return newKey.includes(k);
            });
        }

        return newList.toObject();
    }

}
