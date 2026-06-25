import {  useState } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'

const App = () => {
   const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName   , setNewName]   = useState('')
  const [newNumber , setNewNumber] = useState('')
  const [newFilter , setNewFilter] = useState('')
  

  const handleNameChange = (event) => {
    
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) =>{
    setNewNumber(event.target.value)
  }
  
  const clearInputs = () =>{
    setNewName("")
      setNewNumber("")
  }

  const addPerson = (event) => {
    event.preventDefault(event.target.value)
  
    const person = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
   
    const isPerson = persons.some(person => person.name === newName && person.number === newNumber)

    if (isPerson) {
      alert(`${newName} is already added to phonebook`)
       clearInputs()
      return 
    }

    
    setPersons(persons.concat(person))

    clearInputs()
    
    
  }

  const handleFilterChange = (event) => {
    

    setNewFilter(event.target.value)
    
  }


  const names = newFilter === "" ? persons : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
  
  return (
    <div>
      <h2>Phonebook</h2>

      <Filter valorFiltro={newFilter} functionToChange={handleFilterChange} />

      
      <PersonForm props={[addPerson,newName,handleNameChange,newNumber,handleNumberChange]} />
      <h3>Add a new</h3>

      
      <h2>Numbers</h2>
      
      <Persons names={names}/>
    </div>
  )
}

export default App