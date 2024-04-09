import React, { useState } from 'react'

import './AdicionarUsuario.css'

function AdicionarUsuarioHook(props) {

  const [first_name, setFirstName] = useState('')
  const [last_name, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [gender, setGender] = useState('male')

  const onSubmitHandler = event => {
    event.preventDefault()
    // POST
    fetch(`https://randomuser.me/api/?gender=${gender}`).then(response => response.json()).then(result => {
      const newuser = { first_name, last_name, email, avatar: result.results[0].picture.medium }
      fetch('https://reqres.in/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newuser)
      }).then(response => response.json()).then(result => {
        setFirstName('')
        setLastName('')
        setEmail('')
        setGender('male')
        props.adicionarUsuario(result)
      })
    })
  }

  return (
    <div className="AdicionarUsuario">
      <h2>Adicionar Usuário</h2>
      <form onSubmit={onSubmitHandler}>
        <div className="Linha">
          <div className="Coluna">
            <div className='genero'>
              <input type="radio" name="gender" value="male" checked={gender === 'male'} onChange={event => setGender(event.target.value)} /> Masculino
              <input type="radio" name="gender" value="female" checked={gender === 'female'} onChange={event => setGender(event.target.value)} /> Feminino
            </div>
          </div>
        </div>
        <div className="Linha">
          <div className="Coluna">
            <label>Nome</label>
            <input
              type="text"
              name="nome"
              value={first_name}
              onChange={event => setFirstName(event.target.value)}
              required>
            </input>
          </div>
          <div className="Coluna">
            <label>Sobrenome</label>
            <input
              type="text"
              name="sobrenome"
              value={last_name}
              onChange={event => setLastName(event.target.value)}
              required>
            </input>
          </div>
        </div>
        <div className="Linha">
          <div className="Coluna">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={event => setEmail(event.target.value)}
              required>
            </input>
          </div>
        </div>
        <button type="submit">
          Adicionar
        </button>
      </form>
    </div>
  )
}

export default AdicionarUsuarioHook