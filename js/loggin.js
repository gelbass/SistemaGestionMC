let formulariologgin = document.getElementById('formLoggin');

const USUARIO = "Demo";
const PASSWORD = "1234Demo";

sessionStorage.getItem("usuario") && sessionStorage.setItem("usuario","");

const logginOK = (usuario) => {
    sessionStorage.setItem("usuario", usuario);
    formulariologgin.submit();
}

const loggin = (e) => {
    e.preventDefault();
    let usuarioForm = document.getElementById("usuario").value;
    let passwordForm = document.getElementById("password").value;
    console.log(usuarioForm);
    console.log(passwordForm);
    usuarioForm === USUARIO && passwordForm === PASSWORD ?  logginOK(usuarioForm): Swal.fire({
        icon: 'error',
        title: 'ERROR',
        text: 'Usuario o contraseña invalida',
    });
    document.getElementById("usuario").value="";
    document.getElementById("password").value="";
}

formulariologgin.addEventListener("submit", loggin);