const express = require('express');
const app = express();
const morgan = require('morgan');

morgan.token('body', (req, res) => {return JSON.stringify(req.body)})
const customLogFormat = ':method :url :status :res[content-length] - :response-time ms :body'

app.use(express.json());
app.use(morgan(customLogFormat));

let persons = [
    { id: 1, name: "Arto Hellas", number: "040-123456" },
    { id: 2, name: "Ada Lovelace", number: "39-44-5323523" },
    { id: 3, name: "Dan Abramov", number: "12-43-234345" },
    { id: 4, name: "Mary Poppendieck", number: "39-23-6423122" }
]; 	

const generateId = () => {
    const maxId = persons.length > 0 ? Math.max(...persons.map(person => person.id)) : 0
    return maxId + 1
}

app.get('/api/persons', (request, response) => {
    response.json(persons);
})

app.get('/api/persons/:id', (request, response) =>{
    const id = request.params.id
    const person = persons.find(toFind => toFind.id === Number(id))
    if(!person){
        return response.status(404).end()
    }
    return response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person =>person.id !== id)

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body;

    if(!body.name || !body.number){
        return response.status(400).json({error: 'name or number is missing'})
    }

    if(persons.some(person => person.name ===body.name)){
        return response.status(400).json({error: 'name must be unique'})
    }

    const newPerson = {
        name: body.name,
        number: body.number,
        id: generateId(),
    }

    persons = persons.concat(newPerson);
    return response.json(newPerson)
})

app.get('/info', (request, response) => {
    response.send(`Phonebook has info for ${persons.length} people<br>${Date()}`);
})

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`)
})