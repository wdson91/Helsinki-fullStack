const Filter = ({ value, functionToChange }) => {
  return (
    <div>
      filtro: <input value={value} onChange={functionToChange} />
    </div>
  )
}


export default Filter