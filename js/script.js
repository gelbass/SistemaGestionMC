// SIMULADOR DE PRESUPUESTOS PARA DULCES

// Seteo inicial de variables
let salir = true;
let nuevoIngrediente = true;
let seleccionado = true;
let mensaje = "";
let texto = "";
let producto = "";
let numero = 0;
let costo = 0.0;
const listadoMateriaPrima = [];
const listadoProducto = [];
const listadoPrecios = [];

let menuSecundarioMateriaPrima = document.getElementById('addMateriaPrima');
let menuSecundarioProducto = document.getElementById('addProducto');

let cerrarFormularioMateriaPrima = document.getElementById('cerrarFormularioMp');
let cerrarFormularioProducto = document.getElementById('cerrarFormularioProducto');

let formularioMateriaPrima = document.getElementById('formMateriaPrima');
let formularioProducto = document.getElementById('formProducto');

let addIngrediente = document.getElementById('addIngrediente');


class MateriaPrima {
    constructor(materiaPrima, cantidadEmpaque, costo) {
        this.materiaPrima = materiaPrima;
        this.cantidadEmpaque = cantidadEmpaque;
        this.costo = costo;
    }

}

class Producto {
    constructor(nomProducto, ingredientes) {
        this.nomProducto = nomProducto;
        this.ingredientes = ingredientes;
    };

}

// Funciones
validarNumeros = (numero, mensaje) => {
    while (isNaN(numero) || numero === "") {
        numero = parseInt(prompt(mensaje));
    }
    return numero;
};

validarTexto = (texto, mensaje) => {
    let validar = /\d/;
    while (validar.test(texto) || texto === "") {
        texto = prompt(mensaje);
    }
    return texto;
};

validarOpcionContinuar = (opcion, mensaje) => {
    let valida = false;
    while (!valida) {
        if (opcion === "1") {
            valida = true;
            return true;
            break;
        } else if (opcion === "2") {
            valida = true;
            return false;
            break;
        } else {
            valida = false;
        }
        opcion = prompt(mensaje);
    }
}

nombresMateriaPrima = () => {
    let seleccion = document.getElementById("selectIngredientes");
    let opcion = document.createElement('option');
    for (const item of listadoMateriaPrima) {
        opcion.setAttribute("value", item.materiaPrima);
        opcion.text = item.materiaPrima;
        seleccion.appendChild(opcion);
    }
}

const existe = materiaPrimaExistente = (array, elemento, opcion) => {
    if (opcion) {
        return array.some(resultado => resultado.materiaPrima == elemento);
    } else {
        return array.some(resultado => resultado.ingrediente.materiaPrima == elemento);
    }
}

const costoPorIngrediente = (producto) => {
    let costoIngrediente = 0;
    const MANODEOBRA = 300;
    for (const item of producto.ingredientes) {
        costoIngrediente += (item.cantidad / item.ingrediente.cantidadEmpaque) * item.ingrediente.costo;
    }
    return costoIngrediente + MANODEOBRA;
}

// CREAR TABLAS
const constructorTablas = (array, contenedor, tipo) => {
    switch (tipo) {
        case 'materiaPrima':
            let tbodyM = document.getElementById('tbMateriales');

            let rowM = document.createElement('tr');
            let colM1 = document.createElement('td');
            colM1.innerHTML = array.materiaPrima;
            let colM2 = document.createElement('td');
            colM2.innerHTML = array.cantidadEmpaque;
            let colM3 = document.createElement('td');
            colM3.innerHTML = array.costo;

            rowM.appendChild(colM1);
            rowM.appendChild(colM2);
            rowM.appendChild(colM3);
            tbodyM.appendChild(rowM);

            break;

        case 'producto':
            for(const elemento of array){
            let producto = document.createElement('h3');

            producto.innerHTML = elemento.nomProducto;
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
            console.log(elemento);
            for (const valorElemento of elemento.ingredientes) {
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
            let table = document.createElement('table');
            let thead = document.createElement('thead');
            let tbody = document.createElement('tbody');
            table.appendChild(thead);
            table.appendChild(tbody);
            table.className = 'table';
            document.getElementById(contenedor).appendChild(table);

            let titulo = document.createElement('tr');
            let t1 = document.createElement('th');
            let t2 = document.createElement('th');

            t1.innerHTML = 'Producto';
            t2.innerHTML = 'Precio de Venta';

            titulo.appendChild(t1);
            titulo.appendChild(t2);
            thead.appendChild(titulo);
            
            for (const producto of array) {
                let venta = costoPorIngrediente(producto);
                let row = document.createElement('tr');
                let col1 = document.createElement('td');
                col1.innerHTML = producto.nomProducto;
                let col2 = document.createElement('td');
                col2.innerHTML = venta.toFixed(2);

                row.appendChild(col1);
                row.appendChild(col2);
                tbody.appendChild(row);
            }
            break;
        default:
            break;
    }
}

mostrarFormularioMP = () => {
    let formulario = document.getElementById("formMateriaPrima");
    formulario.style.opacity = 1;
    formulario.style.zIndex = 1;
}
mostrarFormularioProd = () => {
    let formulario = document.getElementById("formProducto");
    formulario.style.opacity = 1;
    formulario.style.zIndex = 1;
    nombresMateriaPrima();
}

ocultarFormularioMP = () => {
    let formulario = document.getElementById("formMateriaPrima");
    formulario.style.opacity = 0;
    formulario.style.zIndex = 0;
}

ocultarFormularioProd = () => {
    let formulario = document.getElementById("formProducto");
    formulario.style.opacity = 0;
    formulario.style.zIndex = 0;
}

selectIngredientes = () => {
    nombresMateriaPrima();    
    // Solo me carga el primer select, los demas no carga los valores del la lista de materia prima
    document.getElementById("tbIngredientes").insertRow(-1).innerHTML = `<tr>
    <td>
        <select class="form-select" id="selectIngredientes">
            <option selected>Selecciona un ingrediente</option>
        </select>
    </td>
    <td>
        <input id="cantidadIngrediente" class="form-control formulario__items" type="number"
            name="cantidadIngrediente" placeholder="Cantidad ingrediente" required>
    </td>
</tr>`;
}

validarFormProducto = (e) => {
    e.preventDefault();
    let nombreProducto = document.querySelector('#nombreProducto').value;
    let seleccion = document.querySelector("#selectIngredientes").value;

    const ingredientes = [];

    /* Me devuelve -1 apesar que el elemento esta en la lista
    let id = listadoMateriaPrima.indexOf(seleccion)
    console.table(listadoMateriaPrima);
    console.log(id);

    coloque el primer elemento por defecto para pruebas
 */
    ingredientes.push({
        ingrediente: listadoMateriaPrima[0],
        cantidad: document.querySelector('#cantidadIngrediente').value
    });

    let producto = new Producto(nombreProducto, ingredientes)
    listadoProducto.push(producto);

    constructorTablas(listadoProducto, "productos", "producto");
    ocultarFormularioProd();

    // Listado de precios
    constructorTablas(listadoProducto, "listaPrecios", "precios");
}

validarFormMateriaPrima = (e) => {
    e.preventDefault();
    let nombreMateriaPrima = document.querySelector("#nombreMateriaPrima").value;
    if (!existe(listadoMateriaPrima, nombreMateriaPrima, true)) {
        let cantidadEmpaque = document.querySelector("#cantidadEmpaque").value;
        let costoEmpaque = document.querySelector("#costoEmpaque").value;
        let materiaPrima = new MateriaPrima(nombreMateriaPrima, cantidadEmpaque, costoEmpaque)
        listadoMateriaPrima.push(materiaPrima);
        constructorTablas(materiaPrima, "tbMateriaPrima", "materiaPrima");
    } else {
        alert("PRODUCTO YA INGRESADO");
    }
    ocultarFormularioMP();
}

// EVENTOS
menuSecundarioMateriaPrima.addEventListener("click", mostrarFormularioMP);
cerrarFormularioMateriaPrima.addEventListener("click", ocultarFormularioMP);

menuSecundarioProducto.addEventListener("click", mostrarFormularioProd);
cerrarFormularioProducto.addEventListener("click", ocultarFormularioProd);

formularioMateriaPrima.addEventListener("submit", validarFormMateriaPrima);
formularioProducto.addEventListener("submit", validarFormProducto);

addIngrediente.addEventListener("click", selectIngredientes);