const PDFDocument = require('pdfkit');
const fs = require('fs');

function gerarPDF(livros, resenhas) {
  const doc = new PDFDocument({ size: 'A4', margin: 50 });
  const filePath = 'livros_resenhas.pdf'; // Caminho onde o PDF será salvo
  doc.pipe(fs.createWriteStream(filePath));

  // Definir variáveis de formatação
  const margin = 50; // Margem de 50px
  const lineHeight = 14; // Definir o espaçamento entre as linhas
  const pageWidth = doc.page.width - margin * 2; // Largura da página com margens
  let yPosition = margin; // Posição inicial no eixo Y

  // Função para adicionar texto com quebra automática
  const addText = (text, fontSize = 12) => {
    doc.setFontSize(fontSize);
    
    // Quebrar o texto automaticamente, respeitando a largura da página
    const textLines = doc.splitTextToSize(text, pageWidth);  // Quebra o texto com base na largura da página
    doc.text(textLines, margin, yPosition); // Adiciona o texto ao PDF

    // Atualiza a posição vertical (yPosition) com base na quantidade de linhas
    yPosition += textLines.length * lineHeight;
  };

  livros.forEach(livro => {
    // Título do livro
    addText(`Livro: ${livro.titulo} (${livro.ano_publicacao})`, 16);
    
    // Filtra as resenhas do livro
    const livroResenhas = resenhas.filter(resenha => resenha.livro_id === livro.id);

    if (livroResenhas.length > 0) {
      livroResenhas.forEach(resenha => {
        // Título da resenha
        addText(`Resenha de ${resenha.autor_resenha}:`, 14);
        
        // Texto da resenha (com quebra de linha automática)
        addText(resenha.resenha);
        yPosition += lineHeight; // Espaço extra entre as resenhas
      });
    } else {
      addText('Sem resenhas para este livro.', 12);
    }

    doc.addPage(); // Adiciona uma nova página para o próximo livro
  });

  // Finaliza a criação do PDF
  doc.end();

  console.log(`PDF gerado com sucesso em: ${filePath}`);
}

module.exports = gerarPDF;
