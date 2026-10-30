# Programa de Soja Sustentable - La Bragadense

Guía interactiva de sustentabilidad, trazabilidad y logística de granos para la **Mesa de Originación de La Bragadense**, reescrita en **React 19 + TypeScript + Vite + Tailwind CSS**.

## Características principales

1. **Vistas por perfil operativo**:
   - **Comerciales**: Atención al cliente, verificación de lotes y condiciones de cierre de venta.
   - **Logística y plantas**: Asignación de cupos, gestión de descarga en plantas habilitadas y despacho a puerto.

2. **Esquemas de sustentabilidad integrados**:
   - **EUDR**: Unión Europea · harina y poroto (Reglamento UE 2023/1115 y Protocolo VISEC, corte 31/12/2020).
   - **EPA**: Estados Unidos · biodiésel RFS (Plan de seguimiento CARBIO, corte 19/12/2007).
   - **2BSvs**: Unión Europea · biodiésel RED (Balance de masa documental, corte 01/01/2008).
   - **Sin cláusula**: Destinos generales sin exigencia de corte.

3. **Línea de tiempo de corte agrícola**:
   - Gráfico SVG interactivo con los años y fechas de corte de cada esquema.
   - Respaldo de navegación en dispositivos móviles.

4. **Chequeo interactivo de calificación**:
   - Cuestionario dinámico según perfil y esquema seleccionado.
   - Cálculo reactivo del veredicto: estado pendiente con contador, aprobación con recomendaciones o detalle de observaciones de rechazo.
   - Accesos directos para evaluación rápida y limpieza de respuestas.

5. **Recorrido del camión y responsabilidades**:
   - Itinerario seleccionable: *Directo a puerto* o *Pasa por una planta LB*.
   - Hoja de ruta interactiva animada (Campo ➔ Planta LB ➔ Puerto / Industria) con trazado vial y camión en movimiento.
   - Asignación paso a paso de tareas con insignias de rol (*Productor, Comercial, Adm. Originación, Logística, Planta LB, Comprador*) y responsables designados.

6. **Consultas y responsables**:
   - Directorio de referentes internos de La Bragadense y seguimiento de definiciones pendientes (*A definir*).

7. **Generador de ficha de resumen**:
   - Exportación y copiado al portapapeles del estado de la consulta para compartir por WhatsApp, correo o notas comerciales.

## Ejecución

- Desarrollo: `npm run dev` (inicia en puerto 3000)
- Compilación: `npm run build`