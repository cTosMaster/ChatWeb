import React, { useState } from "react";
import { AUTH_CODE } from "./AuthCode";
import { Modal, Button, Form } from "react-bootstrap";

const AuthCodeInput = ({ show, onClose, onSuccess }) => {
    const [inputCode, setInputCode] = useState("");
    const [error, setError] = useState("");

    const handleVerify = (e) => {
        e.preventDefault();
        if (inputCode === AUTH_CODE) {
            sessionStorage.setItem("authCodeVerified", "true");
            setError(""); // 에러 초기화
            onSuccess(); // 인증성공 콜백 호출
            onClose();   // 모달 닫기
        } else {
            setError("잘못된 인증코드입니다.");
        }
    };

    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>인증 코드 입력</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group controlId="authCodeInput">
                    <Form.Label>인증코드</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="코드를 입력하세요"
                        value={inputCode}
                        onChange={(e) => setInputCode(e.target.value)}
                    />
                    {error && <Form.Text className="text-danger">{error}</Form.Text>}
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    닫기
                </Button>
                <Button variant="primary" onClick={handleVerify}>
                    확인
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AuthCodeInput;