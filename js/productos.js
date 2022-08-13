// LLAMADA FUNCIONES 
dataSession();
constructorTablas(listadoProducto, "productos","producto");
// ---------------------

// EVENTOS
menuSecundarioProducto.addEventListener("click", () => mostrarFormulario("formProducto"));
cerrarFormularioProducto.addEventListener("click", () => ocultarFormulario("formProducto"));
formularioProducto.addEventListener("submit", validarFormProducto);
addIngrediente.addEventListener("click", selectIngredientes);