import { Modal, Button, Form } from "react-bootstrap"

import { useState } from "react"

import { registerUtente } from "../../../Api/utenteApi"

const CreaUtenteModal = ({ show, handleClose, refresh }) => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    nome: "",
    cognome: "",
  })

  const handleChange = (e) => {
    setForm({
      ...form,

      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await registerUtente(form)

      refresh()

      handleClose()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Crea nuovo utente</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>

            <Form.Control
              name="username"
              value={form.username}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>

            <Form.Control
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>

            <Form.Control
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Nome</Form.Label>

            <Form.Control
              name="nome"
              value={form.nome}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Cognome</Form.Label>

            <Form.Control
              name="cognome"
              value={form.cognome}
              onChange={handleChange}
            />
          </Form.Group>

          <Button variant="success" type="submit">
            Crea
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default CreaUtenteModal
