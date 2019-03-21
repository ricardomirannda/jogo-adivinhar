// declara vetor de escopo global que irá conter os números já apostados
var erros = [];

// gera um número aleatório entre 1 e 100
var sorteado = Math.floor(Math.random() * 100) + 1;

console.log(sorteado);

// ===========================================================
// declara constante com o número de chances e mostro
const CHANCES = 6;
let outChances = document.querySelector('#outChances');
outChances.textContent =  CHANCES;

let inNumero = document.querySelector('#inNumero');

// ===========================================================
// funcao responsavel por avaliar se o jogador acerto o número oculto
function avaliarAposta () {
  // numero que o usuário digita pra acertar o número mágico
  let numero = Number(inNumero.value);
  let btApostar = document.querySelector('#btApostar');
  let btJogar = document.querySelector('#btJogar');

  let areaJogador = document.querySelector('.area-jogador');

  let outErros = document.querySelector('#outErros');
  let li = document.createElement('li');

  let contadorChances = CHANCES - (erros.length) - 1;
  let alertaUsuario = document.querySelector('.alerta-usuario');

  if (numero <= 0 || numero > 100 || isNaN(numero)) {
    alertaUsuario.style.display = 'block';
    inNumero.focus();
    return;
  } else {
    alertaUsuario.style.display = 'none';
  }

  if (numero == sorteado) {
    outDica.textContent = `Parabéns!! Número sorteado: ${sorteado}`;
    outDica.classList.add('vencedor');
    outChances.classList.add('vencedor');
    li.textContent = numero;
    outErros.appendChild(li);
    resetaJogo ();
    return;

  } else if (erros.indexOf(numero) >= 0) {
    outDica.textContent = `Tente um número diferente de ${numero}.`;
    return
  } else  {
    (numero != sorteado)
    erros.push(numero);
    li.textContent = `${numero},`;

    outChances.textContent =  contadorChances;

    let dica = numero < sorteado ? "maior" : "menor";
    outDica.textContent = `Dica: Tente um número ${dica}  que ${numero}` ;

    outErros.appendChild(li);
  }

  if (contadorChances == 0) {
    outDica.textContent = "Suas chances acabaram.";
    outDica.classList.add('perdeu');
    outChances.classList.add('perdeu');
    resetaJogo();
  }

  function resetaJogo () {
    btApostar.classList.add('hide');
    areaJogador.classList.add('hide')
    btJogar.classList.add('show');
  }
}



// ===========================================================
// funcao responsavel por limpar o campo da aposta e colocar foco
function limparCampo () {
  let inNumero = document.querySelector('#inNumero');
  inNumero.value = '';
  inNumero.focus();
}

// ===========================================================
// seleciono o botao jogar
let btApostar = document.querySelector('#btApostar');

// Botão chama as funcoes de apostar e limpar campo
btApostar.addEventListener('click', () => {
  avaliarAposta ();
  limparCampo();
})


// Jogar novamente
let btJogar = document.querySelector('#btJogar');

function jogarNovamente () {
  location.reload();
}

btJogar.addEventListener('click', jogarNovamente)

inNumero.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    avaliarAposta ();
    inNumero.value = '';
   event.preventDefault();
  }
});
