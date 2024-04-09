import './App.css';

import Usuarios from './components/Usuarios/Usuarios'
import UsuariosHook from './components/usuariosHook/usuariosHook';

function App() {
  return (
    <div className="App">
      <main>
        <UsuariosHook></UsuariosHook>
      </main>
    </div>
  );
}

export default App;
