//// FUNCIÓN PARA CAMBIAR HEADER ////
const BACKEND_URL = "http://localhost:3000"

function CambiarHeader(fotoPerfil){
    const btnLogin = document.getElementById("btn-login");
    const btnRegister = document.getElementById("btn-register");
    const perfil = document.getElementById("perfil-container");
    const img = document.getElementById("perfil-foto");

    const receta = document.getElementById("CreaReceta");

    if(btnLogin) btnLogin.style.display = "none";
    if(btnRegister) btnRegister.style.display = "none";

    if(perfil && img){        
        img.src = BACKEND_URL + fotoPerfil ;
        perfil.style.display = "block";
        receta.style.display = "block";
    }
}

// ACTUALIZAR HEADER AL CARGAR CUALQUIER PÁGINA
document.addEventListener("DOMContentLoaded", () => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if(usuario && usuario.foto){
        CambiarHeader(usuario.foto);
    }
});
