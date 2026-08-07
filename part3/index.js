const express = require('express')
const morgan = require('morgan')
const fs = require('fs')
const path = require("path")

const app = express()
app.use(express.json())

let persons = 
 [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

morgan.token('body', (req) => {
  return JSON.stringify(req.body)
})

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    tokens.body(req,res)
  ].join(' ')
}))

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get("/info",(request,response)=>{
    
   

    response.send(`<p>Phonebook has info for ${persons.length} people </p> \n
       ${new Date().toString()}`)

})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  
  const person = persons.find(person => person.id === id)

  if(person){

      response.json(person)
  }else{
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)

  const personExists = persons.some(person => person.id === id)

  if (!personExists) {
    return response.status(404).json({
      error: 'Person not found'
    })
  }

  persons = persons.filter(person => person.id !== id)

  return response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const {name,number} = request.body
    
    if (!name || !number){
        return response.status(400).json({
      error: 'Missing Values, Name and Number are required'
    })
    }

    const newPerson = {
        id:Math.random() *100,
        name:name,
        number:number
    }

     const personExists = persons.some(person => person.name === name)
   
     if (personExists) {
    return response.status(401).json({
      error: 'This Name is already in use'
    })
  }

    persons.push(newPerson)
    
    return response.status(204).end()
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})