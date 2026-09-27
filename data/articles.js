export const articles = [
  {
    slug: "microfrontends",
    type: "estudo",
    category: "Estudo / Arquitetura frontend",
    title: "Microfrontends: da teoria à implementação.",
    excerpt: "O que são, quando fazem sentido e como construir um experimento que exponha seus custos e benefícios.",
    readingTime: "6 min de leitura",
    sections: [
      { title: "O problema antes da solução", body: ["Microfrontends surgem quando uma aplicação frontend cresce junto com a organização. Vários times passam a disputar o mesmo ciclo de entrega, as mesmas dependências e uma base de código em que qualquer alteração exige coordenação.", "A arquitetura tenta permitir que partes do produto evoluam com mais autonomia, mas essa autonomia só vale a pena quando resolve uma limitação concreta."] },
      { title: "Quando faz sentido", body: ["O ganho aparece quando existem domínios claros, times realmente independentes e necessidade de ciclos de entrega diferentes. Em uma aplicação pequena, a complexidade operacional tende a custar mais do que a autonomia oferecida.", "Antes de dividir a interface, eu verificaria se um monólito modular já resolve o problema."] },
      { title: "O experimento", body: ["Minha prova de conceito começaria com um shell responsável por navegação e identidade visual, acompanhado de dois módulos simples. Cada módulo teria build e implantação próprios.", "O objetivo seria observar compartilhamento de dependências, isolamento de falhas, experiência local e monitoramento."], code: "type AppContract = {\n  mount(element: HTMLElement): void\n  unmount(): void\n}" },
      { title: "O que eu mediria", body: ["Tempo para configurar um novo módulo, tamanho transferido ao navegador, impacto de versões duplicadas e esforço para manter uma experiência visual coerente.", "A decisão deve comparar autonomia obtida com complexidade introduzida."] },
      { title: "Conclusão", body: ["Microfrontends são uma ferramenta de organização técnica e de times. A pergunta mais útil não é como implementar, mas qual limitação atual justifica essa divisão."] },
    ],
  },
  {
    slug: "webassembly",
    type: "estudo",
    category: "Estudo / Experimento",
    title: "Explorando WebAssembly.",
    excerpt: "Por que aplicações como o Figma despertaram minha curiosidade e como transformar essa curiosidade em um experimento mensurável.",
    readingTime: "5 min de leitura",
    sections: [
      { title: "Por que estudar", body: ["WebAssembly permite executar no navegador código compilado de outras linguagens em um formato portátil. O tema me chamou atenção ao observar aplicações web que lidam com gráficos e processamento intenso sem abandonar o navegador."] },
      { title: "O que ele não substitui", body: ["A interface e a integração com APIs do navegador continuam muito bem atendidas por JavaScript. O valor aparece em trechos específicos: algoritmos pesados, bibliotecas existentes ou tarefas que se beneficiam de execução previsível."] },
      { title: "Primeiro projeto", body: ["Pretendo construir o mesmo processamento de imagem em JavaScript e WebAssembly. As duas versões receberão a mesma entrada e serão comparadas em tempo de execução, tamanho de download e complexidade.", "Chamadas frequentes atravessando a fronteira podem apagar parte do ganho. Por isso o desenho da integração importa tanto quanto o algoritmo."], code: "const output = wasm.process(input)" },
      { title: "O que quero aprender", body: ["Além de desempenho, quero entender depuração, carregamento, memória e o impacto real para quem usa a aplicação em dispositivos diferentes."] },
    ],
  },
  {
    slug: "projetos-que-viram-aprendizado",
    type: "projeto",
    category: "Projeto pessoal / Processo",
    title: "Projetos que viram aprendizado.",
    excerpt: "Como documentar projetos pessoais mostrando o problema, as decisões e aquilo que aprendi além da tela final.",
    readingTime: "4 min de leitura",
    sections: [
      { title: "Começar pelo problema", body: ["Um projeto se torna interessante quando deixa claro para quem existe e qual dificuldade tenta resolver. A tecnologia vem depois. Isso evita um portfólio formado apenas por listas de ferramentas."] },
      { title: "Registrar decisões", body: ["Quero registrar alternativas consideradas, restrições e por que escolhi uma direção. Uma decisão simples, bem explicada, mostra mais sobre engenharia do que uma arquitetura complexa sem contexto."] },
      { title: "Mostrar o processo", body: ["Cada projeto terá uma visão curta da solução, diagramas quando ajudarem, trechos de código essenciais e demonstrações. Também haverá espaço para falhas e mudanças de direção."] },
      { title: "Este próprio site", body: ["O site e seu mascote já são um exemplo: conceito visual, sprites, movimento controlado pela rolagem, acessibilidade e adaptação para celular podem formar uma série completa."] },
    ],
  },
];

export const getArticle = (slug) => articles.find((article) => article.slug === slug);
