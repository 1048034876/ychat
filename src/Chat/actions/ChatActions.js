import constants from './constants';


export default class stateActions {
	generateRoomId = () => {
		return new Date().getTime();
	}
	setSocket(state, socket) {
		return { ...state, socket };
	}
	setRead(state, roomId) {
		const rooms = state.rooms;
		const room = rooms.roomId;
		room.messages = room.messages.map((item, index) => {
			item.isRead = 1;
			return item;
		})			
		return { ...state, rooms: { ...rooms, [roomId]: room} }
	}
	setConnecting(state) {
		return { ...state, connectionState: constants.connectionState.CONNECTING}
	}
	setConnected(state) {
		return { ...state, connectionState: constants.connectionState.CONNECTED}
	}
	sendSuccessed(state, payload) {
		let { roomId, messages, index } = payload;
		messages[index]['sendStatus'] = constants.sendStatus.SUCCESSED;
		state.rooms[roomId]['messages'] = messages;
		return state;
	}
	showChat(state) {
		let activeKey = undefined;
		for (let roomId in state.rooms) {
			activeKey = roomId;
		}
		return { ...state, showType: constants.showType.NORMAL, activeKey}
	}
	removeRoom(state, roomId) {
		const { rooms } = state;
		const keys = [];
		let index, activeKey, length;
		for (let key in rooms) {
			const length = keys.push(key);
			if (roomId === key) index = length - 1;
		}
		length = keys.length;
		activeKey = keys[(index + 1) % length]
		
		delete state.rooms[roomId];
		return { ...state, activeKey}
	}
	addRoom = (state, payload) => {
		const roomId = this.generateRoomId();
		state.rooms[roomId] = {
			messages: [],
			target: payload.target,
			current: payload.current
		}
		return { ...state }
	}
	setShowType(state, showType) {
		return { ...state, showType }
	}
	//处理socket.io返回的message
	addMessage(state, message) {
		const { roomId, content } = message;
		const room =  state.rooms[roomId];
		const length = room.messages.push({
			userId: message.userId, 
			content: message.content, 
			isRead: 1,
			sendStatus: constants.sendStatus.SENDING,
		})
		if (length)  message.index = length - 1;
		return { ...state }
	}

	pushMessage(state, payload) {
		const { roomId, message } = payload;
		state.rooms[roomId]['message'].push(message);
		let activeKey = roomId;
		if (state.activeKey) activeKey = state.activeKey;
		return { ...state, activeKey };
	}
}



