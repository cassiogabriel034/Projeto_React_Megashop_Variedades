import { useState, useContext } from 'react';
import '../FormGeral.css';
import ErrosForm from '../../components/ErrosForm';
import fetchProdutos from "../../api/fetchProdutos";
import contexto from "../../contexto/contexto";

/**
 * Página com formulário para solicitação/encomenda de produtos.
 * Extrai os itens do texto, valida na API e adiciona ao carrinho se existirem.
 */
function Solicitacao() {
  const { listaCarrinho, setListaCarrinho, logado } = useContext(contexto); 

  // Estado para armazenar quais categorias foram selecionadas
  const [categorias, setCategorias] = useState({
    beleza_e_cuidados_pessoais: false,
    moda_masculina: false,
    moda_feminina: false,
    acessórios: false,
    dispositivos_eletrônicos: false,
    acessórios_de_tecnologia: false,
    casa_e_decoracão: false,
    mercado_e_cozinha: false,
    automotivo: false,
    esportes_e_lazer: false
  });
  
  const [mensagem, setMensagem] = useState('');
  const [erros, setErros] = useState([]);
  const [carregandoValidacao, setCarregandoValidacao] = useState(false); 

  // Insere um erro padrão caso o usuário não esteja logado
  const errosExibicao = !logado 
    ? ['Você precisa estar logado para enviar uma solicitação.', ...erros] 
    : erros;

  // Atualiza dinamicamente o estado das categorias com base no 'name' do checkbox
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setCategorias((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!logado) return;

    const listaErros = [];

    // Validação básica: verifica se há pelo menos um checkbox marcado
    const algumaCategoriaMarcada = Object.values(categorias).some(Boolean);
    if (!algumaCategoriaMarcada) {
      listaErros.push('Selecione pelo menos um tipo de produto de seu interesse.');
    }
    
    // Validação básica: tamanho mínimo da mensagem
    if (!mensagem.trim() || mensagem.trim().length < 10) {
      listaErros.push('A descrição do seu pedido deve conter pelo menos 10 caracteres.');
    }

    if (listaErros.length > 0) {
      setErros(listaErros);
      return; 
    }

    setCarregandoValidacao(true); 

    // LÓGICA DE EXTRAÇÃO (RegEx)
    // Procura por padrões como: "2x de Perfume" ou "1 x de Laptop"
    const regex = /(\d+)\s*x\s+de\s+([^\n]+)/gi;
    let match;
    const itensExtraidos = [];

    while ((match = regex.exec(mensagem)) !== null) {
      itensExtraidos.push({
        quantia: parseInt(match[1], 10), // A quantidade (ex: 2)
        nomeBusca: match[2].trim()       // O nome do produto (ex: Perfume)
      });
    }

    if (itensExtraidos.length === 0) {
      listaErros.push('Não conseguimos identificar os produtos. Siga o padrão: "2x de Nome do Produto".');
      setErros(listaErros);
      setCarregandoValidacao(false);
      return;
    }

    const dataAtual = new Date().toLocaleDateString('pt-BR');
    const novosProdutosParaCarrinho = [];

    // Busca cada item extraído na API para confirmar se o produto existe
    for (const item of itensExtraidos) {
      const resultadosAPI = await fetchProdutos(item.nomeBusca);

      if (resultadosAPI.length > 0) {
        const produtoValidado = resultadosAPI[0]; // Pega o primeiro resultado mais relevante
        
        novosProdutosParaCarrinho.push({
          id: produtoValidado.id,
          thumbnail: produtoValidado.thumbnail,
          title: produtoValidado.title,
          price: produtoValidado.price,
          quantia: item.quantia,
          data: dataAtual
        });
      } else {
        listaErros.push(`O produto "${item.nomeBusca}" não foi encontrado em nosso sistema.`);
      }
    }

    if (listaErros.length > 0) {
      setErros(listaErros); 
    } else {
      // Se não houver erros, adiciona tudo ao carrinho e limpa o formulário
      setErros([]);
      setListaCarrinho([...listaCarrinho, ...novosProdutosParaCarrinho]);
      alert('Produtos validados com sucesso e adicionados ao carrinho!');
      handleReset();
    }
    
    setCarregandoValidacao(false); 
  };

  const handleReset = () => {
    setCategorias({ 
        beleza_e_cuidados_pessoais: false, moda_masculina: false, moda_feminina: false,
        acessórios: false, dispositivos_eletrônicos: false, acessórios_de_tecnologia: false,
        casa_e_decoracão: false, mercado_e_cozinha: false, automotivo: false, esportes_e_lazer: false 
    });
    setMensagem('');
    setErros([]);
  };

  return (
    <main className="conteudo_principal" id="pagina_solicatacao">
      {/* Seção principal: Conteúdo centralizado (text-center) */}
      <section className="formulario_solicitar text-center">
        <h2 className="mb-3">Solicite um Orçamento ou Encomenda</h2>
        <p className="mb-2">Preencha os dados abaixo e nos conte o que você precisa.</p>
        <p className="mb-4" style={{color: 'var(--cinza)', fontSize: '0.9rem'}}><strong>Padrão obrigatório na descrição:</strong> <i>2x de Nome do Produto</i></p>

        {/* Componente para exibir os alertas de erro */}
        <ErrosForm erros={errosExibicao} />

        {/* Formulário: Organizado em coluna com espaçamento (gap-4) entre os blocos */}
        <form onSubmit={handleSubmit} className="d-flex flex-column gap-4">
          
          {/* Bloco 1: Checkboxes. Alinhado à esquerda (text-start) com margem inferior (mb-3) */}
          <div className="form_grupo text-start mb-3">
            <p className="fw-bold mb-2">Quais tipos de produtos você busca? (Selecione um ou mais)</p>
            
            {/* Lista de categorias */}
            <div className="checkbox_tipo">
              <input type="checkbox" id="cat_beleza" name="beleza_e_cuidados_pessoais" checked={categorias.beleza_e_cuidados_pessoais} onChange={handleCheckboxChange} />
              <label htmlFor="cat_beleza">Beleza e Cuidados Pessoais</label>
            </div>
            <div className="checkbox_tipo">
              <input type="checkbox" id="cat_moda_masculina" name="moda_masculina" checked={categorias.moda_masculina} onChange={handleCheckboxChange} />
              <label htmlFor="cat_moda_masculina">Moda Masculina</label>
            </div>
            <div className="checkbox_tipo">
              <input type="checkbox" id="cat_moda_feminina" name="moda_feminina" checked={categorias.moda_feminina} onChange={handleCheckboxChange} />
              <label htmlFor="cat_moda_feminina">Moda Feminina</label>
            </div>
            <div className="checkbox_tipo">
              <input type="checkbox" id="cat_acessorios" name="acessórios" checked={categorias.acessórios} onChange={handleCheckboxChange} />
              <label htmlFor="cat_acessorios">Acessórios</label>
            </div>
            <div className="checkbox_tipo">
              <input type="checkbox" id="cat_dispositivos" name="dispositivos_eletrônicos" checked={categorias.dispositivos_eletrônicos} onChange={handleCheckboxChange} />
              <label htmlFor="cat_dispositivos">Dispositivos Eletrônicos</label>
            </div>
            <div className="checkbox_tipo">
              <input type="checkbox" id="cat_acessorios_tec" name="acessórios_de_tecnologia" checked={categorias.acessórios_de_tecnologia} onChange={handleCheckboxChange} />
              <label htmlFor="cat_acessorios_tec">Acessórios de Tecnologia</label>
            </div>
            <div className="checkbox_tipo">
              <input type="checkbox" id="cat_casa_decoracao" name="casa_e_decoracão" checked={categorias.casa_e_decoracão} onChange={handleCheckboxChange} />
              <label htmlFor="cat_casa_decoracao">Casa e Decoração</label>
            </div>
            <div className="checkbox_tipo">
              <input type="checkbox" id="cat_mercado_cozinha" name="mercado_e_cozinha" checked={categorias.mercado_e_cozinha} onChange={handleCheckboxChange} />
              <label htmlFor="cat_mercado_cozinha">Mercado e Cozinha</label>
            </div>
            <div className="checkbox_tipo">
              <input type="checkbox" id="cat_automotivo" name="automotivo" checked={categorias.automotivo} onChange={handleCheckboxChange} />
              <label htmlFor="cat_automotivo">Automotivo</label>
            </div>
            <div className="checkbox_tipo">
              <input type="checkbox" id="cat_esportes_lazer" name="esportes_e_lazer" checked={categorias.esportes_e_lazer} onChange={handleCheckboxChange} />
              <label htmlFor="cat_esportes_lazer">Esportes e Lazer</label>
            </div>
          </div>

          {/* Bloco 2: Área de texto do pedido (text-start) */}
          <div className="form_grupo text-start mb-3">
            <label htmlFor="mensagem" className="mb-2">Detalhes do Pedido:</label>
            <textarea
              id="mensagem"
              rows={5}
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
              placeholder="Ex:&#10;2x de Essence Mascara&#10;1x de Red Lipstick"
            ></textarea>
          </div>

          {/* Bloco 3: Botões. Flexível com quebra de linha permitida (flex-wrap), espaçamento (gap-3) e os botões preenchem o espaço (flex-grow-1) */}
          <div className="form_botoes d-flex flex-wrap gap-3 mt-2">
            <input 
              type="submit" 
              value={carregandoValidacao ? "Validando produtos..." : "Enviar Solicitação"} 
              disabled={carregandoValidacao || !logado} 
              className="flex-grow-1"
              style={{ 
                opacity: (carregandoValidacao || !logado) ? 0.7 : 1, 
                cursor: !logado ? 'not-allowed' : 'pointer' 
              }}
            />
            <input type="button" value="Limpar Formulário" className="flex-grow-1" onClick={handleReset} />
          </div>
        </form>
      </section>
    </main>
  );
}

export default Solicitacao;