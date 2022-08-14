let index = () =>{
    window.location.href = "./index.html"
};
sessionStorage.getItem("usuario")|| index();
sessionStorage.getItem("usuario")==="" &&  index();
const meses = [{
    numeroMes: 1,
    mesTxt: "ENERO"
}, {
    numeroMes: 2,
    mesTxt: "FEBRERO"
}, {
    numeroMes: 3,
    mesTxt: "MARZO"
}, {
    numeroMes: 4,
    mesTxt: "ABRIL"
}, {
    numeroMes: 5,
    mesTxt: "MAYO"
}, {
    numeroMes: 6,
    mesTxt: "JUNIO"
}, {
    numeroMes: 7,
    mesTxt: "JULIO"
}, {
    numeroMes: 8,
    mesTxt: "AGOSTO"
}, {
    numeroMes: 9,
    mesTxt: "SEPTIEMBRE"
}, {
    numeroMes: 10,
    mesTxt: "OCTUBRE"
}, {
    numeroMes: 11,
    mesTxt: "NOVIEMBRE"
}, {
    numeroMes: 12,
    mesTxt: "DICIEMBRE"
}];


// LLAMADA FUNCIONES 

let mesSelecionado;
const diaLabel = [];
const ventasLabel = [];
let meseLabel;
const mesesLabel = [];
const listaVentas = [];
let select = document.querySelector("#select_meses");

for (const item of meses) {
    let opcion = document.createElement('option');
    opcion.setAttribute("value", item.numeroMes);
    opcion.text = item.mesTxt;
    select.append(opcion);
}
select.value = mesActual;
mesSelecionado = select[select.value - 1].innerText;

const ventaDelMes = (mesVenta) => {
    ventasLabel.splice(0,ventasLabel.length)
    diaLabel.splice(0,diaLabel.length)
    const listadoMes = listaAnualVentas.find(valor => valor.mes == mesVenta);
    meseLabel = listadoMes.mes;
    listadoMes.ventas.forEach(elemento => {
        diaLabel.push(elemento.dia);
        ventasLabel.push(elemento.venta);
    });
}

const calculoVentasAnuales = () => {
    listaAnualVentas.forEach(elemento => {
        let ventas = 0;
        mesesLabel.push(elemento.mes);
        elemento.ventas.forEach(dias => {
            ventasLabel.push(dias.venta);
            ventas += dias.venta;
        });
        listaVentas.push(ventas);
    });
}

// CHATS
let chartVentasMensual = null;
const graficaMensual = () => {
    const mensual = document.getElementById('ventasMensual');

    if (chartVentasMensual != null) {
        chartVentasMensual.destroy();
    }

    const diasMesActual = diaLabel;
    const datadiasMesActual = {
        labels: diasMesActual,
        datasets: [{
            label: meseLabel,
            data: ventasLabel,
            backgroundColor: [
                'rgba(255, 99, 132)',
                'rgba(255, 159, 64)',
                'rgba(255, 205, 86)',
                'rgba(75, 192, 192)',
                'rgba(54, 162, 235)',
                'rgba(153, 102, 255)',
                'rgba(201, 203, 207)'
            ]
        }]
    };
    const ventasMensual = {
        type: 'bar',
        data: datadiasMesActual,
    };
    chartVentasMensual = new Chart(mensual, ventasMensual);
}

const graficaAnual = () => {
    const anual = document.getElementById('ventasAnuales');
    let chartVentasAnuales;
    const meses = mesesLabel;
    const dataVentasAnuales = {
        labels: meses,
        datasets: [{
            label: 'PERIODO 2022',
            data: listaVentas,
            backgroundColor: [
                'rgba(255, 159, 64)',
                'rgba(255, 99, 132)',
                'rgba(255, 205, 86)',
                'rgba(75, 192, 192)',
                'rgba(54, 162, 235)',
                'rgba(153, 102, 255)',
                'rgba(201, 203, 207)'
            ]
        }]
    };
    const ventasAnuales = {
        type: 'bar',
        data: dataVentasAnuales,
    };
    
    chartVentasAnuales = new Chart(anual, ventasAnuales);

}
// ----------------
const cargarDataIndex = async () => {
    await cargarDatos();
    ventaDelMes(mesSelecionado);
    calculoVentasAnuales();
    graficaMensual();
    graficaAnual();
    calculoPrecio(listadoMateriaPrima, listadoProducto);
}

cargarDataIndex();

select.onchange = function () {
    let options = select.getElementsByTagName("option");
    mesSelecionado = options[select.selectedIndex].innerText;
    ventaDelMes(mesSelecionado);
    graficaMensual();
};
// -------------------------------
// EVENTOS
eventos();