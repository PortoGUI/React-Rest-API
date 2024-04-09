import React, { useState, useEffect } from 'react'

import AdicionarUsuario from '../AdicionarUsuario/AdicionarUsuario'
import Usuario from '../Usuario/Usuario'
import AdicionarUsuarioHook from '../AdicionarUsuarioHook/AdicionarUsuarioHook'

function UsuariosHook() {

  const [usuarios, setUsuarios] = useState([])

  useEffect(() => {
    // GET
    fetch('https://reqres.in/api/users')
    .then(response => response.json())
    .then(result => setUsuarios(result.data))
  }, [])

  const adicionarUsuario = usuario => {
    setUsuarios(usuariosAtuais => [...usuariosAtuais, usuario])
  }

  const removerUsuario = usuario => {
    if (window.confirm(`Tem certeza que deseja remover "${usuario.nome} ${usuario.sobrenome}"?`)) {
      fetch(`https://reqres.in/api/users/${usuario.id}`, {
        method: 'DELETE'
      })
        .then(resposta => {
          if (resposta.ok) {
            setUsuarios(usuarios.filter(x => x.id !== usuario.id))
          }
        })
    }
  }
  
  return (
    <>
      <AdicionarUsuarioHook adicionarUsuario={adicionarUsuario} />

      {usuarios.map(usuario => (
        <Usuario key={usuario.id}
          usuario={usuario}
          removerUsuario={() => removerUsuario(usuario)}
        />
      ))}
    </>
  )
}

export default UsuariosHook