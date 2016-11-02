# cs-collection
集合组件

Install

Npm: npm install cs-collection




依赖插件

jquery，immutable，pubsub-js

可直接引用cdn
<script type="text/javascript" src="http://cdn.bootcss.com/jquery/2.2.4/jquery.min.js"></script>
<script type="text/javascript" src="http://cdn.bootcss.com/immutable/3.8.1/immutable.min.js"></script>
<script type="text/javascript" src="http://cdn.bootcss.com/pubsub-js/1.5.3/pubsub.min.js"></script>




Use

1.配置文件

在开始介绍如何使用集合组件前，需要先配置一些集合对象文件，这是至关重要的一步。

拿demo为例：/demo

/demo/config就是集合对象文件存放的目录。

1) config.js是总文件，把集合对象集中在此文件中。

import Project from './project.conf.js';
import Member from './member.conf.js';

export default {
    "project": Project,
    "member": Member
}

2) project.conf.js是一个集合对象文件。开发者可根据自身项目需求，配置多个集合对象文件。



2.使用集合组件

1) 在入口文件中，引用配置文件、集合组件，New一个集合组件对象。

import Config from './config/config';
import Collection from 'cs-collection';

let collection = new Collection(Config, 'en', '{"time": 34,"code": "SUCCESS","message": "操作成功","entity": ""}');

此举是为了初始集合对象，生成window.db（集合对象操作都是围绕着window.db展开的）。

2) 使用集合方法：增删改查

	let project = window.db && window.db.project;
    let member = window.db && window.db.member;

	查询单个：
    project.findOne(参数1);
    
    参数1：查询对象的主键，支持string格式，也支持object格式

    示例1：project.findOne("8c8c8ca956e00caa0156e8be040400dc");
    示例2：project.findOne({projectId:"8c8c8ca956e00caa0156e8be040400dc"});


	查询多个：
    project.find(参数1, [参数2]);

    参数1：查询参数，如果查询全部，传''；如果有查询条件，则以object形式传参，支持in查询器
    参数2：可选，其他对象主键值。用以支持接口url中包含其他对象主键值。

	示例1：project.find({projectManager:"沈佳芳"});
    示例2：member.find('', '8c8c8ca956e00caa0156e8be040400dc');


	新建：
    project.insert(参数1);

    参数1：新建对象参数

	示例：project.insert({projectName:"云澹澹，水悠悠", projectManager: "沈佳芳", projectIcon: "默认图片", projectNameShort:"sjzmd", projectCode:"wyqkk", projectNameSpace:"sjzmdqkk", projectDesc:"", commonFlag:"16001", fileListStr:{"inFile":[{"fileName":"item_logo_4.png","fileType":"60100","sysDefault":"0"}]}, importanceLevel:"41001", addTagName:{"addTagList":[]}});


	修改：
    project.update(参数1);

    参数1：修改对象参数，参数格式为object，其中修改对象主键是此参数中必要键值对。

	示例：project.update({projectId:"8c8c8ca956e00caa0156e8be040400dc", projectName:"云澹澹，水悠悠，一声横笛锁空楼"});


	删除：
    project.remove(参数1);

    参数1：删除对象主键，支持string格式，也支持object格式

    示例1：project.remove("8c8c8ca956e00caa0156e8be040400dc");
	示例2：project.remove({projectId: "8c8c8ca956e00caa0156e8be040400dc"});

3) 订阅事件，拿到数据

	查询单个订阅事件：
	project.pubsub('findOne', (key, data) => {
    	//...
    })

    查询多个订阅事件：
    project.pubsub('find', (key, data) => {
    	//...
    })

    新建订阅事件：
    project.pubsub('insert', (key, data) => {
    	//...
    })

    修改订阅事件：
    project.pubsub('update', (key, data) => {
    	//...
    })

    删除订阅事件：
    project.pubsub('remove', (key, data) => {
    	//...
    })



3.特殊情况

1) find方法支持接口url中有其他对象主键。

例如成员对象的主键为userId，项目成员的查询接口url为/v2/project/{projectId}/projectMember，url中间有项目对象的主键。此种情况，需要如下调用：

//假设我们已经配置好了成员对象文件
let member = window.db && window.db.member;
member.find('', '8c8c8ca956e00caa0156e8be040400dc');

这里第一个参数仍旧为查询项目成员的参数，第二个参数支持其他对象主键
