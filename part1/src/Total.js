const Total = (props) => {


    const total = props.parts.reduce((acc, act) => {
        return acc + act.exercises
    }, 0)

    return <b>total of  {total}  exercices</b>
}

export default Total