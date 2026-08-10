import React from 'react';

/**
 * Componente de formulário para login do usuário.
 * Recebe os estados de controle (nome, senha) e a função de submissão via props.
 */
function FormLogin({ eventoLogin, nome, setNome, senha, setSenha }) {
  return (
    /* Formulário organizado em coluna (flex-column) com espaçamento de 1rem (gap-3) */
    <form onSubmit={eventoLogin} className="d-flex flex-column gap-3">
      
      {/* Grupo do campo de Usuário/E-mail com textos alinhados à esquerda (text-start) */}
      <div className="form_grupo text-start">
        <label htmlFor="usuario">Nome Completo ou E-mail:</label>
        <input
          type="text"
          id="usuario"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Digite seu nome ou e-mail"
        />
      </div>

      {/* Grupo do campo de Senha */}
      <div className="form_grupo text-start">
        <label htmlFor="senha">Senha:</label>
        <input
          type="password"
          id="senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="Digite sua senha"
        />
      </div>

      {/* Contêiner do botão de envio com margem superior (mt-2) e largura total (w-100) */}
      <div className="form_botoes d-flex flex-wrap gap-3 mt-2">
        <input type="submit" value="Entrar" className="w-100" />
      </div>
    </form>
  );
}

export default FormLogin;