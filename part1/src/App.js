

import Header from "./Header"
import Total from "./Total"
import Contet from "./Content"

const App = () => {
  const course = 'Desenvolvimento de aplicação Half Stack'

  const parts = [10, 7, 14]
  const exercises = ['Fundamentos da biblioteca React', 'Usando props para passar dados', 'Estado de um componente']

  return (
    <div>
      <Header prop={course} />
      <Contet parts={parts} exercises={exercises} />

      <p>Number of exercises <Total prop={parts}></Total></p>
    </div>
  )
}

export default App