// Importa a função createContext da biblioteca React.
// Essa função é a ferramenta nativa usada para criar um novo "Contexto".
import { createContext } from "react";

/**
 * Criação do Contexto Global da aplicação.
 * O 'contexto' atua como um canal de comunicação invisível que permite 
 * compartilhar dados (como usuário logado, carrinho de compras, etc.) 
 * por toda a árvore de componentes, sem a necessidade de repassar propriedades 
 * manualmente de pai para filho (evitando o problema conhecido como "prop drilling").
 */
const contexto = createContext();

// Exporta a instância do contexto.
// Ela precisará ser importada em dois lugares:
// 1. No Provedor (Provedor.jsx), para encapsular a aplicação e injetar os valores.
// 2. Nos componentes consumidores (via hook useContext), para resgatar os valores.
export default contexto;