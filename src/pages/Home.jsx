import React from 'react';
import './home.css';
import { Shop, GeoAlt, CreditCard } from 'react-bootstrap-icons';

/**
 * Página inicial (Sobre Nós) da aplicação.
 * Exibe informações institucionais da loja, localização e formas de pagamento
 * utilizando um layout responsivo de três colunas.
 */
function Home() {
  return (
    /* Contêiner semântico principal com espaçamento responsivo 
       (p-4 no mobile, p-md-5 no desktop) para não colar nas bordas */
    <main className="conteudo_principal container p-4 p-md-5" id="pagina_home">
      
      {/* Cabeçalho da página centralizado com margem inferior (mb-5) */}
      <div className="text-center mb-5">
        <h1 className="home_titulo">Sobre Nós</h1>
        <p className="home_subtitulo">Conheça mais sobre a nossa história e estrutura.</p>
      </div>

      {/* Sistema de Grid do Bootstrap (row) com espaçamento de calha (g-4) entre as colunas */}
      <div className="row g-4">
        
        {/* Bloco 1: Nossa História
            Ocupa 100% da tela no mobile (col-12) e 33% em desktops (col-lg-4).
            Texto centralizado no mobile e alinhado à esquerda no desktop (text-lg-start). */}
        <section className="col-12 col-lg-4 text-center text-lg-start">
          
          {/* Contêiner do ícone flexível para alinhar conforme o tamanho da tela */}
          <div className="d-flex justify-content-center justify-content-lg-start mb-3">
            <Shop size={40} className="home_icone" /> 
          </div>
          
          <h3 className="home_secao_titulo mb-3">Nossa História</h3>
          <p className="home_texto">
            Nossa loja nasceu da vontade de reunir tudo o que você precisa em um só lugar. 
            Oferecemos uma curadoria completa que vai desde dispositivos eletrônicos e acessórios 
            de tecnologia até moda, itens de beleza, casa e decoração, mercado, automotivos e 
            muito mais. Somos o seu destino definitivo para encontrar variedade, qualidade e 
            praticidade no dia a dia.
          </p>
        </section>

        {/* Bloco 2: Localização 
            Além das regras acima, ocupa 50% da tela em tablets (col-md-6) */}
        <section className="col-12 col-md-6 col-lg-4 text-center text-lg-start">
          <div className="d-flex justify-content-center justify-content-lg-start mb-3">
            <GeoAlt size={40} className="home_icone" />
          </div>
          <h3 className="home_secao_titulo mb-3">Onde Nos Encontrar</h3>
          <p className="home_texto">
            Nosso espaço físico foi planejado para proporcionar uma experiência de compra 
            agradável e moderna. Estamos localizados no coração da cidade, na <strong>Rua Principal, 
            número 123, no bairro Centro</strong> (próximo à praça de eventos). Venha nos fazer uma visita, 
            tomar um café conosco e conhecer de perto o nosso mix completo de produtos e novidades.
          </p>
        </section>

        {/* Bloco 3: Formas de Pagamento */}
        <section className="col-12 col-md-6 col-lg-4 text-center text-lg-start">
          <div className="d-flex justify-content-center justify-content-lg-start mb-3">
            <CreditCard size={40} className="home_icone" />
          </div>
          <h3 className="home_secao_titulo mb-3">Formas de Pagamento</h3>
          <p className="home_texto">
            Queremos que sua experiência de compra seja simples e segura do início ao fim. 
            Por isso, oferecemos total flexibilidade para você adquirir o que precisa sem 
            complicações. Aceitamos pagamentos à vista via <strong>Pix (com desconto especial)</strong>, 
            boleto bancário, cartões de débito e cartões de crédito das principais bandeiras, com 
            parcelamento facilitado em até <strong>12 vezes sem juros</strong> (condicionado à disponibilidade do estoque).
          </p>
        </section>
        
      </div>
    </main>
  );
}

export default Home;