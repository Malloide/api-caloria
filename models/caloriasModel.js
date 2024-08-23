// models/caloriasModel.js

function calcularMetabolismoBasal(peso, altura, edad, genero) {
    if (genero === 'hombre') {
        return 88.36 + (13.4 * peso) + (4.8 * altura) - (5.7 * edad);
    } else {
        return 447.6 + (9.2 * peso) + (3.1 * altura) - (4.3 * edad);
    }
}

function calcularCaloriasConActividad(metabolismoBasal, diasEjercicio) {
    let factorActividad;
    if (diasEjercicio <= 1) {
        factorActividad = 1.2;
    } else if (diasEjercicio <= 3) {
        factorActividad = 1.375;
    } else if (diasEjercicio <= 5) {
        factorActividad = 1.55;
    } else if (diasEjercicio <= 6) {
        factorActividad = 1.725;
    } else {
        factorActividad = 1.9;
    }
    return metabolismoBasal * factorActividad;
}

function calcularCaloriasDefinicion(caloriasConActividad) {
    return caloriasConActividad * 0.8;
}

function calcularCaloriasVolumen(caloriasConActividad) {
    return caloriasConActividad * 1.2;
}

module.exports = {
    calcularMetabolismoBasal,
    calcularCaloriasConActividad,
    calcularCaloriasDefinicion,
    calcularCaloriasVolumen
};
