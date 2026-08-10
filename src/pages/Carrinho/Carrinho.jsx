import React, { useContext } from "react";
import contexto from "../../contexto/contexto"; 
import './Carrinho.css';
import { BagXFill } from 'react-bootstrap-icons';

/**
 * Componente que representa um item individual dentro da lista do carrinho.
 */
function CardProduto({ prod }) { 
    const { listaCarrinho, setListaCarrinho } = useContext(contexto);
    const { id, thumbnail, title, price, quantia, data } = prod;

    // Filtra a lista removendo o item atual pelo ID
    const eventoRemoveItem = () => {
        setListaCarrinho(
            listaCarrinho.filter((item) => item.id !== id) 
        )
    }

    return (
        /* Contêiner do item: flexível, alinhado ao topo, com borda inferior dividindo os itens */
        <div className="cart_item position-relative d-flex align-items-start border-bottom pb-3 mb-3">
            
            <img 
                src={thumbnail} 
                alt={`Imagem do produto ${title}`} 
                className="cart_item_image"
            />

            {/* Coluna de informações do produto (título, preço e detalhes) */}
            <div className="pe-4 ps-2 d-flex flex-column">
                <h3 className="fs-6 fw-semibold text-secondary mb-1">{title}</h3>
                <h3 className="fs-4 fw-medium mb-2">
                    R$ {price}
                </h3>
                
                <p className="text-dark mt-1 mb-0 fw-medium" style={{ fontSize: '0.85rem' }}>Quantia: {quantia}</p>
                <p className="text-secondary mt-0 mb-0" style={{ fontSize: '0.75rem' }}>Data: {data}</p>

                {/* Botão de exclusão posicionado absolutamente no canto superior direito do item */}
                <button
                    type="button"
                    className="btn btn-link text-danger p-0 position-absolute top-0 end-0 fs-5"
                    onClick={eventoRemoveItem}>
                    <BagXFill />
                </button>
            </div>
        </div>
    );
}

/**
 * Container lateral (gaveta) que agrupa os itens do carrinho e exibe o valor total.
 */
function Carrinho() {
    const { carrinhoAtivo, listaCarrinho } = useContext(contexto);

    // Calcula a soma total multiplicando preço por quantia de cada item
    const valorTotal = listaCarrinho.reduce((acumulador, item) => {
        return acumulador + (item.price * item.quantia);
    }, 0);

    return ( 
    /* Renderização de classe dinâmica: abre/fecha a gaveta com base no estado 'carrinhoAtivo' */
    <div className={carrinhoAtivo ? 'cart cart_active' : 'cart'}>
        
        {/* Área rolável da lista de itens */}
        <div className="cart_items">
            <div className="cart_items_title">Itens do Carrinho</div>
            
            {listaCarrinho.map((produto) => (
                <CardProduto key={produto.id} prod={produto} />
            ))}

            {/* Mensagem exibida apenas se a lista estiver vazia */}
            {listaCarrinho.length === 0 && (
                <p className="text-center text-secondary mt-4">
                    Seu carrinho está vazio.
                </p>
            )}
        </div>
        
        {/* Rodapé fixo do carrinho com o resumo financeiro */}
        <div className="cart_resumo">
            {`Total: R$ ${valorTotal.toFixed(2)}`}
        </div>
    </div> 
    );
}

export default Carrinho;