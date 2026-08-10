/**
 * Função assíncrona responsável por buscar os produtos na API externa (DummyJSON).
 * 
 * @param {string} props - O termo de busca digitado pelo usuário (ex: "laptop", "perfume").
 * @returns {Promise<Array>} Retorna uma Promise que resolve em um array de produtos.
 */
const fetchProdutos = async (props) => {
  try {
    // 1. PREPARAÇÃO DO TERMO DE BUSCA
    // Se 'props' for nulo/indefinido, assume uma string vazia ('').
    // O encodeURIComponent codifica espaços e caracteres especiais (ex: um espaço vira '%20').
    // Isso é crucial para garantir que a URL da requisição não quebre ou fique inválida.
    const termoTratado = encodeURIComponent(props || '');
    
    // 2. REQUISIÇÃO À API
    // Utiliza a API Fetch nativa do navegador para fazer uma requisição HTTP GET.
    // O parâmetro 'q=' recebe o termo pesquisado e 'limit=0' pede à API 
    // que traga todos os resultados possíveis de uma vez.
    const response = await fetch(`https://dummyjson.com/products/search?q=${termoTratado}&limit=0`);
    
    // 3. CONVERSÃO DOS DADOS
    // Aguarda a resposta da API e transforma o corpo (texto plano) em um objeto JavaScript.
    const data = await response.json(); 
    
    // 4. RETORNO SEGURO (Fail-Safe)
    // Verifica se a propriedade 'data.products' existe.
    // Se existir, devolve a lista. Se não existir, devolve um array vazio [].
    // Isso impede que os componentes React quebrem ao tentar fazer um .map() em 'undefined'.
    return data.products || [];

  } catch (erro) {
    // BLOCO DE CAPTURA DE ERROS (Tratamento de Exceções)
    // Entra aqui caso ocorra uma falha de rede (ex: sem internet) ou o servidor da API caia.
    
    // Registra o erro no console do navegador para facilitar o trabalho do desenvolvedor no debug.
    console.error("Erro ao buscar produtos:", erro);
    
    // Retorna um array vazio para manter a aplicação funcionando (resiliência).
    // Assim, a interface pode simplesmente exibir "Nenhum produto encontrado" em vez de uma tela de erro fatal.
    return []; 
  }
}

// Exporta a função para ser consumida em outras partes do sistema, 
// como dentro do hook useEffect na página de Produtos.
export default fetchProdutos;