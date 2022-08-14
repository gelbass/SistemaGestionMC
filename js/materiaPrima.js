dataSession();
constructorTablas(listadoMateriaPrima, "tbMateriaPrima","materiaPrima");

// menuSecundarioMateriaPrima.addEventListener("click", () => mostrarFormulario("formMateriaPrima"));
// cerrarFormularioMateriaPrima.addEventListener("click", () => ocultarFormulario("formMateriaPrima"));
// EVENTOS
eventos();
// cerrarFormularioMateriaPrima.addEventListener("click", () => ocultarFormulario("editarFormMateriaPrima"));
editarFormularioMateriaPrima.addEventListener("submit", validarEditarFormMateriaPrima);
// formularioMateriaPrima.addEventListener("submit", validarFormMateriaPrima);
