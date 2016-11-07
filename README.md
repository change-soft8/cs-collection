# cs-collection  集合组件

##### 安装

---

```
npm install cs-collection
```


依赖插件
jquery，immutable，pubsub-js
可直接引用cdn

##### 使用

---

###### 1. 配置文件
在开始介绍如何使用集合组件前，需要先配置一些集合对象文件，这是至关重要的一步。
拿demo为例：/demo
/demo/config就是集合对象文件存放的目录。

- config.js是总文件，把集合对象集中在此文件中。
import Project from './project.conf.js';
import Member from './member.conf.js';
export default {
    "project": Project,
    "member": Member
}

-  project.conf.js是一个集合对象文件。开发者可根据自身项目需求，配置多个集合对象文件。

###### 2. 使用集合组件
-  在入口文件中，引用配置文件、集合插件，New一个集合对象。
import Config from './config/config';
import Collection from 'cs-collection';
let collection = new Collection(Config, 参数2, 参数3);

    参数2：可选。随机生成的mock国际化参数，目前支持'en','zh'
    
    参数3：可选。如果mock情况下没有return，也没有mockUrl，则通过这个参数传mock的json


此举是为了初始集合对象，生成window.db（集合对象操作都是围绕着window.db展开的）


-  给集合绑定widget组件，拿数据
    
```
let project = db && db.project;
let member = db && db.member;

let widget = project.bindWidget(Utils.uuid(), (key, data) => {
    //...
})

let memberW = member.bindWidget(Utils.uuid(), (key, data) => {
    //...
})

    
```
-  使用集合方法：增删改查
```
新增了widget组件概念

查询单个：
widget.findOne(参数1);
参数1：查询对象的主键，支持string格式，也支持object格式
示例1：widget.findOne("8c8c8ca956e00caa0156e8be040400dc");
示例2：widget.findOne({projectId:"8c8c8ca956e00caa0156e8be040400dc"});

查询多个：
widget.find(参数1, [参数2]);
参数1：查询参数，如果查询全部，传''；如果有查询条件，则以object形式传参，支持in查询器
参数2：可选，其他对象主键值。用以支持接口url中包含其他对象主键值。
示例1：widget.find({projectManager:"shenjiafang"});
示例2：memberW.find('', '8c8c8ca956e00caa0156e8be040400dc');

新建：
widget.insert(参数1);
参数1：新建对象参数
示例：widget.insert({projectName:"云澹澹，水悠悠", projectManager: "shenjiafang", projectNameShort:"sjzmd", projectCode:"wyqkk", projectNameSpace:"sjzmdqkk", commonFlag:"16001",importanceLevel:"41001"});

修改：
widget.update(参数1);
参数1：修改对象参数，参数格式为object，其中修改对象主键是此参数中必要键值对。
示例：widget.update({projectId:"8c8c8ca956e00caa0156e8be040400dc", projectName:"云澹澹，水悠悠，一声横笛锁空楼"});

删除：
widget.remove(参数1);
参数1：删除对象主键，支持string格式，也支持object格式
示例1：widget.remove("8c8c8ca956e00caa0156e8be040400dc");
示例2：widget.remove({projectId: "8c8c8ca956e00caa0156e8be040400dc"});
``` 

##### 3.mock数据

---

如需mock数据，首先需要在浏览器url加入mock，例如：http://localhost:3000?mock
其次以下二选一：
-  自己编写mock文件：编写相关mock文件，并在集合配置文件中配置相关集合操作的mockUrl
-  随机生成mock数据：直接在集合配置文件的集合操作中配置return，structure，storeParam

##### 4.特殊情况

---

-  find方法支持接口url中有其他对象主键
例如成员对象的主键为userId，项目成员的查询接口url为/v2/project/{projectId}/projectMember，url中间有项目对象的主键。此种情况，需要如下调用：
//假设我们已经配置好了成员对象文件

widget.find('', '8c8c8ca956e00caa0156e8be040400dc');

   这里第一个参数仍旧为查询项目成员的参数，第二个参数支持其他对象主键

-  没有配置mockUrl的随机mock情况
此情况下，返回的都是自动生成的数据，对于某些特殊自动就不太合适，比如图片。所以基于此，支持在实体相关配置中，用["", "", n..]格式拿到枚举值。


##### 5.配置文件说明：

---



```
export default {
    "findOne": { // 查询详情
        "include": ["", "", ..n], /* 此属性可配可不配 */
        // 包含的参数，则传过来的数据会进行刷选，只有包含在数组中的字段才会真正传到后台
        "exclusive": ["", ""], /* 此属性可配可不配 */
        // 不包含的参数，只有在include不存在时才会执行。与include相反，数组中的参数不会传给后台
        getUrl: (param, type) => {
            return // url..
        },
        "mockUrl": "", // 如果已有return，则此属性不起作用 /* mock情况下，可选择此属性*/
        "returnChain": "", // 返回链, 
        "return": {}, // 返回随机生成mock的数据 /* mock情况下，可选择此属性+属性2+属性3 */
        "structure": {}, // 返回随机生成mock数据结构 /* 属性2 */
        "storeParam": "", // 返回随机生成mock数据的存放位置 /* 属性3 */
    },
    "find": { // 查询
        // .. 同上
    },
    "insert": { // 新增
        // .. 同上，出return可以规定主键长度
        "return": {
            "projectId": 32 // insert方法下，可直接规定主键长度，也可给值，按值的长度随机生成
        }
    },
    "update": { //修改
        // .. 同上
    },
    "remove": { //删除
        // .. 同上
    },
    "entity": { // 实体相关配置
        "primaryKey": "", // 实体主键
        "cacheTimeOut": 10000, // 过期时间
        "requestNum": 2, // 请求次数
        "fields": { // 实体字段配置，根据上面设置的mock + 数据类型 + 数据长度 = 随机mock数据
            "字段1": "string", // 此字段自动生成的mock数据是字符类型
            "字段2": ["图片1", "图片2"], // 此字段自动生成的mock数据是从数组中随机拿的元素
            "字段3": "int", // 此字段自动生成的mock数据是数字类型
            "字段4": "time", // 此字段自动生成的mock数据是时间戳
            "字段5": "money" // 此字段自动生成的mock数据是金额（例如99.00）
        }
    }
}
```

