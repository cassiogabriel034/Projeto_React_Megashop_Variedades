// Importação das ferramentas necessárias do React
// useState: gerencia os estados (dados) dentro do componente.
// useEffect: executa efeitos colaterais, como salvar dados no localStorage toda vez que um estado mudar.
import React, { useState, useEffect } from "react";

// Importação da biblioteca prop-types para garantir que os componentes recebam os tipos corretos de dados (props)
import propTypes from 'prop-types';

// Importação do contexto criado em outro arquivo (geralmente usando createContext())
import contexto from "./contexto";

/**
 * Componente Provedor (Provider)
 * Ele envolve a aplicação (ou parte dela) para fornecer os estados globais
 * a todos os componentes "filhos" (children) sem precisar passar props manualmente.
 */
function Provedor({ children }) { 
    // ==========================================
    // ESTADOS VOLÁTEIS (Não vão para o localStorage)
    // Estes estados voltam ao valor inicial caso o usuário atualize a página.
    // ==========================================
    
    // termoBusca: guarda o texto que o usuário digita na barra de pesquisa.
    const [termoBusca, setTermoBusca] = useState('');
    
    // produtos: guarda a lista de produtos carregada de uma API ou banco de dados.
    const [produtos, setProdutos] = useState([]);
    
    // carregando: controla o status de "loading" (ex: para mostrar um spinner enquanto os produtos carregam).
    // Inicia como 'true' porque assumimos que a busca de dados começa assim que a tela abre.
    const [carregando, setCarregando] = useState(true);


    // ==========================================
    // ESTADOS COM SALVAMENTO LOCAL (LocalStorage)
    // Estes estados persistem mesmo se o usuário fechar a aba ou recarregar a página.
    // ==========================================

    /**
     * DICA DE PERFORMANCE:
     * Usar uma função anônima dentro do useState `() => { ... }` é chamado de "Lazy Initialization".
     * Isso garante que o React só leia o localStorage na primeira vez que o componente renderizar,
     * economizando processamento em renderizações futuras.
     */

    // 1. Dados do Usuário
    const [dadosUsuario, setDadosUsuario] = useState(() => {
        // Tenta buscar os dados salvos anteriormente no navegador
        const dadosSalvos = localStorage.getItem('dadosUsuario');
        // Se existir algo salvo, converte de volta para Objeto (JSON.parse).
        // Se não existir, retorna o objeto padrão vazio.
        return dadosSalvos ? JSON.parse(dadosSalvos) : { nome: '', email: '', telefone: '', senha: '' };
    });

    // Toda vez que a variável 'dadosUsuario' for alterada, este useEffect entra em ação
    // para atualizar o valor lá no localStorage.
    useEffect(() => {
        localStorage.setItem('dadosUsuario', JSON.stringify(dadosUsuario));
    }, [dadosUsuario]);


    // 2. Estado de Logado (Autenticação)
    const [logado, setLogado] = useState(() => {
        const logadoSalvo = localStorage.getItem('logado');
        // Retorna o valor booleano salvo ou 'false' por padrão.
        return logadoSalvo ? JSON.parse(logadoSalvo) : false;
    });

    useEffect(() => {
        localStorage.setItem('logado', JSON.stringify(logado));
    }, [logado]);


    // 3. Status de visualização do Carrinho (Controla se o menu lateral do carrinho está Aberto/Fechado)
    const [carrinhoAtivo, setCarrinhoAtivo] = useState(() => {
        const carrinhoSalvo = localStorage.getItem('carrinhoAtivo');
        return carrinhoSalvo ? JSON.parse(carrinhoSalvo) : false;
    });

    useEffect(() => {
        localStorage.setItem('carrinhoAtivo', JSON.stringify(carrinhoAtivo));
    }, [carrinhoAtivo]);


    // 4. Lista de Produtos do Carrinho
    const [listaCarrinho, setListaCarrinho] = useState(() => {
        const listaSalva = localStorage.getItem('listaCarrinho');
        // Se houver itens salvos, carrega a lista, senão, inicia com um array vazio.
        return listaSalva ? JSON.parse(listaSalva) : [];
    });

    useEffect(() => {
        localStorage.setItem('listaCarrinho', JSON.stringify(listaCarrinho));
    }, [listaCarrinho]);

    // ==========================================

    // Objeto 'value' agrupa todos os estados e suas respectivas funções de atualização (setters).
    // Tudo que estiver aqui dentro poderá ser acessado por qualquer componente filho usando o hook useContext().
    const value = {
        termoBusca, setTermoBusca,
        produtos, setProdutos,
        dadosUsuario, setDadosUsuario,
        logado, setLogado,
        carregando, setCarregando,
        carrinhoAtivo, setCarrinhoAtivo,
        listaCarrinho, setListaCarrinho
    };

    // Retorna o Provider do contexto. 
    // A prop 'value' injeta os dados na árvore de componentes.
    // O {children} representa todos os componentes que estarão dentro deste Provider lá no App.js.
    return (
        <contexto.Provider value={value}>
            {children} 
        </contexto.Provider>
    );
}

// Validação de PropTypes
// Garante que o componente Provedor receba elementos filhos (children) válidos.
// O ".isRequired" fará o React emitir um aviso no console se você esquecer de passar filhos para ele.
Provedor.propTypes = {
    children: propTypes.node.isRequired,
};

// Exporta o componente para ser usado no arquivo principal da aplicação (geralmente index.js ou App.js)
export default Provedor;