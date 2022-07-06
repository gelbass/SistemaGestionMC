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

nombresMateriaPrima = (array) => {
    let nombre = "";
    let i = 1;
    for (const item of array) {
        nombre = `${nombre} ${i} - ${item.materiaPrima}.\n`;
        i++;
    }
    return nombre;
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
            let tableM = document.createElement('table');
            let theadM = document.createElement('thead');
            let tbodyM = document.createElement('tbody');
            tableM.appendChild(theadM);
            tableM.appendChild(tbodyM);
            tableM.className = 'table';
            document.getElementById(contenedor).appendChild(tableM);

            let tituloM = document.createElement('tr');
            let tM1 = document.createElement('th');
            let tM2 = document.createElement('th');
            let tM3 = document.createElement('th');

            tM1.innerHTML = 'Materia Prima';
            tM2.innerHTML = 'Cant. Empaque';
            tM3.innerHTML = 'Costo';

            tituloM.appendChild(tM1);
            tituloM.appendChild(tM2);
            tituloM.appendChild(tM3);
            theadM.appendChild(tituloM);

            for (const elemento of array) {
                let rowM = document.createElement('tr');
                let colM1 = document.createElement('td');
                colM1.innerHTML = elemento.materiaPrima;
                let colM2 = document.createElement('td');
                colM2.innerHTML = elemento.cantidadEmpaque;
                let colM3 = document.createElement('td');
                colM3.innerHTML = elemento.costo;

                rowM.appendChild(colM1);
                rowM.appendChild(colM2);
                rowM.appendChild(colM3);
                tbodyM.appendChild(rowM);
            }
            break;

        case 'producto':
            for (const elemento of listadoProducto) {
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

// INICIO DE SIMULADOR
while (salir) {
    alert("···· SIMULADOR DE COSTOS ····")
    let opcion = prompt("···· SIMULADOR DE COSTOS ····\n1. Ingresar Materia Prima. \n2. Ingreso de producto a preparar. \n3. Calculo de costos.\n0. Visualizar datos.");

    switch (opcion) {
        case "1":
            while (nuevoIngrediente) {
                let nomMateriaPrima = prompt("Indique la materia prima:");
                mensaje = "ERROR: INGRESE SOLO TEXTO.\nIndique la materia prima:"
                let nomMateriaPrimaValido = validarTexto(nomMateriaPrima.toUpperCase(), mensaje);
                if (!existe(listadoMateriaPrima, nomMateriaPrimaValido, true)) {
                    let cantidadEmpaque = parseInt(validarNumeros(prompt(`Producto: ${nomMateriaPrimaValido}\nIngrese cantidad del empaque:`), "ERROR: INGRESE SOLO NUMEROS\nIngrese nuevamente la cantidad del empaque:"));
                    let costoMateriaPrima = parseInt(validarNumeros(prompt(`Producto: ${nomMateriaPrimaValido}\nIngrese costo del empaque:`), "ERROR: INGRESE SOLO NUMEROS\nIngrese nuevamente el costo del empaque:"));
                    listadoMateriaPrima.push(new MateriaPrima(nomMateriaPrimaValido, cantidadEmpaque, costoMateriaPrima));
                    nuevoIngrediente = validarOpcionContinuar(prompt("¿Desea ingresar un nuevo Ingrediente?\n1 - Si.\n2 - No."), "ERROR: Opcion Incorrecta.\n¿Desea ingresar un nuevo Ingrediente?\n1 - Si.\n2 - No.");
                    /* 
                    for (const producto of listadoMateriaPrima) {
                        let columna = document.createElement("td");
                        let contenido = document.createTextNode(producto);
                        document.querySelector("#materiales__td").columna.append(contenido);
                    } */

                } else {
                    alert(`ERROR: YA EL PRODUCTO ${nomMateriaPrimaValido} FUE AGREGADO.\nDebe ingresar un nuevo ingrediente`);
                }
            }
            nuevoIngrediente = true;
            break;

        case "2":
            const ingredientes = [];

            producto = prompt("Indique que producto desea realizar:");
            mensaje = "ERROR: INGRESE SOLO TEXTO.\nIngrese producto:"
            let productoValido = validarTexto(producto.toUpperCase(), mensaje);

            if (listadoMateriaPrima.length < 1) {
                alert("ERROR: NO  HAY MATERIA PRIMA.\n Debe ingresar previamente la materia prima.");
            } else {
                let cantidadIngredintes = listadoMateriaPrima.length;

                while (seleccionado) {
                    let seleccionIngrediente = validarNumeros(prompt(`Produto: ${productoValido}\nSeleccione el ingrediente los ingredientes autilizar:\n${nombresMateriaPrima(listadoMateriaPrima)}\n 0 - No ingresar mas ingredientes`), "ERROR: INGRESE SOLO NUMEROS\n");

                    if (seleccionIngrediente == 0) {
                        seleccionado = false;
                    } else if (seleccionIngrediente <= cantidadIngredintes) {

                        seleccionIngrediente = seleccionIngrediente - 1;
                        for (let i = 0; i < listadoMateriaPrima.length; i++) {
                            if (listadoMateriaPrima[seleccionIngrediente].materiaPrima == listadoMateriaPrima[i].materiaPrima) {
                                if (!existe(ingredientes, listadoMateriaPrima[i].materiaPrima, false)) {
                                    let cantidadIngrediente = parseInt(validarNumeros(prompt(`Producto: ${productoValido}\nIngrese cantidad a utilizar de ${listadoMateriaPrima[i].materiaPrima}:`), "ERROR: INGRESE SOLO NUMEROS\nIngrese nuevamente la cantidad a utilizar:"));
                                    ingredientes.push({
                                        ingrediente: listadoMateriaPrima[i],
                                        cantidad: cantidadIngrediente
                                    });
                                } else {
                                    alert("ERROR: MATERIA PRIMA YA FUE INGRESADA")
                                }

                            }
                        }
                        seleccionado = true;
                    } else {
                        alert("ERROR: OPCION INCORRECTA");
                        seleccionado = true;
                    }
                }
                listadoProducto.push(new Producto(productoValido, ingredientes));
                seleccionado = true;
            }
            break;

        case "3":
            if (listadoProducto.length < 1) {
                alert("ERROR: INGRESE UN PRODUCTO.")
            } else {

                let seleccionProducto = prompt("Indique el producto calcular el precio de venta:");
                mensaje = "ERROR: INGRESE SOLO TEXTO.\nIngrese producto:";
                let seleccionProductoValido = validarTexto(seleccionProducto.toUpperCase(), mensaje);

                alert("Realizando el calculo del presuesto.\n Aguarde un instante");
                if (!listadoProducto.includes(seleccionProductoValido)) {
                    for (const producto of listadoProducto) {
                        if (producto.nomProducto == seleccionProductoValido) {
                            let costo = costoPorIngrediente(producto);
                            alert(`El precio de venta del producto ${seleccionProductoValido} es: ${costo.toFixed(2)} pesos.`);
                        } else {
                            alert("ERROR: PRODUCTO NO INGRESADO");
                        }
                    }
                } else {
                    alert("ERROR: EL PRODUCTO INGRESADO NO SE ENCUENTRA REGISTRADO");
                }
            }
            break;

        case "0":
            salir = false;
            break;

        default:
            alert("OPCION INCORRECTA, INTENTENUEVAMENTE.");
            break;
    }
}
alert("A CONTINUACION PODRA VISUALIZAR LOS DATOS INGRESADOS");
constructorTablas(listadoMateriaPrima, "materiales", "materiaPrima");
constructorTablas(listadoProducto, "productos", "producto");
constructorTablas(listadoProducto, "listaPrecios", "precios");