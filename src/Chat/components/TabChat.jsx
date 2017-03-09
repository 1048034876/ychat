import React, { Component, PropTypes } from 'react';
import { Icon, Tabs, Popconfirm } from 'antd';
import ChatRoom from './ChatRoom';
const TabPane = Tabs.TabPane;

class TabChat extends Component {
    
		static defaultProps = {
			onChange: () => {},
			onClose: () => {},
			activeKey: '',
			onEdit: () => {},
			onCloseRoom: () => {},
			current: undefined,
			onSend: () => {},
			rooms: {}
		}

		constructor(props) {
			super(props);
			this.state = {

			}
		}

		renderRooms = () => {
			const { rooms, current, onCloseRoom, onSend } = this.props;
			let list = [];
			for(let id in rooms) {
				let room = rooms[id];
				const { target } = room;
				const item = (
					<TabPane tab={room.target.name} key={id}>
						<ChatRoom room={room} 
							current={current}
							onClose={() => onCloseRoom(id)} 
							onSend={(value) => onSend(value, id, target, current)}/>
					</TabPane>
				)
				list.push(item);
			}
    	return list;
		}

		renderOperations = () => {
			const { onClose } = this.props; 
			return (
				<div className='chats-icon-operations'>
					<a href="javascript:;" onClick={onClose} className='chats-icon-minus'><Icon type="minus" /></a>
					<Popconfirm title="确定要关闭所以聊天窗口?" onConfirm={() => {}} onCancel={() => {}} okText="确定" cancelText="取消">
						<a href="javascript:;" className='chats-icon-close'><Icon type="close" /></a>
					</Popconfirm>
				</div>
			)
		}

    render() {
			const { onChange,	onClose,	activeKey,	onEdit } = this.props;
			return (
				<div className='chats' id="chats">
					<Tabs
						hideAdd
						onChange={onChange}
						activeKey={activeKey}
						type="editable-card"
						onEdit={onEdit}
						tabBarExtraContent={this.renderOperations()}
					>
							{
									this.renderRooms()
							}
					</Tabs>
				</div>
			)
    }
}

TabChat.propTypes = {
	onChange: PropTypes.func,
	onClose: PropTypes.func,
	activeKey: PropTypes.string,
	onEdit: PropTypes.func,
	onSend: PropTypes.func,
	onCloseRoom: PropTypes.func,
	current: PropTypes.object,
	rooms: PropTypes.object
}

export default TabChat;