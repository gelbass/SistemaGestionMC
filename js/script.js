// SIMULADOR DE PRESUPUESTOS PARA DULCES

// Seteo inicial de variables

const listadoProducto = [];
const listadoPrecios = [];
let nuevaSession;
let listadoMateriaPrima;
// -------------------------------

// LISTADO DE INGREDIENTES BASICOS PARA EL LOCALSTORAGE
const listadoMateriaPrimaLocal = [{
        materiaPrima: "HARINA",
        cantidadEmpaque: 1000,
        costoEmpaque: 45
    },
    {
        materiaPrima: "AZUCAR",
        cantidadEmpaque: 1000,
        costoEmpaque: 50
    },
    {
        materiaPrima: "MANTEQUILLA",
        cantidadEmpaque: 250,
        costoEmpaque: 95
    },
    {
        materiaPrima: "HUEVOS",
        cantidadEmpaque: 30,
        costoEmpaque: 200
    },
    {
        materiaPrima: "LECHE",
        cantidadEmpaque: 1000,
        costoEmpaque: 35
    }
];
// -------------------------------

// BOTONES PARA EVENTOS
let menuSecundarioMateriaPrima = document.getElementById('addMateriaPrima');
let menuSecundarioProducto = document.getElementById('addProducto');

let cerrarFormularioMateriaPrima = document.getElementById('cerrarFormularioMp');
let cerrarFormularioProducto = document.getElementById('cerrarFormularioProducto');

let formularioMateriaPrima = document.getElementById('formMateriaPrima');
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
/* const {
    materiaPrima,
    cantidadEmpaque,
    costoEmpaque
} = MateriaPrima; */

class Producto {
    constructor(nomProducto, ingredientesProducto) {
        this.nomProducto = nomProducto;
        this.ingredientesProducto = ingredientesProducto;
    };
}

/* const {
    nomProducto,
    ingredientesProducto
} = Producto; */

// -------------------------------

// FUNCIONES
const validarTexto = (texto, mensaje) => {
    let validar = /\d/;
    while (validar.test(texto) || texto === "") {
        texto = prompt(mensaje);
    }
    return texto;
};


const materiaPrimaExiste = (array, elemento, opcion) => {
    if (opcion) {
        return array.some(resultado => resultado.materiaPrima == elemento);
    } else {
        return array.some(resultado => resultado.ingrediente.materiaPrima == elemento);
    }
}

const costoPorIngrediente = (producto) => {
    let costoIngrediente = 0;
    const MANODEOBRA = 300;
    for (const item of producto.ingredientesProducto) {
        costoIngrediente += (item.cantidad / item.ingrediente.cantidadEmpaque) * item.ingrediente.costoEmpaque;
    };
    let venta = costoIngrediente + MANODEOBRA
    listadoPrecios.push({
        producto: producto.nomProducto,
        precioVenta: venta
    });
    return venta;
}


// CREAR TABLAS
const constructorTablas = (array, contenedor, tipo) => {
    switch (tipo) {
        case 'producto':
            let producto = document.createElement('h3');
            producto.innerHTML = array.nomProducto;
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
            for (const valorElemento of array.ingredientesProducto) {
                let rowP = document.createElement('tr');
                let colP1 = document.createElement('td');
                let colP2 = document.createElement('td');

                colP1.innerHTML = valorElemento.ingrediente.materiaPrima;
                colP2.innerHTML = valorElemento.cantidad;
                rowP.appendChild(colP1);
                rowP.appendChild(colP2);
                tbodyP.appendChild(rowP);
            }
            break;
        case 'precios':
            let tbody = document.getElementById(contenedor);
            let venta = costoPorIngrediente(array);
            let row = document.createElement('tr');
            let col1 = document.createElement('td');
            col1.innerHTML = array.nomProducto;
            let col2 = document.createElement('td');
            col2.innerHTML = venta.toFixed(2);
            row.appendChild(col1);
            row.appendChild(col2);
            tbody.appendChild(row);
            break;
        default:
            document.querySelectorAll(`#${contenedor} tr`).forEach(elemento => elemento.remove());
            for (const elemento of array) {
                let tbodyDf = document.getElementById(contenedor);
                let rowM = document.createElement('tr');
                let colM1 = document.createElement('td');
                colM1.innerHTML = elemento.materiaPrima;
                let colM2 = document.createElement('td');
                colM2.innerHTML = elemento.cantidadEmpaque;
                let colM3 = document.createElement('td');
                colM3.innerHTML = elemento.costoEmpaque;

                rowM.appendChild(colM1);
                rowM.appendChild(colM2);
                rowM.appendChild(colM3);
                tbodyDf.appendChild(rowM);
            }
            break;
    }
}
// MANEJO DEL STORAGE
const listadoMateriaPrimaJSON = JSON.stringify(listadoMateriaPrimaLocal);
localStorage.setItem("inventario", listadoMateriaPrimaJSON);
const inventario = JSON.parse(localStorage.getItem("inventario"));

let nuevaSessionStorage = sessionStorage.getItem("nuevaSession");

if (nuevaSessionStorage) {
    nuevaSession = nuevaSessionStorage;
    listadoMateriaPrima = JSON.parse(sessionStorage.getItem("inventario"));
    constructorTablas(listadoMateriaPrima, "tbMateriales");
} else {
    listadoMateriaPrima = JSON.parse(localStorage.getItem("inventario"));
    sessionStorage.setItem("nuevaSession", "si");
    constructorTablas(listadoMateriaPrima, "tbMateriales");
}

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

    for (const item of listadoMateriaPrima) {
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

const validarFormMateriaPrima = (e) => {
    e.preventDefault();
    let nombreMateriaPrima = document.getElementById('nombreMateriaPrima').value;
    if (!materiaPrimaExiste(listadoMateriaPrima, nombreMateriaPrima.toUpperCase(), true)) {
        let empaque = parseInt(document.getElementById('cantidadEmpaque').value);
        let costoEmpaque = parseInt(document.getElementById('costoEmpaque').value);
        let materiaPrima = new MateriaPrima(nombreMateriaPrima.toUpperCase(), empaque, costoEmpaque);
        listadoMateriaPrima.push(materiaPrima);
        sessionStorage.setItem("inventario", JSON.stringify(listadoMateriaPrima));
        sessionStorage.setItem("nuevaSession", "no");
        constructorTablas(JSON.parse(sessionStorage.getItem("inventario")), "tbMateriales");
        empaque.innerHTML = "";
        costoEmpaque.innerHTML = "";
    } else {
        alert("PRODUCTO YA INGRESADO");
    }
    nombreMateriaPrima.innerHTML = "";
    ocultarFormulario("formMateriaPrima");
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
        let cantidad = parseInt(ingrediente.querySelector('.cantidadIngrediente').value)

        if (!materiaPrimaExiste(ingredientes, seleccion.value, false)) {
            listadoMateriaPrima.find(elemento => {
                if (elemento.materiaPrima === seleccion.value) {
                    ingredientes.push({
                        ingrediente: elemento,
                        cantidad: cantidad
                    });
                }
            });
        } else {
            existeMateriaPrima = true
            alert("MATERIA PRIMA YA INGRESADA");
        }
    }

    if (!existeMateriaPrima) {
        let producto = new Producto(nombreProducto.value.toUpperCase(), ingredientes);
        listadoProducto.push(producto);
        constructorTablas(producto, "productos", "producto");
        ocultarFormulario("formProducto");
        nombreProducto.innerHTML = "";
        document.querySelectorAll('.tbIngredientes tr.ingredientes').forEach(elemento => elemento.remove());
        sessionStorage.setItem("productos", JSON.stringify(listadoProducto));
        // Listado de precios        
        constructorTablas(producto, "tbListaPrecios", "precios");
        sessionStorage.setItem("listadoPrecios", JSON.stringify(listadoPrecios));
    }
}
// -------------------------------

// EVENTOS
menuSecundarioMateriaPrima.addEventListener("click", () => mostrarFormulario("formMateriaPrima"));
cerrarFormularioMateriaPrima.addEventListener("click", () => ocultarFormulario("formMateriaPrima"));

menuSecundarioProducto.addEventListener("click", () => mostrarFormulario("formProducto"));
cerrarFormularioProducto.addEventListener("click", () => ocultarFormulario("formProducto"));

formularioMateriaPrima.addEventListener("submit", validarFormMateriaPrima);
formularioProducto.addEventListener("submit", validarFormProducto);

addIngrediente.addEventListener("click", selectIngredientes);

// -------------------------------

// MOSTRAR LISTADO DEL LOCAL STORAGE
// -------------------------------