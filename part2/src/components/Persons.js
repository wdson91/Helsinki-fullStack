
import Note from "./Note"

const Persons = ({persons,deletePerson}) =>{
  console.log(persons)
  return (
    <>
    {persons.map(person => (
      
    <p key={person.id || 0}>
      
    [{person.id ||0}] - {person.name} — {person.number} 
    <button onClick={() => {if (window.confirm(`Delete ${person.name} ?`)){
    deletePerson(person.id, person.name)
    console.log('person renderizado:', person)
    }}}> Delete </button>
  </p>))}
  </>
  )
}

export default Persons