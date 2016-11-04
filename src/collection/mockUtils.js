import Mock from '../config/mock.conf.js';

export default class MockUtils {

    // mock数据 长度级别
    // 一级mock数据，较正常
    static level_1 = 'level_1';
    // 二级mock数据，较长
    static level_2 = 'level_2';
    // 三级mock数据，非常长
    static level_3 = 'level_3';
    // mock数据长度级别
    static mockLevel = (() => {
        // 获得当前浏览器url
        let href = location.href;

        // 如果url包含mock
        if (href.includes('mock')) {
            // mock级别开始索引
            let start = href.indexOf('mock') + 5;
            // mock级别结束索引
            let end = href.indexOf('&', start);
            // 如果结束索引无效，则为url长度
            if (end < 0) {
                // 设置为url长度
                end = href.length;
            }
            // 返回mock级别，如无规定，则返回级别一
            return href.substring(start, end) || MockUtils.level_1;
        }
    })();

    /**
     * [getKeyItems 获得对象key]
     * @param  {[type]} obj [对象]
     * @return {[type]}         [description]
     */
    static getKeyItems(obj) {
        // 初始对象key数组
        let tmpArr = [];
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
    static mockUUID(obj, mockStr, sp) {
        if (typeof(obj) === 'object') {
            // 获取需要uuid的主键
            let key = MockUtils.getKeyItems(obj)[0];
            // 获取主键长度
            let len = obj[key].length || 32;
            // 随机数（默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1）
            let $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
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
    static createMockContent(ret, fields) {
        // 赋值操作返回对象
        let obj = JSON.parse(JSON.stringify(ret));
        // 如果返回配置是对象
        if (typeof(obj) === 'object') {
            // 获取操作返回key数组
            let attrArr = MockUtils.getKeyItems(obj);
            // 长度级别数组
            let levelArr = Mock[MockUtils.mockLevel] || Mock[MockUtils.level_1];

            // 遍历
            attrArr.forEach((key, i) => {
                // 如果字段是数组
                if ($.isArray(obj[key])) {
                    // 返回数组
                    let valArr = [];
                    // 数组随机长度
                    let len = MockUtils.getRandomlength(levelArr.array);

                    if (typeof(obj[key][0]) === 'object') {
                        // 遍历
                        for (var n = 0; n < len; n++) {
                            // 初始对象
                            let temp = {};
                            // 遍历
                            for (var m in obj[key][0]) {
                                // 数组内对象
                                temp = $.extend(temp, {
                                    [m]: MockUtils.getItemValue(fields[m], levelArr)
                                });

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

            return obj;
        }
    }

    /**
     * [getItemValue 根据类型返回相应值]
     * @param {[type]} type [类型]
     * @param {[type]} levelArr [长度级别数组]
     */
    static getItemValue(type, levelArr) {
        // 返回变量
        let value = '';

        if (type === 'string') {
            // 国际化
            let i18n = window.collectionI18n;
            // 获取随机长度字符串
            value = MockUtils.getSpecialItem(i18n, levelArr[i18n]);
        } else if (type === 'int') {
            // 随机长度数字
            value = MockUtils.getSpecialItem('int', levelArr['int']);
        } else if (type === 'money') {
            // 随机长度整数
            let integer = MockUtils.getSpecialItem('int', levelArr['int']);
            // 浮点数，两小数位
            value = parseFloat(integer / 100).toFixed(2);
        } else if (type === 'time') {
            // 时间戳
            value = new Date().getTime();
        } else if ($.isArray(type)) {
            let k = Math.floor(Math.random() * type.length);
            value = type[k];
        }

        return value;
    }

    /**
     * [getRandomlength 根据数组返回随机的长度]
     * @param {[type]} level [级别数组]
     */
    static getRandomlength(level) {
        // 判断有级别
        if (level && level.length == 2) {
            // 范围
            let range = level[1] - level[0] + 1;
            // 随机数
            let rand = Math.random();
            // 返回级别范围内的长度
            return (level[0] + Math.round(rand * range));
        }
    }

    /**
     * [getRandomString 随机生成一个指定长度的字符串]
     * @param  {[type]} obj [操作返回对象]
     * @return {[type]}   [description]
     */
    static getRandomString(len, chars) {
        // 随机数长度
        let maxPos = chars.length;　　

        // 字符串
        let str = '';　
        for (let i = 0; i < len; i++) {
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
    static getSpecialItem(type, level) {
        if (type && level) {
            if (type == 'int') {
                // 获取此类型随机长度
                let len = MockUtils.getRandomlength(level);
                // 随机数
                let $ints = '0123456789';
                // 返回随机字符串
                return parseInt(MockUtils.getRandomString(len, $ints));
            } else if (type == 'en') {
                // 初始返回字符串
                let str = '';
                // 获取此类型随机长度
                let len = MockUtils.getRandomlength(level);
                // 随机数（默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1）
                let $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
                // 返回随机字符串
                return MockUtils.getRandomString(len, $chars);
            } else if (type == 'zh') {
                // 编码区间数组
                let arr = new Array();
                // 获取此类型随机长度
                let length = MockUtils.getRandomlength(level);
                // 遍历
                for (var i = 0; i < length; i++) {
                    // 元素赋值为汉字对应编码区间值
                    arr[i] = Math.round(Math.random() * 20927) + 19968;
                }

                // 汉字数组
                let arr1 = new Array();
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
}
