import {Container, Row, Col} from 'react-bootstrap'
import { useState } from 'react'
import {useParams} from 'react-router-dom'

const GameScreen = () => {

    const [count, setCount] = useState(0)
    const params = useParams()

    const difficulty = params.level

    
    return(
        <>
            <Container>
                <h1>This is the gameplay page</h1>
                <h2>The game is set to {difficulty}</h2>

                <div className="card">
                    <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                    </button>
                    
                </div>

            </Container>
        </>
    )
}

export default GameScreen