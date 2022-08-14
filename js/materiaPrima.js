let index = () =>{
    window.location.href = "../index.html"
};
sessionStorage.getItem("usuario")|| index();
sessionStorage.getItem("usuario")==="" &&  index();

dataSession();
constructorTablas(listadoMateriaPrima, "tbMateriaPrima","materiaPrima");
// EVENTOS
eventos();
let cerrarFormularioEdicionMateriaPrima = document.getElementById('cerrarFormularioEditarMp');
cerrarFormularioEdicionMateriaPrima.addEventListener("click", () => ocultarFormulario("editarFormMateriaPrima"));
editarFormularioMateriaPrima.addEventListener("submit", validarEditarFormMateriaPrima);
