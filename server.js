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

app.post('/api/signup', (req, res, next) => {
  const namespace = new NameSpace(uuid(), req.body.name)
  state.namespaces.push(namespace)
  res.status(200).json({data: state})
})

app.get('/api/send', (req, res, next) => {
  
})

app.use("/api", (req, res, next) => {
  res.status(200).json({data: state})
})

app.use((error, req, res, next) => {
  console.log(error)
  res.status(500).json({error: error})
})

app.listen(5000)

