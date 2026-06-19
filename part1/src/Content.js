
const Part = ({ content }) => {

    return (
        <p>
            {content.name} {content.exercises}
        </p>
    )
}

const Content = ({ contents }) => {


    return (
        <div>

            {contents.map(content => <Part content={content} />)}

        </div>

    )
}
export default Content