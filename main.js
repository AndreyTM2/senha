const tamanhoSenhaDisplay = document.querySelector('.parametro-senha__texto');
let tamanhoSenha = 12;
tamanhoSenhaDisplay.textContent = tamanhoSenha;

const letras = {
    maiusculas: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    minusculas: 'abcdefghijklmnopqrstuvwxyz',
};

const numeros = '0123456789';
const simbolos = '!@%*?';
const botoes = document.querySelectorAll('.parametro-senha__botao');
const campoSenha = document.querySelector('#campo-senha');
const checkboxes = document.querySelectorAll('.checkbox');
const forcaSenha = document.querySelector('.forca');

botoes[0].addEventListener('click', diminuiTamanho);
botoes[1].addEventListener('click', aumentaTamanho);

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', geraSenha);
});

function diminuiTamanho() {
    if (tamanhoSenha > 1) {
        tamanhoSenha--;
        tamanhoSenhaDisplay.textContent = tamanhoSenha;
        geraSenha();
    }
}

function aumentaTamanho() {
    if (tamanhoSenha < 20) {
        tamanhoSenha++;
        tamanhoSenhaDisplay.textContent = tamanhoSenha;
        geraSenha();
    }
}

function geraSenha() {
    let alfabeto = '';
    if (checkboxes[0].checked) {
        alfabeto += letras.maiusculas;
    }
    if (checkboxes[1].checked) {
        alfabeto += letras.minusculas;
    }
    if (checkboxes[2].checked) {
        alfabeto += numeros;
    }
    if (checkboxes[3].checked) {
        alfabeto += simbolos;
    }

    let senha = '';
    const alfabetoLength = alfabeto.length;
    for (let i = 0; i < tamanhoSenha; i++) {
        const randomIndex = Math.floor(Math.random() * alfabetoLength);
        senha += alfabeto[randomIndex];
    }

    campoSenha.value = senha;
    classificaSenha(alfabetoLength);
}

function classificaSenha(tamanhoAlfabeto) {
    const entropia = tamanhoSenha * Math.log2(tamanhoAlfabeto);
    forcaSenha.className = 'forca';

    if (entropia > 57) {
        forcaSenha.classList.add('forte');
    } else if (entropia > 35 && entropia < 57) {
        forcaSenha.classList.add('media');
    } else if (entropia <= 35) {
        forcaSenha.classList.add('fraca');
    }

    const valorEntropia = document.querySelector('.entropia');
    valorEntropia.textContent = `Um computador pode levar até ${Math.floor(2 ** entropia / (100e6 * 60 * 60 * 24))} dias para descobrir essa senha.`;
}
