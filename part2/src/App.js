import {  useEffect, useState } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import personService from './services/PersonService'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName   , setNewName]   = useState('')
  const [newNumber , setNewNumber] = useState('')
  const [newFilter , setNewFilter] = useState('')
  
  const getAll = () => {
    personService
      .getAll()
      .then(response => {
        
       setPersons(response)
      })
  }

  useEffect(() => {
    getAll()
  }, [])

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

  const updatePerson = (id,person) =>{
    personService.update(id, person).then(
      response => {
        setPersons(persons.map(p => p.id !== id ? p : response.data))
      }
    )
    return 

  }

  const addPerson = (event) => {
    event.preventDefault(event.target.value)
    
    const person = {
      name: newName,
      number: newNumber,
    }
   
    const isPerson = persons.filter(person => person.name === newName )[0]
    
    if (isPerson && (window.confirm(`${person.name} is already added to phonebook, replace ther old number with a new one?`) )) {
      
      updatePerson(isPerson.id,person )

      clearInputs()
      return 
    }

  
    personService
      .create (person)
      .then(response => {
        setPersons(persons.concat(response.data))
      
      })

    clearInputs()
    
    
  }

  const handleFilterChange = (event) => {
    

    setNewFilter(event.target.value)
    
  }


  const deletePerson = (id) =>{
    
    personService.deletePerson(id).then(response => {
      setPersons(persons.filter(person => person.id !== id))
      alert(`Person ${id} deleted `)
    })
  }
  const names = newFilter === "" ? persons : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
  
  return (
    <div>
      <h2>Phonebook</h2>

      <Filter value={newFilter} functionToChange={handleFilterChange} />

      
      <PersonForm props={[addPerson ,newName,handleNameChange,newNumber,handleNumberChange]} />
      <h3>Add a new</h3>

      
      <h2>Numbers</h2>
      
      <Persons persons={names} deletePerson={deletePerson} />
    </div>
  )
}

export default App