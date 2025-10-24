import { useState, useEffect } from 'react'
import personServices from "./services/notes"
import axios from 'axios'

const Person = ({person, deletePerson}) => {
  return(
    <div>{person.name} {person.number} <button onClick={() => deletePerson({ name: person.name, id: person.id })}>delete</button> </div>
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

const Persons = ({personsToShow, deletePerson}) => <ul>{personsToShow.map(person => {
    return(  
      <div key={person.name}>
        <Person person={person} deletePerson={deletePerson} /> 
      </div>
    )}
)}</ul>


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
  
  if(persons.some(person => person.name.trim() === newName.trim())){
    const confirmChange = window.confirm(`${newName.trim()} is already added to phonebook, replace the old number with a new one?`) 
    if(!confirmChange) return
    const personToChange = persons.find(person => person.name.trim() === newName.trim())
    personServices
      .update(personToChange.id, { ...personToChange, number: newNumber})
      .then(returnedPerson => {
        setPersons(persons.map(person => person.id === personToChange.id ? returnedPerson : person))
        setNewName('')
        setNewNumber('')
      })
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

const deletePerson = ({name, id}) => {
  const confirmDelete = window.confirm(`Delete ${name.trim()}?`)
  if(!confirmDelete) return
  
  personServices
    .remove(id)
    .then(() => {
      setPersons(persons.filter(p => p.id !== id))
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
      <Persons personsToShow={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App