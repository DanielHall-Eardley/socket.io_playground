exports.NameSpace = class NameSpace {
  constructor (id, name) {
    this.id = id
    this.endpoint = name.split(' ')[0] + id
    this.rooms = []
    this.name = name
  }

  addRoom(room) {
    this.rooms.push(room)
  }
}

exports.Room = class Room {
  constructor (roomId, roomTitle, namespaceId, privateRoom = false) {
    this.id = roomId
    this.roomTitle = roomTitle
    this.namespaceId = namespaceId
    this.privateRoom = privateRoom
    this.users = []
    this.messages = []
  }

  addMessage (messageObj) {
    this.messages.push(messageObj)
  }

  addUser (user) {
    this.users.push(user)
  }

  clearMessages () {
    this.messages = []
  }
}

