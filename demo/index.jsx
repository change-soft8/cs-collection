import React from 'react';
import { render } from 'react-dom'
import Utils from '../src/collection/collection-utils';
import Config from './config/config';
import Local from '../build/localstorage';

class App extends React.Component { 
	constructor(props) {
        super(props);
        this.state = {items: []}
    }

	static getPubsub = ((colName, p) => {
		let local = new Local(Config, 'en', '{"time": 34,"code": "SUCCESS","message": "操作成功","entity": ""}');

        let project = window.db && window.db.project;

        project.pubsub('findOne', (key, data) => {
        	console.log('findOne ---------- ' + JSON.stringify(data) + ' ++++++++++ ' + Utils.isMap(data));
        	//this.setState({items: data});
        })

        project.pubsub('find', (key, data) => {
        	console.log('find ---------- ' + JSON.stringify(data) + ' ++++++++++ ' + Utils.isList(data));
        	//this.setState({items: data});
        })

        project.pubsub('insert', (key, data) => {
        	console.log('insert ---------- ' + JSON.stringify(data) + ' ++++++++++ ' + Utils.isMap(data));
        })

        project.pubsub('update', (key, data) => {
        	console.log('update ---------- ' + JSON.stringify(data) + ' ++++++++++ ' + Utils.isMap(data));
        })

        project.pubsub('remove', (key, data) => {
        	console.log('remove ---------- ' + JSON.stringify(data) + ' ++++++++++ ' + Utils.isMap(data));
        })
    })();

	handleQuery() {
		let project = window.db && window.db.project;
		project.findOne({projectId:"8c8c8ca956e00caa0156e8be040400dc"});
		console.log(this.state+"---");
		console.log(window.localStorage.getItem('db'));
	}

	handleQueryMore() {
		let project = window.db && window.db.project;
		project.find({searchStr:"1"});
		
		console.log(window.localStorage.getItem('db'));
	}

	handleAdd() {
		let project = window.db && window.db.project;
		project.insert({projectName:"云澹澹，水悠悠", projectNameShort:"sjzmd", projectCode:"wyqkk", projectNameSpace:"sjzmdqkk", projectDesc:"", commonFlag:"16001", fileListStr:{"inFile":[{"fileName":"item_logo_4.png","fileType":"60100","sysDefault":"0"}]}, importanceLevel:"41001", addTagName:{"addTagList":[]}});
		
		console.log(window.localStorage.getItem('db'));
	}

	handleUpdate() {
		let project = window.db && window.db.project;
		project.update({projectId:"8c8c8ca956e00caa0156e8be040400dc", projectName:"云澹澹，水悠悠，一声横笛锁空楼"});
		
		console.log(window.localStorage.getItem('db'));
	}

	handleDetele() {
		let project = window.db && window.db.project;
		project.remove({projectId:"8c8c8ca956e00caa0156e8be040400dc"});
		
		console.log(window.localStorage.getItem('db'));
	}

	loginOut() {
		window.location.href = 'http://www.baidu.com';

		let project = window.db && window.db.project;
		project.unsubscribe('findOne');
		project.unsubscribe('find');
		project.unsubscribe('insert');
		project.unsubscribe('update');
		project.unsubscribe('remove');
	}

	render() {
		return (
			<div>
				<div>
					<input/>
					<button onClick={this.handleQuery.bind(this)}>查询</button>
					<button onClick={this.handleQueryMore}>多个查询</button>
					<button onClick={this.handleAdd}>新建</button>
					<button onClick={this.handleUpdate}>更改</button>
					<button onClick={this.handleDetele}>删除</button>
					<button onClick={this.loginOut}>跳往百度</button>
				</div>
				<br/>
				<div>
					<table width="100%">
						<thead>
							<tr>
								<th width="30%">项目编号</th>
								<th width="30%">项目名称</th>
								<th width="20%">项目经理</th>
								<th width="20%">项目图片</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		)
	}	
}

render(<App />, document.getElementById('index-container'));
