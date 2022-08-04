sessionStorage.setItem("nuevaSession", "no");
sessionStorage.setItem("materiaPrima",localStorage.getItem("materiaPrima"));
sessionStorage.setItem("productos",localStorage.getItem("productos"));
sessionStorage.setItem("inventarioMp",localStorage.getItem("inventarioMp"));
inventarioMateriaPrima = JSON.parse(sessionStorage.getItem("inventarioMp"));
console.log(inventarioMateriaPrima);
constructorTablas(inventarioMateriaPrima, "tbMateriales");