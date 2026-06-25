
import Note from "./Note"

const Persons = ({names}) =>{

    return (
    <div >
    {names.map(person => <Note key={person.id} id={person.id} name={person.name}
    number={person.number}  />)}
    </div>
    )
}

export default Persons