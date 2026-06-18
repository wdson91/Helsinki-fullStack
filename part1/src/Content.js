
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
            <Part name={[props.parts[0].name, props.parts[0].exercises]} />
            <Part name={[props.parts[1].name, props.parts[1].exercises]} />
            <Part name={[props.parts[2].name, props.parts[2].exercises]} />
        </div>

    )
}
export default Content