import React, { Component, PropTypes } from 'react';
import { Row, Col, Icon } from 'antd';

import styles from './chatMessage.css';
import constants from '../actions/constants';

class Chat extends Component {

  static defaultProps = {
      message: {},
      user: {},
      float: 'right',
  }

  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  //<Icon className={`icon-messageStatus-${float} successed`} type="check" />
  renderMessageStatus(status, float) {
    switch (status) {
      case constants.sendStatus.SENDING:
        return <Icon className={`icon-messageStatus-${float}`} type="loading" />;
      case constants.sendStatus.SUCCESSED:
        return '';
      case constants.sendStatus.FAILED:
        return <Icon className={`icon-messageStatus-${float} failed`} type="close" />;
      default:
        return '';
    }
  }

  renderLeftMessage() {
    const { message, user } = this.props;
    return (
      <Row className={`chat-message-left`} type="flex" align="top" justify='start'>
        <Col className='chat-message-photo' span={1}>
            <img src={ `${user.photo}` || '/src/assets/images/chh4.jpg'} alt="暂无头像"/>
          </Col>
        <Col className='chat-message-text' span={22}>
          <div className='chat-message-text-group'>
            <pre className="chat-message-content">{message.content}</pre>
            {
              this.renderMessageStatus(message.sendStatus, 'left')
            }
          </div>
        </Col>
      </Row>
    )
  }

  renderRightMessage() {
    const { message, user } = this.props;
    return (
      <Row className={`chat-message-right`} type="flex" align="top" justify='end'>
        <Col className='chat-message-text' span={22}>
          <div className='chat-message-text-group'>
            {
              this.renderMessageStatus(message.sendStatus, 'right')
            }
            <pre className="chat-message-content">{message.content}</pre>
          </div>
        </Col>
        <Col className='chat-message-photo' span={1}>
            <img src={ `${user.photo}` || '/src/assets/images/chh4.jpg'} alt="暂无头像"/>
        </Col>
      </Row>
    )
  }

  render() { 
    const { float } = this.props;
    return float === 'left' ? this.renderLeftMessage() : this.renderRightMessage();
  }
}

Chat.propTypes = {
};

export default Chat;