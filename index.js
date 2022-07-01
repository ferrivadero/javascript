/*
let numeroCalificaciones = parseInt(prompt("Ingrese el numero de calificaciones"))
let sumatoria = 0
let promedio = 0

for (let i = 1; i<= numeroCalificaciones; i++) {
    let calificacion = parseFloat(prompt("Ingrese la calificacion " + i))
    sumatoria = sumatoria + calificacion
}

promedio = sumatoria / numeroCalificaciones

alert("El promedio es " + promedio)

function ResultadoPromedio(){
    if (promedio >= 7){
        alert("Estado: Promocionado")
    }
    else if(promedio < 7 & promedio >= 4){
        alert("Estado: Regular")
    }
    else{
        alert("Estado: Libre")
    }
}

ResultadoPromedio()