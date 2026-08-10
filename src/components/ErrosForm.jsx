import React from 'react';

/**
 * Componente para exibir uma lista de erros de validação em formulários.
 */
function ErrosForm({ erros }) {
  // Não renderiza o contêiner se a lista estiver vazia ou nula
  if (!erros || erros.length === 0) {
    return null;
  }

  return (
    // Contêiner de erros estilizado com espaçamentos do Bootstrap
    <div className="container-erros-visivel p-3 mb-4 rounded d-block">
      <ul className="ps-4 mb-0">
        {erros.map((erro, index) => (
          <li key={index} className="mb-1">{erro}</li>
        ))}
      </ul>
    </div>
  );
}

export default ErrosForm;