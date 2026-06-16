const Total = (props) => {
    let total = 0
    for (const part of props.prop) {
        total += part
    }

    return total
}

export default Total