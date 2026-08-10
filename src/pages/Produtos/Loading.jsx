import React from "react";
import { ArrowClockwise } from "react-bootstrap-icons";

/**
 * Componente visual de Spinner de carregamento.
 * É renderizado na tela enquanto a aplicação aguarda a resposta da API.
 */
function Loading() {
  return (
    /* Ícone do Bootstrap (ArrowClockwise) que, graças à classe "loading", 
       deve possuir uma animação de rotação (spin) definida no CSS */
    <ArrowClockwise className="loading" />
  );
}

export default Loading;