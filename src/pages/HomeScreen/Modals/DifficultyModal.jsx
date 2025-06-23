import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { useState } from 'react';
import { Container, Col, Button, Modal, Carousel, Card} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import easyModeImg from '../../../assets/images/easy-mode.png';
import normalModeImg from '../../../assets/images/normal-mode.png';
import hardModeImg from '../../../assets/images/hard-mode.png';

function GameSelectModal(props) {
    const buttonTexts = ["Start Easy Mode", "Start Normal Mode", "Start Hard Mode"];
    const routes = ["/game/easy", "/game/normal", "/game/hard"];

    const {show, onHide} = props;
    const navigate = useNavigate();
    const [index, setIndex] = useState(0);
    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };
    const [modalShow, setModalShow] = useState(false);

    return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered dialogClassName="modal-centered"
        show={show} onHide={onHide}
    >
        <Modal.Header closeButton
        style={{
            backgroundColor: "#0F4628"
        }}>
            <Modal.Title id="contained-modal-title-vcenter" className="modal-title-centered">
                <h2 style={{
                    color:"#EFBE47"
                }}>Select a Difficulty to Begin</h2>
            </Modal.Title>
        </Modal.Header>

        <Modal.Body 
        style={{
            backgroundColor: "#0F4628"
        }}>
            <Container className="difficultyCaroussel">
                <Carousel activeIndex={index} onSelect={handleSelect} interval={null} fade data-bs-ride={true} data-bs-interval="false" indicators={true}>
                    <Carousel.Item>
                        <Col className="cards-wrapper">
                            <Card>
                                <Card.Img variant="top" src={easyModeImg} />

                                <Card.Body>
                                    <Card.Title>🟢 Easy Mode 🟢</Card.Title>
                                    <Card.Text>
                                        <br></br>
                                        Great for beginners! Match just 2 pairs of cards with unlimited time and generous lives.
                                    </Card.Text>
                                    
                                </Card.Body>
                            </Card>
                            
                        </Col>

                    </Carousel.Item>

                    <Carousel.Item>
                        <Col className="cards-wrapper">
                            <Card>

                                <Card.Img variant="top" src={normalModeImg} />

                                <Card.Body>
                                    <Card.Title>🟡 Normal Mode 🟡</Card.Title>
                                    <Card.Text>
                                        A balanced challenge with 4 pairs to match. Fewer lives and a moderate preview time.
                                    </Card.Text>
                                    
                                </Card.Body>
                            </Card>
                            
                        </Col>

                    </Carousel.Item>

                    <Carousel.Item>
                        <Col className="cards-wrapper">
                            <Card>

                                <Card.Img variant="top" src={hardModeImg} />

                                <Card.Body>
                                    <Card.Title>🔴 Hard Mode 🔴</Card.Title>
                                    <Card.Text>
                                        <br></br>
                                        <br></br>
                                        Only for the sharpest minds. Match 9 pairs with limited lives and a short preview window.
                                    </Card.Text>
                                    
                                </Card.Body>
                            </Card>
                            
                        </Col>

                    </Carousel.Item>

                </Carousel>
            </Container>
        </Modal.Body>

        <Modal.Footer
        style={{
            backgroundColor: "#0F4628"
        }}>
            <Button variant="primary" onClick={() => {
                onHide();
                navigate(routes[index]);
            }}>
                {buttonTexts[index]}
            </Button>
        </Modal.Footer>
        
    </Modal>
    );
}

export default GameSelectModal