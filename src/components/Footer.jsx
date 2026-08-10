import './footer.css'
import { Youtube, Instagram, Tiktok } from 'react-bootstrap-icons';

/**
 * Rodapé da aplicação contendo contatos e links para redes sociais.
 * Utiliza Bootstrap para responsividade (empilha no mobile, alinha em linha no desktop).
 */
function Footer() {
  return (
    /* Container principal: coluna no mobile (flex-column) e linha no desktop (flex-md-row) */
    <footer className="rodape w-100 d-flex flex-column flex-md-row justify-content-center align-items-center text-center text-md-start gap-4 py-3">
      
      {/* Bloco 1: Contatos telefônicos */}
      <div className="telefones align-self-md-stretch">
        <h3 className="mt-0 mb-2">Nossos Telefones</h3>
        <p className="m-0 mb-2">Fixo: (21) 3333-0000</p> 
        <p className="m-0 mb-0">WhatsApp: (21) 98888-0000</p> 
      </div>
      
      {/* Bloco 2: Contatos por e-mail */}
      <div className="email align-self-md-stretch">
        <h3 className="mt-0 mb-2">Nossos E-mails</h3>
        <p className="m-0 mb-2">contato@lojadeartesanato.com.br</p> 
        <p className="m-0 mb-0">suporte@lojadeartesanato.com.br</p> 
      </div>
      
      {/* Bloco 3: Links e ícones das Redes Sociais */}
      <div className="redes_sociais align-self-md-stretch">
        <h3 className="mt-0 mb-2">Nossas Redes Sociais</h3>
        
        {/* Contêiner interno para alinhar os ícones horizontalmente com espaçamento (gap-3) */}
        <div className="icones_redes d-flex justify-content-center align-items-center gap-3">
          <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
            <Youtube className='img'/>
          </a>
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
            <Instagram className='img'/>
          </a>
          <a href="https://www.tiktok.com/pt-BR/" target="_blank" rel="noopener noreferrer">
            <Tiktok className='img'/>
          </a>
        </div>
      </div>
      
    </footer>
  )
}

export default Footer;