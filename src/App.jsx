import { HashRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Produtos from './pages/Produtos/Produtos';
import Solicitacao from './pages/Solicitacao/Solicitacao';
import Provedor from './contexto/Provedor';
import Usuario from './pages/Usuario/Usuario';

/**
 * Componente raiz da aplicação.
 * Configura o provedor de estado global, o sistema de rotas e o layout base.
 */
function App() {
  return (
    /* O Provedor envolve toda a aplicação para que o estado global seja acessível em qualquer página */
    <Provedor>
      
      {/* HashRouter habilita o uso de rotas e histórico de navegação */
      /*O HashRouter é utilizado no lugar do BrowserRouter para garantir a compatibilidade 
      das rotas com o GitHub Pages, evitando erros 404 ao recarregar a página.*/}
      <HashRouter>
        
        {/* O Header fica fora do <Routes> para ser renderizado fixamente em todas as páginas */}
        <Header />

        {/* Define quais componentes serão renderizados dependendo do caminho (URL) */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/solicitar" element={<Solicitacao />} />
          <Route path="/usuario" element={<Usuario/>} /> 
        </Routes>

        {/* O Footer também fica fora do <Routes> para ser exibido em todas as páginas */}
        <Footer />
        
      </HashRouter>
    </Provedor>
  );
}

export default App;