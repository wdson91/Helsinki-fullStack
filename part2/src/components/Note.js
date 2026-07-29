const Note = ({id, name, number, deletePerson  }) => {
  

    return (
    <p>
    
    [{id}] - {name} — {number} 
    <button onClick={deletePerson}> Delete </button>
  </p>

    )
}


export default Note