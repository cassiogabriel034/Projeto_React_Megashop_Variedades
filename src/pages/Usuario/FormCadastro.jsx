import React from 'react';

/**
 * Componente de formulário para cadastro de novos usuários.
 * Recebe os dados do perfil e a função de validação/submissão via props.
 */
function FormCadastro({ eventoCadastro, nome, setNome, email, setEmail, telefone, setTelefone, senha, setSenha }) {
  return (
    /* Formulário organizado em coluna (flex-column) com espaçamento regular (gap-3) */
    <form onSubmit={eventoCadastro} className="d-flex flex-column gap-3">
      
      {/* Grupo do campo Nome com textos alinhados à esquerda (text-start) */}
      <div className="form_grupo text-start">
        <label htmlFor="cad_nome">Nome Completo:</label>
        <input
          type="text"
          id="cad_nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Digite seu nome completo"
        />
      </div>

      {/* Grupo do campo E-mail */}
      <div className="form_grupo text-start">
        <label htmlFor="cad_email">E-mail:</label>
        <input
          type="email"
          id="cad_email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="seuemail@exemplo.com"
        />
      </div>

      {/* Grupo do campo Telefone */}
      <div className="form_grupo text-start">
        <label htmlFor="cad_tel">Telefone/WhatsApp:</label>
        <input
          type="tel"
          id="cad_tel"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          placeholder="(XX) 9XXXX-XXXX"
        />
      </div>

      {/* Grupo do campo Senha */}
      <div className="form_grupo text-start">
        <label htmlFor="cad_senha">Senha:</label>
        <input
          type="password"
          id="cad_senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="Crie uma senha de no mínimo 6 dígitos"
        />
      </div>

      {/* Contêiner do botão de envio com margem superior (mt-2) e largura total (w-100) */}
      <div className="form_botoes d-flex flex-wrap gap-3 mt-2">
        <input type="submit" value="Cadastrar" className="w-100" />
      </div>
    </form>
  );
}

export default FormCadastro;