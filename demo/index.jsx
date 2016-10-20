import React from 'react';
import { render } from 'react-dom';
import { Map, List } from 'immutable';
import Utils from '../src/collection/collection-utils';
import Config from './config/config';
/*import Local from '../build/localstorage';*/
import Local from '../src/localstorage';

class App extends React.Component { 
	constructor(props) {
        super(props);
        this.state = {items: '', colName: '操作名称'};

        let local = new Local(Config, 'en', '{"time": 34,"code": "SUCCESS","message": "操作成功","entity": ""}');

        let project = window.db && window.db.project;

        project.pubsub('findOne', (key, data) => {
        	console.log('findOne ---------- ' + JSON.stringify(data) + ' ++++++++++ ' + Utils.isMap(data));
        	this.setState({items: data, colName: '查询单个'});
        })

        project.pubsub('find', (key, data) => {
        	console.log('find ---------- ' + JSON.stringify(data) + ' ++++++++++ ' + Utils.isList(data));
        	this.setState({items: data, colName: '查询多个'});
        })

        project.pubsub('insert', (key, data) => {
        	console.log('insert ---------- ' + JSON.stringify(data) + ' ++++++++++ ' + Utils.isMap(data));
        	this.setState({items: data, colName: '新建'});
        })

        project.pubsub('update', (key, data) => {
        	console.log('update ---------- ' + JSON.stringify(data) + ' ++++++++++ ' + Utils.isMap(data));
        	this.setState({items: data, colName: '修改（为了测试，修改的数据为第一条数据）'});
        })

        project.pubsub('remove', (key, data) => {
        	console.log('remove ---------- ' + JSON.stringify(data) + ' ++++++++++ ' + Utils.isMap(data));
        	this.setState({items: data, colName: '删除（为了测试，删除的数据为第一条数据）'});
        })
    }

	handleQuery() {
		let project = window.db && window.db.project;
		project.findOne({projectId:"8c8c8ca956e00caa0156e8be040400dc"});
		console.log(window.localStorage.getItem('db'));
	}

	handleQueryMore() {
		let project = window.db && window.db.project;
		project.find({projectId:"8c8c8ca9543dbb2901544b98df3d0963"});
		
		console.log(window.localStorage.getItem('db'));
	}

	handleAdd() {
		let project = window.db && window.db.project;
		project.insert({projectName:"云澹澹，水悠悠", projectManager: "沈佳芳", projectIcon: "默认图片", projectNameShort:"sjzmd", projectCode:"wyqkk", projectNameSpace:"sjzmdqkk", projectDesc:"", commonFlag:"16001", fileListStr:{"inFile":[{"fileName":"item_logo_4.png","fileType":"60100","sysDefault":"0"}]}, importanceLevel:"41001", addTagName:{"addTagList":[]}});
		
		console.log(window.localStorage.getItem('db'));
	}

	handleUpdate() {
		let project = window.db && window.db.project;
		let id = project.items && project.items.first().projectId;
		project.update({projectId:id, projectName:"云澹澹，水悠悠，一声横笛锁空楼"});
		
		console.log(window.localStorage.getItem('db'));
	}

	handleDetele() {
		let project = window.db && window.db.project;
		let id = project.items && project.items.first().projectId;
		project.remove({projectId: id});
		
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
		let items = this.state.items;

		if(items && items.size > 1) {
			if (this.state.colName == '查询多个') {
				var itemLists = items.map((item, i) => {
            		return [<tr><td>{item.projectId}</td><td>{item.projectName}</td><td>{item.projectManager}</td><td>{item.projectIcon}</td></tr>];
        		})
			} else {
				var itemLists = <tr><td>{items.get('projectId')}</td><td>{items.get('projectName')}</td><td>{items.get('projectManager')}</td><td>{items.get('projectIcon')}</td></tr>;
			}
			
		}

		var blue_button = {
            background: '#2db7f5',
		    border: '0px',
		    padding: '3px 15px',
		    borderRadius: '3px',
		    color: '#fff',
		    marginRight: '10px'
        };

		return (
			<div style={{fontFamily: '微软雅黑'}}>
				<div>
					<button style={blue_button} onClick={this.handleQuery.bind(this)}>查询</button>
					<button className="blue_button" onClick={this.handleQueryMore}>多个查询</button>
					<button className="blue_button" onClick={this.handleAdd}>新建</button>
					<button className="blue_button" onClick={this.handleUpdate}>修改</button>
					<button className="blue_button" onClick={this.handleDetele}>删除</button>
					<button className="blue_button" onClick={this.loginOut}>跳往百度</button>
				</div>
				<br/>
				<div>
					<label style={{fontSize: 15}}>目前操作：{this.state.colName && this.state.colName}</label>
					<table width="100%" style={{fontSize:13, marginTop:10}}>
						<thead>
							<tr>
								<th>项目编号</th>
								<th>项目名称</th>
								<th>项目经理</th>
								<th>项目图片</th>
							</tr>
						</thead>
						<tbody style={{fontSize: 12}}>{itemLists}</tbody>
					</table>
				</div>
			</div>
		)
	}	
}

render(<App />, document.getElementById('index-container'));
