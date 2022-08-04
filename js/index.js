// LLAMADA FUNCIONES 
cargarDatos();
// ----------------

// EVENTOS
menuSecundarioMateriaPrima.addEventListener("click", () => mostrarFormulario("formMateriaPrima"));
cerrarFormularioMateriaPrima.addEventListener("click", () => ocultarFormulario("formMateriaPrima"));

menuSecundarioProducto.addEventListener("click", () => mostrarFormulario("formProducto"));
cerrarFormularioProducto.addEventListener("click", () => ocultarFormulario("formProducto"));

formularioMateriaPrima.addEventListener("submit", validarFormMateriaPrima);
formularioProducto.addEventListener("submit", validarFormProducto);

addIngrediente.addEventListener("click", selectIngredientes);
// -------------------------------