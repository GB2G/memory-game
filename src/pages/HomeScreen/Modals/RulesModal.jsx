import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function RuleModal({ show, onHide }) {
    return (
        <Modal show={show} onHide={onHide} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Game Rules</Modal.Title>
            </Modal.Header>
            
            <Modal.Body>
                <h5>How to Play</h5>
                <ul>
                    <li>Flip cards to find matching pairs.</li>
                    <li>Match all cards to win the game.</li>
                    <li>Fewer moves = higher score!</li>
                </ul>
                <h6>Good luck!</h6>
            </Modal.Body>
            
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default RuleModal;