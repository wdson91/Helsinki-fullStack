const Total = (props) => {
    console.log(props)
    let total = 0
    for (const part of props.parts) {
        total += part.exercises

    }

    return total
}

export default Total