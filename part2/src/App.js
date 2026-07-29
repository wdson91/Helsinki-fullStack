import {  useEffect, useState } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import personService from './services/PersonService'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName   , setNewName]   = useState('')
  const [newNumber , setNewNumber] = useState('')
  const [newFilter , setNewFilter] = useState('')
  const [notification, setNotification] = useState(null)
  
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
      console.log(id,person)

    personService.update(id, person).then(
      
      response => {

        setPersons(persons.map(p => p.id !== id ? p : response))
        
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
        setPersons(persons.concat(response))
        setNotification({
          message: `'${person.name}' updated!`,
          style: 'success', // Você precisaria criar a classe .success no CSS
          id: Date.now() // (Veja a explicação abaixo sobre esse ID)
        })
      }).catch(error => {
        setNotification({
          message: `Note '${person.name}' was already removed from server`,
          style: 'error',
          id: Date.now() 
        })})

    clearInputs()
    
    
  }

  const handleFilterChange = (event) => {
    

    setNewFilter(event.target.value)
    
  }


  const deletePerson = (id,name) =>{
    
    personService.deletePerson(id).then(response => {
      setPersons(persons.filter(person => person.id !== id))
      setNotification({
          message: `'${name}' Removed`,
          style: 'error', // Você precisaria criar a classe .success no CSS
          id: Date.now() // (Veja a explicação abaixo sobre esse ID)
        })
    }).catch(error => {
        
      setNotification({
          message: `Information of '${name}' has already been removed from server`,
          style: 'error', // Você precisaria criar a classe .success no CSS
          id: Date.now() // (Veja a explicação abaixo sobre esse ID)
        })
      
      })
  }
  const names = newFilter === "" ? persons : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification info={notification} />
      <Filter value={newFilter} functionToChange={handleFilterChange} />

      
      <PersonForm props={[addPerson ,newName,handleNameChange,newNumber,handleNumberChange]} />
      <h3>Add a new</h3>

      
      <h2>Numbers</h2>
      
      <Persons persons={names} deletePerson={deletePerson} />
    </div>
  )
}

export default App