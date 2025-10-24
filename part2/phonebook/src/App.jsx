import { useState, useEffect } from 'react'
import personServices from "./services/notes"

const Person = ({person}) => {
  return(
    <div>{person.name} {person.number}</div>
  )
}

const Filter = ({ filter, handleNewFilter }) => <div>filter shown with <input value={filter} onChange={handleNewFilter} /></div>

const PersonForm =({addPerson, newName, handleNewName, newNumber, handleNewNumber}) => {
  return(
    <form onSubmit={addPerson}>
          <div>name: <input value={newName} onChange={handleNewName} /></div>
          <div>number: <input value={newNumber} onChange={handleNewNumber} /></div>
          <div><button type="submit">add</button></div>
    </form>
  )
}

const Persons = ({personsToShow}) => <ul>{personsToShow.map(person => <Person key={person.name} person={person} />)}</ul>


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')  
  const [filter, setFilter] = useState('')  

useEffect(() => {
  personServices
    .getAll()
    .then(initialNotes => {
      setPersons(initialNotes)
    })
}, [])

const addPerson = (event) => {
  event.preventDefault()
  
  const personObject ={
    name: newName,
    number: newNumber,
    filtered: true
  }
  
  if(persons.some(person => person.name === newName)){
    alert(`${newName} is already added to phonebook`) 
    return;
  }

  personServices
    .create(personObject)
    .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')
    })
}


const handleNewName = (event) => {
  console.log(event.target.value)
  setNewName(event.target.value)
}

const handleNewNumber =(event) => {
  console.log(event.target.value)
  setNewNumber(event.target.value)
}

const handleNewFilter =(event) => {
  console.log(event.target.value)
  setFilter(event.target.value)
}

const personsToShow =  (filter === '') ? persons : (persons.filter(person => person.name.toLocaleLowerCase().startsWith(filter.toLocaleLowerCase())))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleNewFilter={handleNewFilter} />
      <h3>add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} handleNewName={handleNewName} newNumber={newNumber} handleNewNumber={handleNewNumber} />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App