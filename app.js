// Variáveis e lista para guardar o número aleatório e as tentativas 
let listaDeNumerosSorteados = [];
let limiteMaximo = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

// Função que seleciona os campos do HTML
function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2} );
}

// Chamando a função exibirTextoNaTela
function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo da Adivinhação');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}

exibirMensagemInicial();

// Função para verificar o chute
function verificarChute() {
    let chute = document.querySelector('input').value;

    //condicionais de acerto, contagem de tentativas
    if(chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        
        // Variáveis de tentativa
        let palavraTentativa = tentativas > 1 ? 'tentivas' : 'tentativa';
        let mensagemTentativas = `Você cobriu o número secreto com ${tentativas} ${palavraTentativa}`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if(chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor que o chute');
        } else {
            exibirTextoNaTela('p','O número secreto é maior que o chute');
        }
        tentativas++;
        limparCampoChute();
    }
}

// Função para gerar um número aleatório
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * limiteMaximo + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if(quantidadeDeElementosNaLista == limiteMaximo) {
        listaDeNumerosSorteados = [];
    }

    if(listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

// Função para limpar o campo de chute
function limparCampoChute(){
    chute = document.querySelector('input');
    chute.value = '';
}

// Função para reiniciar o jogo
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    exibirMensagemInicial();
    limparCampoChute();
    tentativas = 1;
    document.getElementById('reiniciar').setAttribute('disabled', true);
}