import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { useState } from 'react';
import { Container, Row, Col, Button, Image, Modal, Carousel, Card} from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import './HomeScreen.css';

import GameSelectModal from './DifficultyModal';

import logoImg from '../../assets/images/logo.png';


const HomeScreen = () => {

  const [modalShow, setModalShow] = React.useState(false);

  return (
    <Container className="landing"> 
        
        <Image className="homeLogo" src={logoImg}/>

        <Row className="mb-4">
            <Button className="action-btn button-option" variant="primary" onClick={() => setModalShow(true)}
              style={{
                border: '5px solid #0F4528',
                fontWeight: 'bold'
              }}>
              Play Game
            </Button>

            <GameSelectModal
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
        </Row>

        <Row className="mb-5">
            <Link className="button-option" to='/rules' >View Rules</Link>
        </Row>

        

    </Container>
  );
};

export default HomeScreen


