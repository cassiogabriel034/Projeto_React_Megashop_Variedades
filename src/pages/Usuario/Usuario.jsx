import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import contexto from '../../contexto/contexto'; 
import '../FormGeral.css';

import FormLogin from './FormLogin';
import FormCadastro from './FormCadastro';
import ErrosForm from '../../components/ErrosForm'; 

/**
 * Página de autenticação do usuário.
 * Gerencia a alternância entre os formulários de Login e Cadastro, além de aplicar
 * as regras de validação de dados antes de atualizar o estado global.
 */
function Usuario() {
  const { dadosUsuario, setDadosUsuario, setLogado } = useContext(contexto);
  const navigate = useNavigate();

  // Controla qual formulário está visível (true = Login, false = Cadastro)
  const [formAtivo, setFormAtivo] = useState(true); 
  
  // Estados para capturar os inputs do usuário
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');
  const [erros, setErros] = useState([]);

  // Valida os campos de entrada e salva o novo usuário no contexto
  const eventoCadastro = (e) => {
    e.preventDefault();
    const listaErros = [];

    // Validações básicas de formato e tamanho
    if (!nome.trim() || nome.trim().length < 3) {
      listaErros.push('O nome deve ter no mínimo 3 caracteres.');
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      listaErros.push('Insira um e-mail válido.');
    }
    if (!senha || senha.length < 6) {
      listaErros.push('A senha deve ter no mínimo 6 caracteres.');
    }
    
    // Remove tudo que não for número antes de validar o telefone
    const apenasNumerosTel = telefone.replace(/\D/g, '');
    if (apenasNumerosTel.length < 10 || apenasNumerosTel.length > 11) {
      listaErros.push('Insira um telefone válido com DDD (entre 10 e 11 dígitos numéricos).');
    }

    // Se houver erros, exibe na tela; senão, conclui o cadastro
    if (listaErros.length > 0) {
      setErros(listaErros);
    } else {
      setDadosUsuario({ nome, email, telefone, senha });
      setErros([]);
      alert('Cadastro realizado com sucesso! Agora você já pode fazer login.');
      setNome('');
      setEmail('');
      setTelefone('');
      setSenha('');
      setFormAtivo(true); // Redireciona para a aba de login
    }
  };

  // Verifica as credenciais contra os dados previamente salvos no contexto
  const eventoLogin = (e) => {
    e.preventDefault();
    const listaErros = [];

    // Impede o login se o contexto estiver vazio (nenhum usuário cadastrado)
    const todosVazios = Object.values(dadosUsuario).every(valor => valor.trim() === '');
    if (todosVazios) {
      alert('Nenhum usuário cadastrado no sistema. Por favor, cadastre-se primeiro!');
      setFormAtivo(false);
      return;
    }

    // Autoriza o login usando o Nome ou E-mail + Senha correta
    const loginValido = (nome === dadosUsuario.nome || nome === dadosUsuario.email) && senha === dadosUsuario.senha;

    if (loginValido) {
      setLogado(true);
      setErros([]);
      setNome('');
      setSenha('');
      alert(`Seja bem-vindo(a), ${dadosUsuario.nome}!`);
      navigate('/produtos'); // Envia o usuário para a loja após logar
    } else {
      setLogado(false);
      listaErros.push('Senha ou Nome/E-mail incorretos!');
      setErros(listaErros);
    }
  };

  return (
    /* Contêiner semântico principal da página */
    <main className="conteudo_principal">
      
      {/* Seção centralizada contendo os formulários (text-center) */}
      <section className="formulario_solicitar text-center">
        
        {/* Cabeçalho dinâmico: muda dependendo se é login ou cadastro (mb-3 e mb-4 criam margem inferior) */}
        <h2 className="mb-3">{formAtivo ? 'Faça o seu Login' : 'Cadastre-se aqui'}</h2>
        <p className="mb-4">Preencha os dados abaixo para acessar sua conta ou criar um novo perfil.</p>

        {/* Componente que exibe os alertas de erro */}
        <ErrosForm erros={erros} />

        {/* Renderização Condicional: Mostra o componente adequado com base no estado 'formAtivo' */}
        {formAtivo ? (
          <FormLogin 
            eventoLogin={eventoLogin} 
            nome={nome} setNome={setNome} 
            senha={senha} setSenha={setSenha} 
          />
        ) : (
          <FormCadastro 
            eventoCadastro={eventoCadastro}
            nome={nome} setNome={setNome}
            email={email} setEmail={setEmail}
            telefone={telefone} setTelefone={setTelefone}
            senha={senha} setSenha={setSenha}
          />
        )}

        {/* Área do botão para alternar entre as abas. Usa w-100 para esticar o botão por toda a largura */}
        <div className="form_botoes mt-4">
          <button
            type="button"
            className="w-100"
            onClick={() => {
              // Limpa todos os estados e inverte o formulário atual
              setErros([]);
              setFormAtivo(!formAtivo);
              setNome(''); 
              setEmail(''); 
              setTelefone(''); 
              setSenha('');
            }}
          >
            {formAtivo ? 'Não tem conta? Cadastre-se' : 'Já tem conta? Faça Login'}
          </button>
        </div>
      </section>
    </main>
  );
}

export default Usuario;