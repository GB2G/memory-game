import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { useState } from 'react';
import { Container, Row, Col, Button, Image, Modal, Carousel, Card} from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import './HomeScreen.css';

import GameSelectModal from './Modals/DifficultyModal';
import RuleModal from './Modals/RulesModal';

import logoImg from '../../assets/images/logo.png';


const HomeScreen = () => {

  const [showGameModal, setShowGame] = React.useState(false);
  const [showRulesModal, setShowRules] = React.useState(false);

  return (
    <Container className="landing"> 
        
        <Image className="homeLogo" src={logoImg}/>

        <Row className="mb-4">
            <Button className="action-btn button-option" variant="primary" onClick={() => setShowGame(true)}
              style={{
                border: '5px solid #0F4528',
                fontWeight: 'bold'
              }}>
              Play Game
            </Button>
        </Row>

        <Row className="mb-5">
            <Link className="button-option" to="#" onClick={(e) => { e.preventDefault(); setShowRules(true); }}>View Rules</Link>

        </Row>

        <GameSelectModal show={showGameModal} onHide={() => setShowGame(false)} />
        <RuleModal show={showRulesModal} onHide={() => setShowRules(false)} />


    </Container>
  );
};

export default HomeScreen


