const calcularNotas = () => {
    let estudiantesGanaron = 0;
    const estudiantesActualizados = estudiantes.map(estudiante => {
        const totalPorcentajes = estudiante.notas.reduce((acc, curr) => acc + curr.porcentaje, 0);
        if (totalPorcentajes !== 100) {
            alert('Los porcentajes de las notas deben sumar 100%');
            return estudiante;
        }
        const notaFinal = estudiante.notas.reduce((acc, curr) => acc + (curr.nota * (curr.porcentaje / 100)), 0);
        estudiante.notaFinal = notaFinal.toFixed(2);
        if (notaFinal >= 3) {
            estudiante.resultado = 'Ganó';
            estudiantesGanaron++;
        } else {
            estudiante.resultado = 'Perdió';
        }
        return estudiante;
    });

    const porcentajeGanaron = (estudiantesGanaron / estudiantes.length) * 100;
    const porcentajePerdieron = 100 - porcentajeGanaron;

    alert(`Porcentaje de estudiantes que ganaron: ${porcentajeGanaron}%\nPorcentaje de estudiantes que perdieron: ${porcentajePerdieron}%`);
    setEstudiantes(estudiantesActualizados);
};

