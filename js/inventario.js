sessionStorage.setItem("nuevaSession", "no");
inventarioMateriaPrima = JSON.parse(sessionStorage.getItem("inventarioMp"));
console.log(inventarioMateriaPrima);
constructorTablas(inventarioMateriaPrima, "tbMateriales");