import React from 'react';
import { render } from 'react-dom';
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

        this.state.findOneWidget = project.bindWidget(Utils.uuid(), (key, data) => {
        	this.setState({items: data, colName: '查询单个'});
        })

        this.state.findWidget = project.bindWidget(Utils.uuid(), (key, data) => {
        	this.setState({items: data, colName: '查询多个'});
        })

        this.state.insertWidget = project.bindWidget(Utils.uuid(), (key, data) => {
        	this.setState({items: data, colName: '新建'});
        })

        this.state.updateWidget = project.bindWidget(Utils.uuid(), (key, data) => {
        	this.setState({items: data, colName: '修改（为了测试，修改的数据为第一条数据）'});
        })

        this.state.removeWidget = project.bindWidget(Utils.uuid(), (key, data) => {
        	this.setState({items: data, colName: '删除（为了测试，删除的数据为第一条数据）'});
        })
    }

	handleQuery() {
		let findW = this.state.findOneWidget;
		findW.findOne({projectId:"8c8c8ca956e00caa0156e8be040400dc"});
	}

	handleQueryMore() {
		this.state.findWidget.find({projectManager:"shenjiafang"});
	}

	handleAdd() {
		this.state.insertWidget.insert({projectName:"云澹澹，水悠悠", projectManager: "shenjiafang", projectIcon: "默认图片", projectNameShort:"sjzmd", projectCode:"wyqkk", projectNameSpace:"sjzmdqkk", projectDesc:"", commonFlag:"16001", fileListStr:{"inFile":[{"fileName":"item_logo_4.png","fileType":"60100","sysDefault":"0"}]}, importanceLevel:"41001", addTagName:{"addTagList":[]}});
	}

	handleUpdate() {
		let id = db.project.items.first() && db.project.items.first().projectId;
		this.state.updateWidget.update({projectId:id, projectName:"云澹澹，水悠悠，一声横笛锁空楼"});
	}

	handleDetele() {
		let id = db.project.items.first() && db.project.items.first().projectId;
		this.state.removeWidget.remove({projectId: id});
	}

	loginOut() {
		this.state.findOneWidget.unsubscribe();
		this.state.findWidget.unsubscribe();
		this.state.insertWidget.unsubscribe();
		this.state.updateWidget.unsubscribe();
		this.state.removeWidget.unsubscribe();

		window.location.href = 'http://www.baidu.com';
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
					<button className="blue_button" onClick={this.handleQueryMore.bind(this)}>多个查询</button>
					<button className="blue_button" onClick={this.handleAdd.bind(this)}>新建</button>
					<button className="blue_button" onClick={this.handleUpdate.bind(this)}>修改</button>
					<button className="blue_button" onClick={this.handleDetele.bind(this)}>删除</button>
					<button className="blue_button" onClick={this.loginOut.bind(this)}>跳往百度</button>
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
