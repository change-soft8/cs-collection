/**
 * 项目实体配置
 */
export default {
    //查询一个
    "findOne": {
        // 查询详情，获取Url
        getUrl: (param) => {
            return `/v2/project/${param}`
        },
        //返回链
        "returnChain": "entity.projectInfoList",
        // 查询详情，mock数据结构
        "return": {
            "projectInfoList": [{
                "projectId": "8c8c8ca956e00caa0156e8be040400dd",
                "projectName": "来，跟我一起说：耶~",
                "projectManager": "沈佳芳2233",
                "projectManagerIcon": "https://file.newtouch.com/yangyang/131d4e16-6509-47d0-a46b-21c39480b89d.png",
                "projectStatus": "14001",
                "projectImportanceLevel": "41001",
                "projectIcon": "https://file.newtouch.com/yangyang/item_logo_4.png",
                "projectTagList": [{
                    "tagId": "wherwjfpwp1",
                    "systemFlag": "12"
                }],
                "projectMember": ['int'],
                "members": 1,
                "projectManagerLoginName": "shenjiafang",
                "projectNameSpace": "sjzmdqkk",
                "projectNameForShirt": "sjzmd",
                "projectCode": "wyqkk",
                "commonFlag": "16001"
            }],
            "closeProjectInfoList": [],
            "commonProjectInfoList": null,
            "regularProjectInfoList": null
        },
        /*//mock数据路径
        "mockUrl": "mock/findOne.json",*/
        // mock数据结构
        "structure": {
            "time": 64,
            "code": "SUCCESS",
            "message": "操作成功",
            "entity": ""
        },
        // 数据存放字段
        "storeParam": "entity"
    },
    //查询多个
    "find": {
        // 查询集合，获取Url
        getUrl: () => {
            return `v2/project/projectPage`;
        },
        //返回链
        "returnChain": "entity.projectInfoList",
        // 查询集合，mock数据结构
        "return": {
            "joinNum": "",
            "closeNum": "",
            "closeProjectInfoList": [{
                "projectId": "",
                "projectImportanceLevel": "",
                "commonFlag": "",
                "members": "",
                "projectCode": "",
                "projectIcon": "",
                "projectManager": "",
                "projectManagerIcon": "",
                "projectManagerLoginName": "",
                "projectName": "",
                "projectNameForShirt": "",
                "projectNameSpace": "",
                "projectStatus": "",
                "projectTagList": ""
            }],
            "projectInfoList": [{
                "projectId": "",
                "projectImportanceLevel": "",
                "commonFlag": "",
                "members": "",
                "projectCode": "",
                "projectIcon": "",
                "projectManager": "",
                "projectManagerIcon": "",
                "projectManagerLoginName": "",
                "projectName": "",
                "projectNameForShirt": "",
                "projectNameSpace": "",
                "projectStatus": "",
                "projectTagList": ""
            }]
        },
        /*//mock数据路径
        "mockUrl": "mock/find.json",*/
        // mock数据结构
        "structure": {
            "time": 64,
            "code": "SUCCESS",
            "message": "操作成功",
            "entity": ""
        },
        // 生成的mock数据存放字段
        "storeParam": "entity"
    },
    //新增
    "insert": {
        //包含的参数，只要有include，持续层就会调用
        "include": ["projectName", "projectManager", "projectIcon", "projectNameShort", "projectCode", "projectNameSpace", "fileListStr", "importanceLevel"],
        //不包含的参数，可有可无，只有在include不存在时才会执行
        "exclusive": ["projectId", "projectName"],
        getUrl: (param) => {
            return `v2/project`;
        },
        // 查询详情，mock数据结构
        "return": {
            // 可直接规定长度，也可给值，按值的长度随机生成
            "projectId": 32
        }
    /*//mock数据路径
    "mockUrl": "mock/insert.json"*/
    },
    //修改
    "update": {
        //包含的参数，只要有include，持续层就会调用
        "include": ["projectId", "projectName"],
        //不包含的参数，可有可无，只有在include不存在时才会执行
        "exclusive": ["projectId", "projectName"],
        getUrl: (param) => {
            return `v2/project/${param}`;
        },
        //mock数据路径
        "mockUrl": "mock/success.json"
    },
    //删除
    "remove": {
        getUrl: (param) => {
            return `/v2/project/${param}`
        }
    /*,
            //mock数据路径
            "mockUrl": "mock/success.json"*/
    },
    // 过期
    "cacheTimeOut": 5184000,
    // 请求次数
    "requestNum": 5,
    // 实体字段配置，根据mock级别 + 数据类型 = mock属性长度

    "entity": {
        // 实体主键
        "primaryKey": "projectId",
        // 实体相关配置
        "fields": {
            "projectId": "string",
            "projectName": "string",
            "projectManager": "string",
            "projectManagerIcon": ["/v2/project/picture/item_logo_1.png?maxWidth=48&maxHeight=48", "/v2/project/picture/item_logo_2.png?maxWidth=48&maxHeight=48"],
            "projectStatus": "string",
            "projectImportanceLevel": ["41001", "41003", "41004"], //数组里面选取一个值
            "projectIcon": "string",
            "members": "int",
            "projectManagerLoginName": "string",
            "projectNameSpace": "string",
            "projectNameForShirt": "string",
            "projectCode": "string",
            "commonFlag": "string",
            "createTime": {
                "type": "time",
                "format": "yyyy-MM-dd" //时间格式
            },
            "endTime": "time", //默认时间格式为年-月-日，例如：2016-11-29
            "totalPrice": "money",
            "tagId": "string",
            "systemFlag": "int"
        }
    }
}
