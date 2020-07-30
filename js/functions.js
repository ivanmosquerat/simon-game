const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const btnEmpezar = document.getElementById('btnEmpezar')

class Juego {
    constructor() {
        //Se inicializa el juego.
        this.inicializar()
    }

    //Funcion para inicializar el juego. Esconde el boton.
    inicializar() {
        btnEmpezar.classList.add('hide')
    }
}

//El click del boton llama esta funcion.
function empezarJuego() {
    //Se crea un objeto de la clase juego.
    var juego = new Juego()
}