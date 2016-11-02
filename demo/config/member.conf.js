/**
 * 项目实体配置
 */
export default {
    //查询多个
    "find": {
        // 查询集合，获取Url
        getUrl: (param) => {
            return `/v2/project/${param}/projectMember`;
        },
        //返回链
        "returnChain": "entity.retList",
        // 查询集合，mock数据结构
        "return": {
            "serviceResultCode": "",
            "accessToken": "",
            "retList": [{
                "loginName": "",
                "photoUrl": "",
                "roleId": "",
                "userId": "",
                "icon": "",
                "realName": "",
                "status": "",
                "statusName": "",
                "roleName": "",
                "skillsList": [""],
                "emails": [{"email": "","type": "","status": "","register": "","createUser": ""}],
                "mobiles": [{"mobile": "","type": "","status": "","register": "","createUser": ""}],
                "isExecutor": "",
                "isInvited": ""
            }]
        },
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
    // 实体相关配置
    "entity": {
        // 实体主键
        "primaryKey": "userId",
        // 过期
        "cacheTimeOut": 5184000,
        // 请求次数
        "requestNum": 1,
        // 实体字段配置，根据mock级别 + 数据类型 = mock属性长度
        "fields": {
            "userId": "string",
            "loginName": "string",
            "photoUrl": "string",
            "roleId": "string",
            "icon": "string",
            "realName": "string",
            "status": "string",
            "statusName": "int",
            "roleName": "string",
            "email": "string",
            "type": "string",
            "register": "string",
            "mobile": "string"
        }
    }
}
