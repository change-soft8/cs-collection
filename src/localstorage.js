import Collection from './collection/collection';

export default class Localstorage {

    /**
     * [constructor 数据存储构造函数]
     * @param  {[type]} colName [集合名称]
     * @param  {[type]} list    [初始化列表数据]
     * @return {[type]}         [description]
     */
    constructor(config, i18n, mock) {
        // 传入配置有误情况
        if (!config || typeof(config) != 'object') {
            console.error('没有配置或者配置错误');
            return;
        }

        // 设置配置
        window.collectionConfig = config;
        // 设置集合国际化
        window.collectionI18n = i18n || 'en';
        // 设置默认JSON
        if (typeof(mock) == 'string') {
            window.collectionMock = JSON.parse(mock);
        } else {
            window.collectionMock = mock || { 'millis': 34, 'code': 'SUCCESS', 'message': '操作成功', 'entity': '' };
        }      
        
        let oldurl = window.localStorage.getItem('oldUrl') || '';
        let isClear = false;

        if (oldurl.includes('mock') != location.href.includes('mock')) {
            isClear = true;
            window.localStorage.setItem('oldUrl', location.href);
        } 
        
        if (isClear) {
            window.localStorage.setItem('db', '{}');
        }

        window.db = {};
        let olddb = window.localStorage.getItem('db') || '{}';
        olddb = JSON.parse(olddb);

        for (var i in config) {
            var match = false;
            for (var k in olddb) {
                if (k === i) {
                    match = true;
                }
            }

            let list = [];
            if (match) {
                list = olddb[i].items;
            }
            window.db[i] = new Collection(i, list);
        }
    }

    /**
     * [setCollectionI18n 设置集合国际化]
     * @param  {[type]} i18n [国际化]
     * @return {[type]}         [description]
     */
    setCollectionI18n(i18n) {
        // 设置集合国际化
        window.collectionI18n = i18n || 'en';
    }
}
