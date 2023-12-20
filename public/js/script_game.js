'use strict'

console.log('Empieza el programa')

//------------------------variables globales----------------------
let wordArray = [];
let tecladoDiv = document.querySelector(".teclado");
let imagenDiv = document.querySelector("#ahorcado-img img");
let hint = document.querySelector(".pistas");
let guess = document.querySelector(".adivinar");
let intentos = document.querySelector(".intentos");
let palabraActual, contador = 0;
const contadorMax = 10;

$(document).ready(function(){
    cargarPalabras();
   
   
    

    // GENERAR TECLADO DINAMICAMENTE
   
    for(let i=97; i <= 122; i++ ){
        const button = $("<button></button>").text(String.fromCharCode(i));
        $(tecladoDiv).append(button);

    // CAPTURAR QUE LETRA SE PULSA
        button.on('click', e => descubrir(e.target,String.fromCharCode(i)))
    }

    //cargar json de palabras
    //funcion asyncrona
    async function cargarPalabras(){

        try {
            console.log(1); //borrar
            const res = await fetch('../app/model/palabras.json');
            const data = await res.json();

            data.forEach(item => {
                wordArray.push(item);
            });
            mostrarAleatorio();

        }catch (error) {
            console.error('Error al cargar el JSON:', error);
        }
    }

    function mostrarAleatorio(){
        if(wordArray.length > 0){

            let { palabra, pista } = wordArray[Math.floor(Math.random() * wordArray.length)];
            console.log(palabra, pista); //borrar
            palabraActual = palabra;
            $(hint).text(pista);
            guess.innerHTML = palabra.split("").map(() => `<li class="letras"></li>`).join("");
        }else{
            console.log('error, array vacio')
        }
    }
    
    //letras clicadas
    function descubrir(button,clicado){
        if(palabraActual.includes(clicado)){
            palabraActual.split('').forEach((letra,index)=> {
                if(letra === clicado){
                    guess.querySelectorAll("li")[index].innerText = letra;
                    guess.querySelectorAll("li")[index].classList.add("descubiertas");
                }
            });
        }else{
            contador++;
            imagenDiv.src = `img/${contador}.png`;
        } 
        $(intentos).text(`${contador} / ${contadorMax}`);

    }



    console.log(wordArray); //borrar
    
    
    
    


  
});












