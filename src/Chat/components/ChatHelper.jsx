import React, { Component, PropTypes } from 'react';
import { Row, Col, Icon, Button, Input } from 'antd';
import ChatActions from '../actions/ChatActions';
import styles from './chatHelper.css';
import constants from '../actions/constants';
import Draggabilly from 'draggabilly';

const chatActions = new ChatActions();

class ChatHelper extends Component {

  static defaultProps = {
		onClick: () => {},
    connectionState: constants.connectionState.NOT_CONNECTED,
  }

  constructor(props) {
    super(props);
    this.state = {
      showHint: false
    }
  }

  componentDidMount() {
    const eles = document.getElementsByClassName('chatHelper');
    for (let e of eles) {
      new Draggabilly(e);
    }
  }

  renderByConnectionState = (connectionState) => {
    const { showHint } = this.state;
    switch (connectionState) {
      case constants.connectionState.CONNECTED:
        return (
          <div>
            <Icon type="message" />
            {
              showHint ? <div className="hint">连接成功</div> : ''
            }
          </div>
        );
      case constants.connectionState.CONNECTING:
        return (
          <div>
            <Icon type="loading" />
            {
              showHint ? <div className="hint">连接中...</div> : ''
            }
          </div>
        );
      case constants.connectionState.NOT_CONNECTED:
        return (
          <div>
            <Icon type="reload" />
            {
              showHint ? <div className="hint">重新连接</div> : ''
            }
          </div>
        );
    }
  }

  onClickByConnectionState = (connectionState) => {
    const { onClick, onReload, onLoading } = this.props;
    switch (connectionState) {
      case constants.connectionState.CONNECTED:
        return onClick;
      case constants.connectionState.CONNECTING:
        return onLoading;
      case constants.connectionState.NOT_CONNECTED:
        return onReload;
    }
  }


  render() {
		const { connectionState, style } = this.props;
		return (
			<div id="chatHelper" 
        className='chatHelper'
        style={style}
        onClick={this.onClickByConnectionState(connectionState)} 
        onMouseOver={() => {
          this.setState({showHint: true});
        }}
        onMouseLeave={() => {
          this.setState({showHint: false});
        }}
      >
        {
          this.renderByConnectionState(connectionState)
        }
			</div>
		)
  }
}

ChatHelper.propTypes = {
};

export default ChatHelper;