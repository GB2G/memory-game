import {Container, Row, Col} from 'react-bootstrap'
import {Link} from 'react-router-dom'

const HomeScreen = () => {
    
    return(
        <>
            <Container>
                <h1>This is the homepage</h1>
                <Link to='/game/easy'>Go to GamePlay</Link>

            </Container>
        
        
        
        </>
    )
}

export default HomeScreen