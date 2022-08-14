let index = () =>{
    window.location.href = "../index.html"
};
sessionStorage.getItem("usuario")|| index();
sessionStorage.getItem("usuario")==="" &&  index();

// LLAMADA FUNCIONES
dataSession();
cargarSelect(listadoProducto,"Producto");
constructorTablas(inventarioMateriaPrima, "tbMateriales");
// ----------------

eventos();