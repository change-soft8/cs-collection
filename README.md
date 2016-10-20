# cs-collection
集合组件

Install

Npm: npm install cs-collection




Use

1.配置文件

在开始介绍如何使用集合组件前，需要先配置一些集合对象文件，这是至关重要的一步。

拿demo为例：/demo

/demo/config就是集合对象文件存放的目录。

1) config.js是总文件，把集合对象集中在此文件中。

import Project from './project.conf.js';
//...
export default {
    "project": Project,
    //...
}

2) project.conf.js是一个集合对象文件。开发者可根据自身项目需求，配置多个集合对象文件。



2.使用集合组件

1) 在入口文件中，引用配置文件、集合组件，New一个集合组件对象。

import Config from './config/config';
import Collection from 'cs-collection';

let collection = new Collection(Config, 'en', '{"time": 34,"code": "SUCCESS","message": "操作成功","entity": ""}');

此举是为了初始集合对象，生成window.db（集合操作都是围绕着window.db展开的）。

2) 使用集合方法：增删改查

	let project = window.db && window.db.project;

	查询单个：
	project.findOne({projectId:"8c8c8ca956e00caa0156e8be040400dc"});

	查询多个：
	project.find({projectManager:"沈佳芳"});

	新建：
	project.insert({projectName:"云澹澹，水悠悠", projectManager: "沈佳芳", projectIcon: "默认图片", projectNameShort:"sjzmd", projectCode:"wyqkk", projectNameSpace:"sjzmdqkk", projectDesc:"", commonFlag:"16001", fileListStr:{"inFile":[{"fileName":"item_logo_4.png","fileType":"60100","sysDefault":"0"}]}, importanceLevel:"41001", addTagName:{"addTagList":[]}});


	修改：
	project.update({projectId:"8c8c8ca956e00caa0156e8be040400dc", projectName:"云澹澹，水悠悠，一声横笛锁空楼"});

	删除：
	project.remove({projectId: "8c8c8ca956e00caa0156e8be040400dc"});

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
