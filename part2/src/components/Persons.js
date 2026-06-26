
import Note from "./Note"

const Persons = ({persons,deletePerson}) =>{

    return (
    <div >
    {persons.map(person => (
    <p key={person.id}>
    
    [{person.id}] - {person.name} — {person.number} 
    <button onClick={() => {if (window.confirm(`Delete ${person.name} ?`)){
                                    deletePerson(person.id)
    }}}> Delete </button>
  </p>

    ))}
    </div>
    )
}

export default Persons