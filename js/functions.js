const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const btnEmpezar = document.getElementById('btnEmpezar')
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
        btnEmpezar.classList.add('hide')
        this.nivel = 1
        this.colores = {
            celeste,
            violeta,
            naranja,
            verde
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
        setTimeout(() => this.apagarColor(color), 1000)
    }

    apagarColor(color){
        this.colores[color].classList.remove('light')
    }

    agregarEventosClick(){
        this.colores.celeste.addEventListener('click', this.elegirColor.bind(this))
        this.colores.verde.addEventListener('click', this.elegirColor.bind(this))
        this.colores.violeta.addEventListener('click', this.elegirColor.bind(this))
        this.colores.naranja.addEventListener('click', this.elegirColor.bind(this))
    }

    eliminarEventosClick(){
        this.colores.celeste.removeEventListener('click', this.elegirColor.bind(this))
        this.colores.verde.removeEventListener('click', this.elegirColor.bind(this))
        this.colores.violeta.removeEventListener('click', this.elegirColor.bind(this))
        this.colores.naranja.removeEventListener('click', this.elegirColor.bind(this))
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
                
                if(this.nivel === (ULTIMO_NIVEL + 1)){
                    //GANADOR!
                }else{
                    setTimeout(this.siguienteNivel.bind(this), 3000)
                }

            }
        }else{
            console.log("PERDISTE")
            //PERDEDOR
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

    
}

//El click del boton llama esta funcion.
function empezarJuego() {
    //Se crea un objeto de la clase juego.
    var juego = new Juego()
}