function calcularMetabolismoBasal(req, res) {
    const { peso, altura, edad, genero } = req.body;
    if (!peso || !altura || !edad || !genero) {
        return res.status(400).json({ error: 'Faltan parámetros' });
    }
    
    const basal = 
    res.json({ metabolismoBasal: basal });
}

function calcularCaloriasConActividad(req, res) {
    const { metabolismoBasal, diasEjercicio } = req.body;
    if (metabolismoBasal == null || diasEjercicio == null) {
        return res.status(400).json({ error: 'Faltan parámetros' });
    }
    
    const calorias = 
    res.json({ kcalsConActividad: calorias });
}

function calcularCaloriasDefinicion(req, res) {
    const { kcalsConActividad } = req.body;
    if (kcalsConActividad == null) {
        return res.status(400).json({ error: 'Faltan parámetros' });
    }
    
    const calorias = 
    res.json({ kcalsParaDefinicion: calorias });
}

function calcularCaloriasVolumen(req, res) {
    const { kcalsConActividad } = req.body;
    if (kcalsConActividad == null) {
        return res.status(400).json({ error: 'Faltan parámetros' });
    }
    
    const calorias = 
    res.json({ kcalsParaVolumen: calorias });
}

module.exports = {
    calcularMetabolismoBasal,
    calcularCaloriasConActividad,
    calcularCaloriasDefinicion,
    calcularCaloriasVolumen
};
