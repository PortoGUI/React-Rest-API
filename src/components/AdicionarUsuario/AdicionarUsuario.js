import React, { Component } from 'react'

import './AdicionarUsuario.css'

const INITIAL_STATE = {
  usuario: { first_name: '', last_name: '', email: '', gender: 'male' }
}

class AdicionarUsuario extends Component {

  constructor(props) {
    super(props)

    this.state = INITIAL_STATE

    this.onChangeHandler = this.onChangeHandler.bind(this)
    this.onSubmitHandler = this.onSubmitHandler.bind(this)
  }

  onChangeHandler(event) {
    const { name, value } = event.target
    this.setState({ usuario: { ...this.state.usuario, [name]: value } })
  }

  onSubmitHandler(event) {
    event.preventDefault()
    // POST
    fetch(`https://randomuser.me/api/?gender=${this.state.usuario.gender}`).then(response => response.json()).then(result => {
      const newuser = { ...this.state.usuario, avatar: result.results[0].picture.medium }
      fetch('https://reqres.in/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newuser)
      }).then(response => response.json()).then(result => {
        this.setState(INITIAL_STATE)
        this.props.adicionarUsuario(result)
      })
    })
  }

  render() {
    return (
      <div className="AdicionarUsuario">
        <h2>Adicionar Usuário</h2>
        <form onSubmit={this.onSubmitHandler}>
          <div className="Linha">
            <div className="Coluna">
              <div className='genero'>
                <input type="radio" name="gender" value="male" checked={this.state.usuario.gender === 'male'} onChange={this.onChangeHandler} /> Masculino
                <input type="radio" name="gender" value="female" checked={this.state.usuario.gender === 'female'} onChange={this.onChangeHandler} /> Feminino
              </div>
            </div>
          </div>
          <div className="Linha">
            <div className="Coluna">
              <label>Nome</label>
              <input
                type="text"
                name="first_name"
                value={this.state.usuario.first_name}
                onChange={this.onChangeHandler}
                required>
              </input>
            </div>
            <div className="Coluna">
              <label>Sobrenome</label>
              <input
                type="text"
                name="last_name"
                value={this.state.usuario.last_name}
                onChange={this.onChangeHandler}
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
                value={this.state.usuario.email}
                onChange={this.onChangeHandler}
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
}

export default AdicionarUsuario