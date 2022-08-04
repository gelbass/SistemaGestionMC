// LLAMADA FUNCIONES
dataSession();
constructorTablas(inventarioMateriaPrima, "tbMateriales");
// ----------------

menuSecundarioMateriaPrima.addEventListener("click", () => mostrarFormulario("formMateriaPrima"));
cerrarFormularioMateriaPrima.addEventListener("click", () => ocultarFormulario("formMateriaPrima"));
formularioMateriaPrima.addEventListener("submit", validarFormMateriaPrima);