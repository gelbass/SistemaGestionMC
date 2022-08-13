// LLAMADA FUNCIONES
dataSession();
cargarSelect(listadoProducto,"Producto");
constructorTablas(inventarioMateriaPrima, "tbMateriales");
// ----------------

menuSecundarioMateriaPrima.addEventListener("click", () => mostrarFormulario("formInventario"));
cerrarFormularioMateriaPrima.addEventListener("click", () => ocultarFormulario("formInventario"));
formularioInventario.addEventListener("submit", validarFormInventarioMateriaPrima);