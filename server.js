const express = require("express")
const app = express()
const { uuid } = require('uuidv4')
const bodyParser = require('body-parser')
const io = require('socket.io')()

state = {
  namespaces: [],
  rooms: []
}

const {
  NameSpace,
  Room
} = require('./classes')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + "/public"))

app.post('/signup', (req, res, next) => {
  const namespace = new NameSpace(uuid(), req.body.name)
  console.log(namespace)
  state.namespaces.push(namespace)
  res.status(200).json({data: state.namespaces})
})

app.get('/send', (req, res, next) => {
  

  res.status(200).json({
    users: [],
    threads: []
  })
})

app.use((req, res, next) => {
  res.status(200).json({data: state.namespaces})
})

app.use((error, req, res, next) => {
  console.log(error)
  res.status(500).json({error: error})
})

app.listen(5000)

