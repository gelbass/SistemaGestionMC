// LLAMADA FUNCIONES 
cargarDatos();
// ----------------
const diaLabel = [];
const ventasLabel = [];
let meseLabel;
const mesesLabel = [];
const listaVentas = [];
const listaAnual = JSON.parse(localStorage.getItem("historicoVentas"));
// CHATS

const ventaDelMes = (mesVenta) => {
    const mes = listaAnual.find(valor => valor.mes == mesVenta);
    meseLabel=mes.mes;
    mes.ventas.forEach(elemento => {
        diaLabel.push(elemento.dia);
        ventasLabel.push(elemento.venta);
    });
}
ventaDelMes("ENERO");

const calculoVentasAnuales = () => {
    let ventas = 0;
    console.log(ventas);
    listaAnual.forEach(elemento => {
        mesesLabel.push(elemento.mes);
        elemento.ventas.forEach(dias => {
            console.log(dias.venta);
            ventasLabel.push(dias.venta);
            ventas += dias.venta;
            console.log(ventas);
        });
        listaVentas.push(ventas);
        console.log(listaVentas);
    });
}
calculoVentasAnuales();

const meses = mesesLabel;
const dataVentasAnuales = {
    labels: meses,
    datasets: [{
        label: 'PERIODO 2022',
        data: listaVentas,
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
        ],
        borderWidth: 1
    }]
};
const ventasAnuales = {
    type: 'bar',
    data: dataVentasAnuales,
};
const diasMesActual = diaLabel;
const datadiasMesActual = {
    labels: diasMesActual,
    datasets: [{
        label: meseLabel,
        data: ventasLabel,
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
        ],
        borderWidth: 1
    }]
};
const ventasMensual = {
    type: 'bar',
    data: datadiasMesActual,
};

const anual = document.getElementById('ventasAnuales');
const chartVentasAnuales = new Chart(anual, ventasAnuales);
const mensual = document.getElementById('ventasMensual');
const chartVentasMensual = new Chart(mensual, ventasMensual);

// EVENTOS
menuSecundarioMateriaPrima.addEventListener("click", () => mostrarFormulario("formMateriaPrima"));
cerrarFormularioMateriaPrima.addEventListener("click", () => ocultarFormulario("formMateriaPrima"));

menuSecundarioProducto.addEventListener("click", () => mostrarFormulario("formProducto"));
cerrarFormularioProducto.addEventListener("click", () => ocultarFormulario("formProducto"));

formularioMateriaPrima.addEventListener("submit", validarFormMateriaPrima);
formularioProducto.addEventListener("submit", validarFormProducto);

addIngrediente.addEventListener("click", selectIngredientes);
// -------------------------------