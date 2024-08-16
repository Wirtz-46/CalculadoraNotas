import React, { useState } from 'react';
import './index.css'

function CalculadoraNotas() {
    const [estudiantes, setEstudiantes] = useState([]);
    const [cantidadEstudiantes, setCantidadEstudiantes] = useState(1);
    
    const manejarCambio = (e) => {
        setCantidadEstudiantes(Number(e.target.value));
    };

    const agregarEstudiante = () => {
        const nuevosEstudiantes = [];
        for (let i = 0; i < cantidadEstudiantes; i++) {
            nuevosEstudiantes.push({
                nombre: '',
                materia: '',
                notas: Array(5).fill({ nota: '', porcentaje: '' }),
                notaFinal: null,
                resultado: ''
            });
        }
        setEstudiantes(nuevosEstudiantes);
    };

    const manejarInput = (index, tipo, valor) => {
        const nuevosEstudiantes = [...estudiantes];
        nuevosEstudiantes[index][tipo] = valor;
        setEstudiantes(nuevosEstudiantes);
    };

    const manejarNotas = (index, subIndex, tipo, valor) => {
        const nuevosEstudiantes = [...estudiantes];
        nuevosEstudiantes[index] = {
            ...nuevosEstudiantes[index],
            notas: nuevosEstudiantes[index].notas.map((nota, i) => 
                i === subIndex ? { ...nota, [tipo]: Number(valor) } : nota
            )
        };
        setEstudiantes(nuevosEstudiantes);
    };
    
    const calcularNotas = () => {
        let estudiantesGanaron = 0;
        let estudiantesPerdieron = 0;
    
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
                estudiantesPerdieron++;
            }
    
            return estudiante;
        });
    
        const porcentajeGanaron = (estudiantesGanaron / estudiantes.length) * 100;
        const porcentajePerdieron = (estudiantesPerdieron / estudiantes.length) * 100;
    
        setEstudiantes(estudiantesActualizados);
    
        alert(`Porcentaje de estudiantes que ganaron: ${porcentajeGanaron.toFixed(2)}%\nPorcentaje de estudiantes que perdieron: ${porcentajePerdieron.toFixed(2)}%`);
    };

    return (
        <div>
            <h1>Calculadora de Notas</h1>
            <label>
                Cantidad de estudiantes:
                <input type="number" value={cantidadEstudiantes} onChange={manejarCambio} />
            </label>
            <button onClick={agregarEstudiante}>Agregar Estudiantes</button>
            {estudiantes.map((estudiante, index) => (
                <div key={index}>
                    <h2>Estudiante {index + 1}</h2>
                    <label>
                        Nombre:
                        <input 
                            type="text" 
                            value={estudiante.nombre} 
                            onChange={(e) => manejarInput(index, 'nombre', e.target.value)} 
                        />
                    </label>
                    <label>
                        Materia:
                        <input 
                            type="text" 
                            value={estudiante.materia} 
                            onChange={(e) => manejarInput(index, 'materia', e.target.value)} 
                        />
                    </label>
                    {estudiante.notas.map((nota, subIndex) => (
                        <div key={subIndex}>
                            <label>
                                Nota {subIndex + 1}:
                                <input 
                                    type="number" 
                                    value={nota.nota} 
                                    onChange={(e) => manejarNotas(index, subIndex, 'nota', e.target.value)} 
                                />
                            </label>
                            <label>
                                Porcentaje:
                                <input 
                                    type="number" 
                                    value={nota.porcentaje} 
                                    onChange={(e) => manejarNotas(index, subIndex, 'porcentaje', e.target.value)} 
                                />
                            </label>
                        </div>
                    ))}
                </div>
            ))}
            <button onClick={calcularNotas}>Calcular Notas</button>
            <h2>Resultados:</h2>
            <ul>
                {estudiantes.map((estudiante, index) => (
                    <li key={index}>
                        {estudiante.nombre} - {estudiante.materia}: {estudiante.notaFinal} - {estudiante.resultado}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CalculadoraNotas;