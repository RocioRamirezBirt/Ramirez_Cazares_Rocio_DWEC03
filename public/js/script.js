'use strict'

console.log('Empieza el programa')
$(document).ready(function(){
    cargarUsuarios()
// ------------------- VARIABLES GLOBALES ------------------------
var usuario;
var pass;
$("#miTextBox").hide();


// ------------------- FUNCIONES ------------------------


function cargarUsuarios(){
    let path = '../app/model/usuarios.json'

    fetch(path)
    .then(response => response.json())
    .then(data => {
        console.log('desde cargar', data); //borrar

        localStorage.setItem('datos',JSON.stringify(data));
    })

    recuperar()
    
}

function recuperar(){
    var btn = $('#btn');

    //click
    btn.click(function(event){
    console.log("Click detectado"); // Verifica si el evento de clic se está ejecutando correctamente

    event.preventDefault();
    
    var usuarioIngresado = $('#username').val();
    var passIngresado = $('#password').val();

    console.log('usuario Ingresado',usuarioIngresado);
    console.log('passIngresado',passIngresado);  //borrar

    validar(usuarioIngresado,passIngresado);



    })

}

function validar(usuario,pass){

    console.log('validar',usuario);
    console.log('validar',pass)  //borrar

    let users = JSON.parse(localStorage.getItem('datos'));

    let userRegistered = users.find(user => user.usuario === usuario);
    let passRegistered = users.find(user => user.contraseña === pass);

    if(userRegistered&&passRegistered){
        // Expresión regular para verificar si la contraseña contiene solo caracteres alfanuméricos
        let alphaRegex = /^[a-zA-Z0-9]+$/;

        if (pass.match(alphaRegex)){
            window.open("./game.html");

        }else{
             // Verificar si la contraseña contiene caracteres especiales
            let specialCharRegex = /[!@#$%^&*()+\-/:;<=>?@[\\\]^_`{|\}]/;    
            if (pass.match(specialCharRegex)) {
                // Mostrar mensaje de error y el carácter especial
                let specialChar = pass.match(specialCharRegex)[0];
                //console.log(`La contraseña no puede contener el carácter especial: ${specialChar}`);
                $("#miTextBox").val(`La contraseña no puede  contener el carácter especial: ${specialChar}`).show();
            }                 
        }
    }else{
        // Usuario no encontrado
        console.log('El usuario no está registrado');
        $("#miTextBox").val(`El usuario no esta registrado`).show();
    }

}






// ------------------- MAIN ------------------------

// TODO: añadimos los socios iniciales cuando empieza el programa



console.log('Acaba el programa')



});












