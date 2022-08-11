// Seteo inicial de variables

let listadoProducto;
const listadoPrecios = [];

let productos;
let inventarioMateriaPrima;
let listadoMateriaPrima;
// -------------------------------

// BOTONES PARA EVENTOS
let menuSecundarioMateriaPrima = document.getElementById('addMateriaPrima');
let menuSecundarioProducto = document.getElementById('addProducto');

let cerrarFormularioMateriaPrima = document.getElementById('cerrarFormularioMp');
let cerrarFormularioProducto = document.getElementById('cerrarFormularioProducto');

let formularioMateriaPrima = document.getElementById('formMateriaPrima');
let editarFormularioMateriaPrima = document.getElementById('editarFormMateriaPrima');
let formularioProducto = document.getElementById('formProducto');

let addIngrediente = document.getElementById('addIngrediente');


// -------------------------------

// CONSTRUCTORES
class MateriaPrima {
    constructor(materiaPrima, cantidadEmpaque, costoEmpaque) {
        this.materiaPrima = materiaPrima;
        this.cantidadEmpaque = cantidadEmpaque;
        this.costoEmpaque = costoEmpaque;
    }

}
class Producto {
    constructor(nomProducto, ingredientesProducto) {
        this.nomProducto = nomProducto;
        this.ingredientesProducto = ingredientesProducto;
    };
}
// -------------------------------

// FUNCIONES

const materiaPrimaExiste = (array, elemento, opcion) => {
    if (opcion) {
        return array.some(resultado => resultado.materiaPrima == elemento);
    } else {
        return array.some(resultado => resultado.ingrediente.materiaPrima == elemento);
    }
}

const crearBotonAccion = () => {
    let tbody = document.getElementById("tbMateriaPrima");
    let row = tbody.getElementsByTagName('tr');
    let col = tbody.getElementsByClassName('accion')
    let boton = document.createElement("input");
    console.log(col);
    boton.type = "button";
    boton.className = "btn";
    col.appendChild(boton);
    // row.appendChild(boton);
    // tbody.appendChild(boton);
}

const mostrarFormularioEditable = (componente, materiaPrima, cantidad, costo) => {
    console.log("entro");
    let formulario = document.getElementById(componente);
    formulario.style.display = "block";
    let inputMateriaPrima = document.getElementById('nombreMateriaPrima');
    let inputCantidad = document.getElementById('cantidadEmpaque');
    let inputCosto = document.getElementById('costoEmpaque');
    inputMateriaPrima.value = materiaPrima;
    inputCantidad.value = cantidad;
    inputCosto.value = costo;
}

// CREAR TABLAS
const constructorTablas = (array, contenedor, tipo) => {
    switch (tipo) {
        case 'producto':
            for (const elemento of array) {
                let producto = document.createElement('h3');
                producto.innerHTML = elemento.nomProducto;
                console.log(elemento.nomProducto);
                document.getElementById(contenedor).append(producto);

                let tableP = document.createElement('table');
                let theadP = document.createElement('thead');
                let tbodyP = document.createElement('tbody');

                tableP.appendChild(theadP);
                tableP.appendChild(tbodyP);
                tableP.className = 'table';

                document.getElementById(contenedor).appendChild(tableP);

                let tituloP = document.createElement('tr');
                let tP1 = document.createElement('th');
                let tP2 = document.createElement('th');

                tP1.innerHTML = 'Materia Prima';
                tP2.innerHTML = 'Cantidad';

                tituloP.appendChild(tP1);
                tituloP.appendChild(tP2);
                theadP.appendChild(tituloP);
                for (const valorElemento of elemento.ingredientesProducto) {
                    let rowP = document.createElement('tr');
                    let colP1 = document.createElement('td');
                    let colP2 = document.createElement('td');

                    colP1.innerHTML = valorElemento.ingrediente.materiaPrima;
                    colP2.innerHTML = valorElemento.cantidad;
                    rowP.appendChild(colP1);
                    rowP.appendChild(colP2);
                    tbodyP.appendChild(rowP);
                }
            }
            break;
        case 'precios':
            for (const elemento of array) {
                let tbody = document.getElementById(contenedor);
                let row = document.createElement('tr');
                let col1 = document.createElement('td');
                col1.innerHTML = elemento.producto;
                let col2 = document.createElement('td');
                col2.innerHTML = elemento.precioVenta;
                row.appendChild(col1);
                row.appendChild(col2);
                tbody.appendChild(row);
            }
            break;
        case 'materiaPrima':
            document.querySelectorAll(`#${contenedor} tr`).forEach(elemento => elemento.remove());
            let i = 1;
            for (const elemento of array) {
                let tbodyDf = document.getElementById(contenedor);
                let rowM = document.createElement('tr');
                rowM.data = [elemento.materiaPrima, elemento.cantidadEmpaque, elemento.costoEmpaque];
                let colM1 = document.createElement('td');
                colM1.innerHTML = elemento.materiaPrima;
                let colM2 = document.createElement('td');
                colM2.innerHTML = elemento.cantidadEmpaque;
                let colM3 = document.createElement('td');
                colM3.innerHTML = elemento.costoEmpaque;
                let colM4 = document.createElement('td');
                
                colM4.className = "accion";
                let boton = document.createElement("input");
                // console.log(col);
                boton.type = "button";
                boton.className = `btn btn__sm btn_${i}`;
                boton.value = 'EDITAR';
                
                colM4.appendChild(boton);
                rowM.appendChild(colM1);
                rowM.appendChild(colM2);
                rowM.appendChild(colM3);
                rowM.appendChild(colM4);
                tbodyDf.appendChild(rowM);
                
                let editarMateriaPrimaBtn = document.querySelector(`.btn_${i}`);
                editarMateriaPrimaBtn.addEventListener("click", () => mostrarFormularioEditable("editarFormMateriaPrima", elemento.materiaPrima,elemento.cantidadEmpaque, elemento.costoEmpaque));
                i++;
            }

            break;
        default:
            document.querySelectorAll(`#${contenedor} tr`).forEach(elemento => elemento.remove());
            for (const elemento of array) {
                let tbodyDf = document.getElementById(contenedor);
                let rowM = document.createElement('tr');
                let colM1 = document.createElement('td');
                colM1.innerHTML = elemento.materiaPrima;
                let colM2 = document.createElement('td');
                colM2.innerHTML = elemento.cantidad;
                rowM.appendChild(colM1);
                rowM.appendChild(colM2);
                tbodyDf.appendChild(rowM);
            }
            break;
    }
}
// MANEJO DEL STORAGE

const dataJson = async () => {
    const restMateriaPrima = await fetch("./data/materiaPrima.json");
    const restInventarioMp = await fetch("./data/inventarioMateriaPrima.json");
    const restProductos = await fetch("./data/productos.json");
    const restHistoricoVentas = await fetch("./data/historicoVentas.json");

    const dataMateriaPrima = await restMateriaPrima.json();
    const dataInventarioMp = await restInventarioMp.json();
    const dataProductos = await restProductos.json();
    const dataHistoricoVentas = await restHistoricoVentas.json();

    const listadoMateriaPrimaJSON = JSON.stringify(dataMateriaPrima);
    const listadoInventarioMpJSON = JSON.stringify(dataInventarioMp);
    const listadoProductosJSON = JSON.stringify(dataProductos);
    const historicoVentasJSON = JSON.stringify(dataHistoricoVentas);

    localStorage.setItem("materiaPrima", listadoMateriaPrimaJSON);
    localStorage.setItem("inventarioMp", listadoInventarioMpJSON);
    localStorage.setItem("productos", listadoProductosJSON);
    localStorage.setItem("historicoVentas", historicoVentasJSON);
}

const sessionExistente = () => {
    sessionStorage.setItem("nuevaSession", "no");
    listadoMateriaPrima = JSON.parse(sessionStorage.getItem("materiaPrima"));
    inventarioMateriaPrima = JSON.parse(sessionStorage.getItem("inventarioMp"));
    listadoProducto = JSON.parse(sessionStorage.getItem("productos"));
}

const nuevoInicioSession = () => {
    listadoMateriaPrima = JSON.parse(localStorage.getItem("materiaPrima"));
    inventarioMateriaPrima = JSON.parse(localStorage.getItem("inventarioMp"));
    listadoProducto = JSON.parse(localStorage.getItem("productos"));
}

const calculoPrecio = (listadoMateriaPrima, listadoProducto) => {
    console.log("entro");
    console.log(listadoMateriaPrima);
    listadoPrecios.splice(0,listadoPrecios.length);
    console.log(listadoPrecios);
    for (const producto of listadoProducto) {
        let costoIngrediente = 0;
        const MANODEOBRA = 300;
        for (const ingredientes of producto.ingredientesProducto) {
            let ingredienteCalulo = ingredientes.ingrediente;
            const id = listadoMateriaPrima.find(valor => valor.materiaPrima === ingredienteCalulo.materiaPrima);
            costoIngrediente += (ingredientes.cantidad / id.cantidadEmpaque) * id.costoEmpaque;
            console.log(ingredientes.cantidad+" "+id.cantidadEmpaque +" "+ id.costoEmpaque);
        }
        let venta = costoIngrediente + MANODEOBRA
        listadoPrecios.push({
            producto: producto.nomProducto,
            precioVenta: venta.toFixed(2)
        });
    }
    sessionStorage.setItem("precios", JSON.stringify(listadoPrecios));
    precios = JSON.parse(sessionStorage.getItem("precios"));
    constructorTablas(precios, "tbListaPrecios", "precios");
}

const cargarDatos = async () => {
    await dataJson();
    sessionStorage.getItem("nuevaSession") || sessionStorage.setItem("nuevaSession", "si");
    sessionStorage.getItem("nuevaSession") == 'si' ? nuevoInicioSession() : sessionExistente();
}

// --------------------
// CONTROL FORMULARIOS
const mostrarFormulario = (componente) => {
    let formulario = document.getElementById(componente);
    formulario.style.display = "block";
}


const ocultarFormulario = (componente) => {
    let formulario = document.getElementById(componente);
    formulario.style.display = "none";
}

const selectIngredientes = () => {
    let tbody = document.getElementById("tbIngredientes");
    let row = document.createElement('tr');
    row.className = "ingredientes";
    let col1 = document.createElement('td');
    let col2 = document.createElement('td');

    let select = document.createElement("select");
    select.className = "form-select selectIngredientes";
    console.log(inventarioMateriaPrima);
    for (const item of inventarioMateriaPrima) {
        let opcion = document.createElement('option');
        opcion.setAttribute("value", item.materiaPrima);
        opcion.text = item.materiaPrima;
        select.append(opcion);
    }

    let input = document.createElement("input");
    input.type = "number";
    input.required;
    input.className = "form-control formulario__items cantidadIngrediente";
    col1.appendChild(select);
    col2.appendChild(input);
    row.appendChild(col1);
    row.appendChild(col2);

    tbody.appendChild(row);
}

const agregarMateriaPrima = (nombreMateriaPrima) => {
    let empaque = parseInt(document.getElementById('cantidadEmpaque').value);
    let costoEmpaque = parseInt(document.getElementById('costoEmpaque').value);
    let nuevaMateriaPrima = new MateriaPrima(nombreMateriaPrima.toUpperCase(), empaque,costoEmpaque);

    inventarioMateriaPrima.push(nuevaMateriaPrima);
    sessionStorage.setItem("inventarioMp", JSON.stringify(inventarioMateriaPrima));
    sessionStorage.setItem("nuevaSession", "no");
    inventarioMateriaPrima = JSON.parse(sessionStorage.getItem("materiaPrima"));
    document.getElementById('nombreMateriaPrima').value = "";
    document.getElementById('cantidadEmpaque').value = "";
    document.getElementById('costoEmpaque').value = "";
    Swal.fire({
        icon: 'success',
        title: 'Ingreso Exitoso',
        text: 'Ingreso correctamente materia prima',
    });
}
const editarMateriaPrima = (nombreMateriaPrima) => {
    let empaque = parseInt(document.getElementById('cantidadEmpaque').value);
    let costoEmpaque = parseInt(document.getElementById('costoEmpaque').value);
    let materiaPrimaEditada = new MateriaPrima(nombreMateriaPrima.toUpperCase(), empaque,costoEmpaque);
    let id = listadoMateriaPrima.indexOf(listadoMateriaPrima.find(valor => valor.materiaPrima === nombreMateriaPrima));

    listadoMateriaPrima.splice(id,1,materiaPrimaEditada);

    sessionStorage.setItem("materiaPrima", JSON.stringify(listadoMateriaPrima));
    sessionStorage.setItem("nuevaSession", "no");
    document.getElementById('nombreMateriaPrima').value = "";
    document.getElementById('cantidadEmpaque').value = "";
    document.getElementById('costoEmpaque').value = "";
    Swal.fire({
        icon: 'success',
        title: 'Modificación Exitosa',
        text: 'Se modifico correctamente la materia prima',
    });
}

const agregarIngredientesProducto = (ingredientes, cantidad, seleccion) => {
    inventarioMateriaPrima.find(elemento => {
        if (elemento.materiaPrima === seleccion.value) {
            ingredientes.push({
                ingrediente: elemento,
                cantidad: cantidad
            });
        }
    });
}

const agregarProducto = (nombreProducto, ingredientes) => {
    let producto = new Producto(nombreProducto.value.toUpperCase(), ingredientes);
    listadoProducto.push(producto);
    sessionStorage.setItem("nuevaSession", "no");
    sessionStorage.setItem("productos", JSON.stringify(listadoProducto));
    // constructorTablas(sessionStorage.getItem("productos"), "productos", "producto");
    ocultarFormulario("formProducto");
    // nombreProducto.innerHTML = "";
    // document.querySelectorAll('.tbIngredientes tr.ingredientes').forEach(elemento => elemento.remove());
    // Listado de precios        
    // listadoPrecios = sessionStorage.setItem("listadoPrecios", JSON.stringify(listadoPrecios));
    // constructorTablas(listadoPrecios, "tbListaPrecios", "precios");
    Swal.fire({
        icon: 'success',
        title: 'Ingreso Exitoso',
        text: 'Ingreso correctamente el producto',
    });

}

const validarFormMateriaPrima = (e) => {
    e.preventDefault();
    let nombreMateriaPrima = document.getElementById('nombreMateriaPrima').value;
    materiaPrimaExiste(listadoMateriaPrima, nombreMateriaPrima.toUpperCase(), true) == false ? agregarMateriaPrima(nombreMateriaPrima) : Swal.fire({
        icon: 'error',
        title: 'Error. Ingreso de materia prima',
        text: 'Ya la materia prima fue ingresada.\n Favor ingrese nueva materia prima',
    });
    nombreMateriaPrima.innerHTML = "";
    ocultarFormulario("formMateriaPrima");
}
const validarEditarFormMateriaPrima = (e) => {
    e.preventDefault();
    let nombreMateriaPrima = document.getElementById('nombreMateriaPrima').value;
    editarMateriaPrima(nombreMateriaPrima)
    document.getElementById('nombreMateriaPrima').value = "";
    ocultarFormulario("editarFormMateriaPrima");
    constructorTablas(listadoMateriaPrima, "tbMateriaPrima","materiaPrima");
}

const validarFormProducto = (e) => {
    e.preventDefault();
    const ingredientes = [];
    let existeMateriaPrima = false;
    let nombreProducto = document.querySelector('#nombreProducto');

    // Seleccionar todos los ingedientes del producto
    const ingredientesSelecionados = document.querySelectorAll('.tbIngredientes tr.ingredientes');
    for (let i = 0; i < ingredientesSelecionados.length; i++) {
        let ingrediente = ingredientesSelecionados[i];
        let seleccion = ingrediente.querySelector(".selectIngredientes");
        let cantidad = parseInt(ingrediente.querySelector('.cantidadIngrediente').value);
        !materiaPrimaExiste(ingredientes, seleccion.value, false) ? agregarIngredientesProducto(ingredientes, cantidad, seleccion) : existeMateriaPrima = true;
    }!existeMateriaPrima ? agregarProducto(nombreProducto, ingredientes) : Swal.fire({
        icon: 'error',
        title: 'Error. Ingreso de producto',
        text: 'No puede seleccionar varias veces la misma materia prima.',
    });
}
const dataSession = () => {
    sessionStorage.setItem("nuevaSession", "no");
    sessionStorage.getItem("materiaPrima") || sessionStorage.setItem("materiaPrima", localStorage.getItem("materiaPrima"));
    sessionStorage.getItem("productos") || sessionStorage.setItem("productos", localStorage.getItem("productos"));
    sessionStorage.getItem("inventarioMp") || sessionStorage.setItem("inventarioMp", localStorage.getItem("inventarioMp"));
    productos = JSON.parse(sessionStorage.getItem("productos"));
    inventarioMateriaPrima = JSON.parse(sessionStorage.getItem("inventarioMp"));
    listadoMateriaPrima = JSON.parse(sessionStorage.getItem("materiaPrima"));
}
// -------------------------------
