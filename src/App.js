import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Chat from './Chat/components';
import constants from './Chat/actions/constants';

const user_1 = {
  id: 1,
  name: '熊大',
  photo: './images/chh1.jpg'
}
const user_2 = {
  id: 2,
  name: '熊二',
  photo: './images/chh2.jpg'
}
const user_3 = {
  id: 3,
  name: '熊三',
  photo: './images/chh3.jpg'
}
const user_4 = {
  id: 4,
  name: '熊四',
  photo: './images/chh4.jpg',
}
class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="App">
        <div className="">
          <Chat current={user_1} rooms={{
            roomId: {
            messages: [
              {
                  userId: 1, 
                  content: '123123', 
                  isRead: 0,
                  sendStatus: constants.sendStatus.SUCCESSED
              }
            ],
            target: user_2,
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
            target: user_3,
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
            target: user_4,
            show: false
          },
          }}></Chat>


          <Chat chatHelperStyle={{top: '150px'}} current={user_2} rooms={{
            roomId: {
            messages: [
              {
                  userId: 1, 
                  content: '123123', 
                  isRead: 0,
                  sendStatus: constants.sendStatus.SUCCESSED
              }
            ],
            target: user_1,
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
            target: user_3,
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
            target: user_4,
            show: false
          },
          }}></Chat>
        </div>
        
      </div>
    );
  }
}

export default App;
