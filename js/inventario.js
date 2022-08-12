// LLAMADA FUNCIONES
dataSession();
constructorTablas(inventarioMateriaPrima, "tbMateriales");
// ----------------

menuSecundarioMateriaPrima.addEventListener("click", () => mostrarFormulario("formInventario"));
cerrarFormularioMateriaPrima.addEventListener("click", () => ocultarFormulario("formInventario"));
formularioInventario.addEventListener("submit", validarFormInventarioMateriaPrima);