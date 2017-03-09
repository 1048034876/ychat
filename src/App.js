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
            '3333': {
              messages: [],
              target: user_2,
            },
          }}></Chat>


          <Chat chatHelperStyle={{top: '150px'}} current={user_2} rooms={{
            '3333': {
              messages: [],
              target: user_1,
            },
          }}></Chat>
        </div>
        
      </div>
    );
  }
}

export default App;
