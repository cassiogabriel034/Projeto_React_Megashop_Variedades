import React, { useEffect, useContext } from "react";
import './produtos.css';
import contexto from "../../contexto/contexto"; 
import fetchProdutos from "../../api/fetchProdutos";
import Loading from "./Loading"; 
import Carrinho from "../Carrinho/Carrinho";

// Mapeamento que converte categorias da API em grupos amigáveis para exibição
const macroCategoriasMap = {
  "Beleza e Cuidados Pessoais": ["beauty", "fragrances", "skin-care"],
  "Moda Masculina": ["mens-shirts", "mens-shoes"],
  "Moda Feminina": ["tops", "womens-dresses"],
  "Acessórios": ["mens-watches", "sunglasses", "womens-bags"],
  "Dispositivos Eletrônicos": ["laptops", "smartphones", "tablets"],
  "Acessórios de Tecnologia": ["mobile-accessories"],
  "Casa e Decoração": ["furniture", "home-decoration"],
  "Mercado e Cozinha": ["groceries", "kitchen-accessories"],
  "Automotivo": ["motorcycle", "vehicle"],
  "Esportes e Lazer": ["sports-accessories"]
};

const macroCategoriasNomes = Object.keys(macroCategoriasMap);

/**
 * Página principal do catálogo.
 * Consome a API e agrupa os produtos em seções baseadas em macrocategorias.
 */
function Produtos() {
  const { produtos, setProdutos, termoBusca, carregando, setCarregando } = useContext(contexto);

  // Busca os produtos sempre que a página carrega ou o 'termoBusca' é alterado
  useEffect(() => {
    setCarregando(true); 
    fetchProdutos(termoBusca || '').then((resposta) => {
      setProdutos(resposta);
      setCarregando(false); 
    });
  }, [termoBusca, setProdutos, setCarregando]);

  return (
    /* Contêiner fluido que ocupa a largura total permitida */
    <main className="conteudo_principal container-fluid" id="pagina_produtos">
      
      {/* Lógica condicional: Loading -> Lista Vazia -> Lista Preenchida */}
      {carregando ? (
        <Loading />
      ) : produtos.length === 0 ? (
        <p className="text-center p-4 fs-5 w-100">
          Nenhum produto encontrado para {termoBusca}.
        </p>
      ) : (
        macroCategoriasNomes.map((macroCatNome) => {
          const categoriasOriginais = macroCategoriasMap[macroCatNome];
          const produtosDaCategoria = produtos.filter((prod) => 
            categoriasOriginais.includes(prod.category)
          );

          // Pula a renderização da seção inteira se não houver produtos nela
          if (produtosDaCategoria.length === 0) return null;

          return (
            /* Seção de cada macrocategoria. Ocupa 100% da largura (w-100) e empurra o bloco debaixo (mb-5) */
            <section key={macroCatNome} className="mb-5 w-100">
              <h2 className="mb-4">{macroCatNome}</h2>
              
              {/* Sistema de Grid do Bootstrap (row com gap-4). Os itens ficam alinhados à esquerda (start) */}
              <div className="row g-4 justify-content-start">
                {produtosDaCategoria.map(renderCardProduto)}
              </div>
            </section>
          );
        })
      )}
      
      {/* Insere a gaveta do carrinho invisível na hierarquia da tela */}
      <Carrinho />
    </main>
  );
}

/**
 * Constrói o layout visual de cada card de produto individualmente.
 */
function renderCardProduto(produto) {
  const { id, title, price, discountPercentage, thumbnail, stock } = produto;
  const parcelas_sem_juros = calcularParcelasSemJuros(stock);

  const precoComDesconto = price * (1 - discountPercentage / 100);
  const valorParcela = parcelas_sem_juros > 0 ? precoComDesconto / parcelas_sem_juros : 0;
  const precoPix = precoComDesconto * 0.95;

  return (
    <div key={id} className="col-12 col-md-6 col-lg-4 col-xl-3 d-flex align-items-stretch">
      {/* Coluna responsiva: 1 card no mobile (col-12), 2 no tablet (col-md-6), até 4 em telas grandes (col-xl-3).
       align-items-stretch garante que todos os cards na mesma linha tenham a mesma altura. */}
      
      {/* Contêiner principal do card, com sombra (shadow) e bordas removidas (border-0) */}
      <div className="produto_container card w-100 shadow border-0 p-3">
        
        {/* Área da Imagem */}
        <div className="img_prod_container">
          <img src={thumbnail} alt={title} className="img-fluid" />
        </div>
        
        {/* Área de Texto: Display flex em coluna (flex-column) para empurrar o bloco de preços para a base (mt-auto) */}
        <div className="informacao_container card-body d-flex flex-column text-start p-0 mt-3">
          <p className="produto_nome">{title}</p>
          
          {/* Rodapé interno do card fixado na parte inferior usando mt-auto */}
          <div className="mt-auto">
            <p className="produto_preco">
              <s>R$ {price.toFixed(2).replace('.', ',')}</s>
            </p>
            <p className="produto_preco_desconto">
              R$ {precoComDesconto.toFixed(2).replace('.', ',')}{' '}
              <span className="badge text-bg-success">{discountPercentage}% OFF</span>
            </p>
            <p className="pagamento_credito">
              {parcelas_sem_juros > 1 
                  ? `${parcelas_sem_juros}x de R$ ${valorParcela.toFixed(2).replace('.', ',')} sem juros` 
                  : 'Apenas à vista'
              }
            </p>
            <p className="pagamento_boleto">
              R$ {precoPix.toFixed(2).replace('.', ',')} com Boleto ou Pix
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

/**
 * Define o número de parcelas disponíveis com base no estoque simulado.
 */
function calcularParcelasSemJuros(estoque) {
  if (estoque >= 50) return 12; 
  if (estoque >= 30) return 6;  
  if (estoque >= 10) return 3;  
  if (estoque > 0) return 1;  
  return 0;  
}

export default Produtos;