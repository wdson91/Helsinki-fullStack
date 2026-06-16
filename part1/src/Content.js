
const Part = (props) => {

    return (
        <p>
            {props.name} {props.exercises}
        </p>
    )
}

const Content = (props) => {

    return (
        <div>
            <Part name={[props.exercises[0], props.parts[0]]} />
            <Part name={[props.exercises[1], props.parts[1]]} />
            <Part name={[props.exercises[2], props.parts[2]]} />
        </div>

    )
}
export default Content