dataSession();
cargarSelect(listadoProducto, "Productos");

const contadorVentas = (cantidadVenta) => {
    listaAnualVentas.find(elemento => {
        if (elemento.mesNumero === mesActual) {
            elemento.ventas.find(valor => valor.dia === diaActual) || elemento.ventas.push({
                dia: diaActual,
                venta: 0
            });
            ventasDiarias = elemento.ventas.find(valor => valor.dia === diaActual);
            ventasDiarias.venta += cantidadVenta;
        }
    });
    sessionStorage.setItem("ventaDiaria",ventasDiarias.venta);
    localStorage.setItem("historicoVentas", JSON.stringify(listaAnualVentas));
}

const agregarVentas = (nombreProducto, cantidad) => {
    let error = false;
    const producto = listadoProducto.find(valor => valor.nomProducto === nombreProducto);
    const materiales = producto.ingredientesProducto;

    materiales.forEach(elemento => {
        let material = elemento.ingrediente;
        let cantidadDescontar = elemento.cantidad * cantidad;
        let id = inventarioMateriaPrima.indexOf(inventarioMateriaPrima.find(valor => valor.materiaPrima === material.materiaPrima));
        let ingrediente = inventarioMateriaPrima.find(valor => valor.materiaPrima === material.materiaPrima);

        let cantidadNueva = ingrediente.cantidad - cantidadDescontar;
        cantidadNueva >= 0 ? inventarioMateriaPrima.splice(id, 1, {
            materiaPrima: material.materiaPrima,
            cantidad: cantidadNueva
        }) : error = true;
    });

    if (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error al ingresar la venta',
            text: 'Materia prima sin stock.',
        });
    } else {
        contadorVentas(cantidad);
        sessionStorage.setItem("inventarioMp", JSON.stringify(inventarioMateriaPrima));
        sessionStorage.setItem("nuevaSession", "no");
        Swal.fire({
            icon: 'success',
            title: 'Ingreso de venta',
            text: 'Venta ingresada exitosamente',
        });
    }
}
const validarFormVenta = (e) => {
    e.preventDefault();
    let producto = document.getElementById("selectProductos").value;
    let cantidad = parseInt(document.getElementById("cantidadVenta").value);
    agregarVentas(producto, cantidad);
    document.getElementById("selectProductos").value = "-";
    document.getElementById("cantidadVenta").value = "";
}
let ventaDiaria = sessionStorage.getItem("ventaDiaria");
document.getElementById("contadorVentas").innerText = ventaDiaria;
formularioVenta.addEventListener("submit", validarFormVenta);
// EVENTOS
eventos();