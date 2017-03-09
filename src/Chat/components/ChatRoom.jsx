import React, { Component, PropTypes } from 'react';
import { Row, Col, Icon, Button, Input } from 'antd';

import ChatMessage from './ChatMessage';

import styles from './chatRoom.css';

class ChatRoom extends Component {

  static defaultProps = {
      onClose: () => {},
      room: {},
      onSend: () => {},
      current: {},
  }

  constructor(props) {
    super(props);
    const { room } = props;
    const { messages } = room;
    this.state = {
      value: '',
			messages,
    }

		this.changeMessage = this.changeMessage.bind(this);
		this.sendMessage = this.sendMessage.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  componentDidMount() {
    this.chatMessageEle = document.getElementById('chat-message');
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      messages: nextProps.room.messages
    }, () => {
      this.chatMessageEle.scrollTop = this.chatMessageEle.scrollHeight;
    })
  }
  
	changeMessage(e) {
		this.setState({value: e.target.value});
	}
  
  sendMessage() {
		const { value } = this.state;
    const { room, onSend } = this.props;
    const { current, target } = room;
    if (value === '') return false;
    onSend(value);
    this.setState({value: ''});
  }

  onClose() {
    const { onClose } = this.props;
    onClose();
  }

  onOpen() {
    const { onOpen } = this.props;
    onOpen();
  }

  render() { 
    const { messages } = this.state;
    const { room, current, onOpen, onClose } = this.props;
    const { target } = room;
    return (
      <div className='chat-house' id="chat-house">
        {/*<div className='chat-header'>
          <Row>
            <Col span={20} className='chat-title'>{`与【${targetName}】聊天中`}</Col>
            <Col span={4} style={{textAlign: 'right'}}>
              <Icon type="close" className='chat-close-icon' onClick={this.onClose}/>
            </Col>
          </Row>
        </div>*/}
        <div className='chat-body'>
          <div className='chat-messages' id="chat-message">
          {
            messages.map((item, index) => {
              return <ChatMessage key={index} message={item} 
                       user={item.userId == current.id ? current : target} 
                       float={item.userId == current.id ? 'right': 'left'}/>   
            })
          }
          </div>
        </div>
        <div className='chat-footer'>
          <div className='chat-input-group'>
					<Input type='textarea' className='chat-input' value={this.state.value} size="large" 
            placeholder="请输入消息" 
            onChange={this.changeMessage}
            onKeyDown={(e) => {
              if (e && e.keyCode == 13) {
                e.preventDefault();
                this.sendMessage();
              }
            }}
          />
          <Button type="primary" className='chat-submit' onClick={this.sendMessage}>发送</Button>
          </div>
        </div>
      </div>      
    );
  }
}

ChatRoom.propTypes = {
};

export default ChatRoom;