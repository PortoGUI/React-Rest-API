import React from 'react'

import './Usuario.css'

function Usuario(props) {
  return (
    <div className="Usuario">
      <img className="avatar" src={props.usuario.avatar}></img>
      <div className="conteudo">
        <ul>
          <li><b>Id:</b> {props.usuario.id}</li>
          <li><b>Nome:</b> {props.usuario.first_name} {props.usuario.last_name}</li>
          <li><b>Email:</b> {props.usuario.email}</li>
        </ul>
        <button onClick={props.removerUsuario}>&times;</button>
      </div>
    </div>
  )
}

export default Usuario