// src/components/Header.jsx
import './header.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BagFill, PersonCircle, BoxArrowRight } from 'react-bootstrap-icons';
import { useContext } from 'react';
import contexto from '../contexto/contexto';
import logoAtersantao from '../assets/imagens/logo_atersantao.png';

/**
 * Cabeçalho principal da aplicação.
 * Gerencia a navegação, exibição do usuário logado e barra de pesquisa condicional.
 */
function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    termoBusca, setTermoBusca,
    logado, setLogado,
    dadosUsuario, setDadosUsuario,
    carrinhoAtivo, setCarrinhoAtivo,
    setListaCarrinho
  } = useContext(contexto);

  // Limpa o estado global e o carrinho, e redireciona para a página inicial
  const handleLogout = () => {
    setLogado(false);
    setDadosUsuario({ nome: '', email: '', telefone: '', senha: '' });
    setListaCarrinho([]);
    navigate('/'); 
  };

  // Pega apenas o primeiro nome do usuário para a saudação
  const primeiroNome = dadosUsuario.nome ? dadosUsuario.nome.trim().split(' ')[0] : 'Usuário';

  return (
    /* Container principal do cabeçalho */
    <header className="cabecalho w-100 p-0">
      
      {/* Faixa superior: Centraliza o conteúdo horizontal e verticalmente */}
      <div className="w-100 d-flex justify-content-center align-items-center px-4">
        
        {/* Container da Logo, Título e Botões de Usuário */}
        <div className="logo_container py-3 d-flex justify-content-center align-items-center gap-3 mb-0 position-relative">
          <img src={logoAtersantao} alt="MegaShop Variedades" />
          <h1 className="m-0">MegaShop Variedades</h1>

          {/* Área de Autenticação (Login/Logout) posicionada ao lado do título */}
          <div className="area_usuario d-flex align-items-center gap-2">
            
            {/* Renderização condicional: Se não estiver logado, mostra "Entrar". Se estiver, mostra Saudação + "Sair" */}
            {!logado ? (
              <Link to="/usuario" className="btn_login_link d-flex align-items-center gap-2 px-3 py-1 rounded-pill text-decoration-none" title="Fazer Login / Cadastro">
                <PersonCircle size={28} />
                <span>Entrar</span>
              </Link>
            ) : (
              <div className="usuario_logado_container d-flex align-items-center gap-2">
                <span className="nome_usuario">Olá, {primeiroNome}!</span>
                <button
                  type="button"
                  className="btn_logout d-flex align-items-center gap-1 px-3 py-1 rounded"
                  onClick={handleLogout}
                  title="Sair da conta"
                >
                  <BoxArrowRight size={20} />
                  <span>Sair</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Faixa inferior: Menu de navegação */}
      <nav className="menu_cabecalho py-3 px-3">
        
        {/* Lista de links centralizada com espaçamento (gap-4) */}
        <ul className="d-flex justify-content-center align-items-center text-center gap-4 m-0 p-0 list-unstyled">
          <li><Link to="/" className="text-decoration-none">Sobre Nós</Link></li>
          <li><Link to="/produtos" className="text-decoration-none">Nossos Produtos</Link></li>
          <li><Link to="/solicitar" className="text-decoration-none">Solicitação de Produtos</Link></li>
        </ul>

        {/* Renderização condicional: A barra de pesquisa só aparece se a rota atual for '/produtos' */}
        {location.pathname === '/produtos' && (
          <div className="pesquisa d-flex justify-content-center text-center align-items-center mt-3">
            {/* O ícone do carrinho só aparece na barra de pesquisa se o usuário estiver logado */}
            {logado && (
              <button type="button" className="carrinho_btn d-flex align-items-center justify-content-center me-3 p-2 rounded" 
                      title="Carrinho de Compras" onClick={() => setCarrinhoAtivo(!carrinhoAtivo)}>
                <BagFill size={20} />
              </button>
            )}

            <input
              type="text"
              id="input-pesquisa"
              className="px-3 py-1 rounded"
              placeholder="Digite para pesquisar..."
              value={termoBusca}
              onChange={(e) => setTermoBusca(e.target.value)}
            />
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;