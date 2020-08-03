const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const btnEmpezar = document.getElementById('btnEmpezar')
const puntajeText = document.getElementById('puntaje')
const ULTIMO_NIVEL = 10

class Juego {
    constructor() {
        //Se inicializa el juego.
        this.inicializar()
        this.generarSecuencia()

        setTimeout(() => {
            this.siguienteNivel()
        }, 500)
        
    }

    //Funcion para inicializar el juego. Esconde el boton.
    inicializar() {
        this.siguienteNivel = this.siguienteNivel.bind(this)
        this.elegirColor = this.elegirColor.bind(this)
        this.toggleBtnEmpezar()
        
        this.puntaje = 0
        this.nivel = 1
        this.colores = {
            celeste,
            violeta,
            naranja,
            verde
        }
    }

    toggleBtnEmpezar(){
        if(btnEmpezar.classList.contains('hide')){
            btnEmpezar.classList.remove('hide')
        }else{
            btnEmpezar.classList.add('hide')
        }
    }

    generarSecuencia(){
        this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random() * 4))  
    }

    siguienteNivel(){
        this.subnivel = 0
        this.iluminarSecuencia()
        this.agregarEventosClick()
        
    }

    transformarNumeroColor(numero){
        switch(numero){
            case 0:
                return 'celeste'
            case 1:
                return 'violeta'
            case 2:
                return 'naranja'
            case 3:
        }       return 'verde'
    }

    iluminarSecuencia(){
        for(let i = 0; i < this.nivel; i++){
            const color = this.transformarNumeroColor(this.secuencia[i])
            setTimeout(() => this.iluminarColor(color), 1000 * i) 
        }
    }

    iluminarColor(color){
        this.colores[color].classList.add('light')
        setTimeout(() => this.apagarColor(color), 350)
    }

    apagarColor(color){
        this.colores[color].classList.remove('light')
    }

    agregarEventosClick(){
        this.colores.celeste.addEventListener('click', this.elegirColor)
        this.colores.verde.addEventListener('click', this.elegirColor)
        this.colores.violeta.addEventListener('click', this.elegirColor)
        this.colores.naranja.addEventListener('click', this.elegirColor)
    }

    eliminarEventosClick(){
        this.colores.celeste.removeEventListener('click', this.elegirColor)
        this.colores.verde.removeEventListener('click', this.elegirColor)
        this.colores.violeta.removeEventListener('click', this.elegirColor)
        this.colores.naranja.removeEventListener('click', this.elegirColor)
    }

    elegirColor(ev){
        const nombreColor = ev.target.dataset.color
        const nuemroColor = this.transformarColorNumero(nombreColor)

        this.iluminarColor(nombreColor)

        if(nuemroColor === this.secuencia[this.subnivel]){
            this.subnivel++
            
            if(this.subnivel === this.nivel){

                this.nivel++
                this.eliminarEventosClick()

                this.puntaje += 10
                document.getElementById('puntaje').innerHTML = this.puntaje + " puntos"
                
                if(this.nivel === (ULTIMO_NIVEL + 1)){
                    this.ganaElJuego()
                }else{
                    setTimeout(this.siguienteNivel.bind(this), 1500)
                }

            }
        }else{
            
            this.pierdeElJuego()
        }
    }

    transformarColorNumero(color){
        switch(color){
            case 'celeste':
                return 0
            case 'violeta':
                return 1
            case 'naranja':
                return 2
            case 'verde':
        }       return 3
    }

    ganaElJuego(){
        swal('Juego', 'Felicitaciones, ganaste', 'success').then(() => {
            this.eliminarEventosClick()
            this.inicializar()
        })
    }

    pierdeElJuego(){
        swal('Juego', 'Lo lamento, perdiste', 'error').then(() => {
            this.eliminarEventosClick()
            this.inicializar()
        })
    }

    
}

//El click del boton llama esta funcion.
function empezarJuego() {
    //Se crea un objeto de la clase juego.
    var juego = new Juego()
}