document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("calculadoraForm");
    const resultadosDiv = document.getElementById("resultados");
    const historialUl = document.getElementById("historial");
    const borrarHistorialBtn = document.getElementById("borrarHistorialBtn");
    const themeBtn = document.querySelector(".theme-btn");
    let isDarkTheme = true;

    async function obtenerResultados() {
        const formData = new FormData(form);
        const data = {
            nombre: formData.get('nombre'),
            peso: parseFloat(formData.get('peso')),
            altura: parseFloat(formData.get('altura')),
            edad: parseInt(formData.get('edad')),
            genero: formData.get('genero'),
            diasEjercicio: parseInt(formData.get('diasEjercicio'))
        };

        try {
            const respuestaMetBasal = await fetch('/api/metabolismo-basal', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    peso: data.peso,
                    altura: data.altura,
                    edad: data.edad,
                    genero: data.genero
                })
            });
            const { metabolismoBasal } = await respuestaMetBasal.json();

            const respuestaCaloriasActividad = await fetch('/api/kcals-con-actividad', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    metabolismoBasal: metabolismoBasal,
                    diasEjercicio: data.diasEjercicio
                })
            });
            const { kcalsConActividad } = await respuestaCaloriasActividad.json();

            const respuestaDefinicion = await fetch('/api/kcals-para-definicion', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ kcalsConActividad })
            });
            const { kcalsParaDefinicion } = await respuestaDefinicion.json();

            const respuestaVolumen = await fetch('/api/kcals-para-volumen', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ kcalsConActividad })
            });
            const { kcalsParaVolumen } = await respuestaVolumen.json();

            const resultados = [
                `Nombre: ${data.nombre}`,
                `Metabolismo Basal: ${metabolismoBasal.toFixed(2)} calorías`,
                `Calorías con Actividad: ${kcalsConActividad.toFixed(2)} calorías`,
                `Calorías para Definición: ${kcalsParaDefinicion.toFixed(2)} calorías`,
                `Calorías para Volumen: ${kcalsParaVolumen.toFixed(2)} calorías`
            ];

            resultadosDiv.innerHTML = "<h2>Resultados:</h2>";
            resultados.forEach(resultado => {
                const p = document.createElement("p");
                p.textContent = resultado;
                resultadosDiv.appendChild(p);
            });

            guardarEnHistorial(resultados.join(" | "));

        } catch (error) {
            console.error("Error al obtener resultados:", error);
        }
    }

    function cargarHistorial() {
        const historial = JSON.parse(localStorage.getItem("historialCalculos")) || [];
        historialUl.innerHTML = "";
        historial.forEach(entry => {
            const li = document.createElement("li");
            li.textContent = entry;
            historialUl.appendChild(li);
        });
    }

    function guardarEnHistorial(resultado) {
        const historial = JSON.parse(localStorage.getItem("historialCalculos")) || [];
        historial.push(resultado);
        localStorage.setItem("historialCalculos", JSON.stringify(historial));
        cargarHistorial();
    }

    borrarHistorialBtn.addEventListener("click", () => {
        localStorage.removeItem("historialCalculos");
        historialUl.innerHTML = "";
    });

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        obtenerResultados();
    });

    themeBtn.addEventListener("click", () => {
        isDarkTheme = !isDarkTheme;
        document.body.classList.toggle("light-theme", !isDarkTheme);
        document.body.classList.toggle("dark-theme", isDarkTheme);
        themeBtn.textContent = isDarkTheme ? "🌞" : "🌜";
    });

    cargarHistorial();
});
