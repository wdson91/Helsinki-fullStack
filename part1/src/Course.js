


import Header from "./Header"
import Content from "./Content"
import Total from "./Total"


const Course = ({ courses }) => {




    return (
        <div>
            <h1>Web development curriculum</h1>
            {courses.map(course =>

                <div>

                    <Header course={course.name} />
                    <Content contents={course.parts} />
                    <Total parts={course.parts} />
                </div>
            )}



        </div>

    )


}



export default Course