import React, { Component } from 'react';
import { Icon, Popconfirm } from 'antd';
import io from 'socket.io-client';
import TabChat from './TabChat';
import ChatHelper from './ChatHelper';
import ChatActions from '../actions/ChatActions.js';
import constants from '../actions/constants';
import styles from './index.css';
import { ip, port, chat_port } from '../../constants';


const chatActions = new ChatActions();

let reconnection_times = 0;
class Chat extends Component {

  static defaultProps = {
      onClose: () => {},
      onChange: () => {},
      socket: {},
      show: false,
      ip: 'localhost',
      port: '8888',
      current: {
        id: '1',
        name: '熊大',
        photo: ''
      },
      rooms: {
				roomId: {
          messages: [
            {
                userId: 1, 
                content: '123123', 
                isRead: 0,
                sendStatus: constants.sendStatus.SUCCESSED
            }
          ],
          target: {
              id: 2,
              name: '熊二',
              photo: '/assets/upload/images/chh1.jpg',
          },
          show: false
        },
        '12312': {
          messages: [
            {
                userId: 1, 
                content: 'qq', 
                isRead: 0,
                sendStatus: constants.sendStatus.SUCCESSED
            }
          ],
          target: {
              id: 3,
              name: '熊三',
              photo: '/assets/upload/images/chh1.jpg',
          },
          show: false
        },
        '3333': {
          messages: [
            {
                userId: 1, 
                content: '3333', 
                isRead: 0,
                sendStatus: constants.sendStatus.SUCCESSED
            }
          ],
          target: {
              id: 4,
              name: '熊四',
              photo: '/assets/upload/images/chh1.jpg',
          },
          show: false
        },
      },
  }

  constructor(props) {
    super(props);
    const { show, current, rooms } = props;
    this.state = {
      socket: undefined,
			showType: constants.showType.HIDE,
      show,
			activeKey: 'roomId',
      current,
			rooms,
			connectionState: constants.connectionState.NOT_CONNECTED,
    }
  }

  
	sendMessage(payload) {
    let { from, to, message, user } = payload; 
    message.userId = user.id;
    this.changeState('addMessage', message, () => {
      this.state.socket.emit('request', from, to, message);
    });
  }

  componentDidMount() {
    //$('#chats').draggable();
     this.connectServer();
  }

  componentWillReceiveProps(nextProps) {
    
  }

  setStateAsync = (state) => {
    return new Promise((resolve) => {
      this.setState(state, resolve)
    });
  }

  connectServer = () => {

		const { rooms } = this.state;
    const { ip, port, current } = this.props;
		
    this.setState({connectionState: constants.connectionState.CONNECTING})

		const currentSocket = io.connect(`${ip}:${port}`);
		currentSocket.on('connect', () => {
			console.log('聊天服务器连接成功')

      this.setState({
        socket: currentSocket,
        connectionState: constants.connectionState.CONNECTED
      })

			currentSocket.emit('init', current);

			currentSocket.removeListener('response');
			currentSocket.on('response', (msg) => {
				let room;
				let roomId = msg.roomId;
				if (rooms[roomId]) {
					room = rooms[roomId];
				} else {
					room = {
            messages: [],
            target: msg.user,
            show: false
          };
					rooms[roomId] = room;
				}

				let messages = rooms[roomId]['messages'];
				/**
				 * 根据有没index判断是否是自己发送的信息来确定是否发送成功，改变发送状态
				 */
				if (msg.index >= 0) {
          this.changeState('sendSuccessed', {
            messages,
            roomId,
            index: msg.index
          });
				} else { //接收到别人发送的消息时的处理
          this.changeState('pushMessage', {
            message: {
              roomId: msg.roomId, 
              content: msg.content,
              isRead: 0,
            },
            roomId,
          })
				}
			});
		});
    currentSocket.on('connect_failed', () => {
      console.log('connect_failed')
      this.setState({connectionState: constants.connectionState.NOT_CONNECTED});
    });
    currentSocket.on('reconnect_failed', () => {
      console.log('reconnect_failed')
    });
    currentSocket.on('reconnecting', () => {
      reconnection_times ++;
      if (reconnection_times > 1) {
        reconnection_times = 0;
        currentSocket.disconnect();
        this.setState({connectionState: constants.connectionState.NOT_CONNECTED});
      }
    });
    currentSocket.on('reconnect', () => {
      console.log('reconnect')
    });
    currentSocket.on('disconnect', () => {
			console.log('disconnect');
		})
		currentSocket.on('error', (error) => {
			currentSocket.disconnect();
			console.log(error, '连接服务器出错');
		})
	}
  
  changeState = (methodName, payload, callback) => {
    if (!chatActions[methodName]) throw new Error(`${methodName} is not a function`);
    this.setState(chatActions[methodName](this.state, payload), callback);
  }

  onClose = () => {
    const { onClose } = this.props;
    this.setState({show: false});
    onClose();
  }

  onOpen = () => {
    const { onOpen } = this.props;
    onOpen();
  }

  onChange = (activeKey) => {
    const { onChange } = this.props;
    onChange(activeKey);
    this.setState({activeKey});
  }

  onEdit = (activeKey, action) => {
    if (action === 'remove') {
      this.changeState('removeRoom', activeKey);
    }
  }

  onCloseRoom = (id) => {
    this.changeState('removeRoom', id);
  }

  onSend = (value, id, target, current) => {
    this.sendMessage({
      from: current.id,
      to: target.id,
      message: {
        roomId: id,
        content: value
      },
      user: current
    })
  }

  render() { 
    const { rooms, current, activeKey, show, connectionState } = this.state;
    const { style, chatHelperStyle } = this.props;

    return (
      <div style={style}>
        {
          show ? 
          <TabChat
            className='chats' id="chats"
            onChange={this.onChange}
            onClose={this.onClose}
            activeKey={activeKey}
            onEdit={this.onEdit}
            current={current}
            rooms={rooms}
            onSend={this.onSend}
            onCloseRoom={this.onCloseRoom}
          ></TabChat>
          :
          ''
        }
        <ChatHelper 
          style={chatHelperStyle}
          connectionState={connectionState}
          onClick={() => {
            this.setState({show: !show});
          }} 
          onReload={() => {
            this.connectServer();
          }}
          onLoading={() => {
            console.log('重连中');
          }}
        ></ChatHelper>
      </div>    
    );
  }
}

Chat.propTypes = {
};

export default Chat;