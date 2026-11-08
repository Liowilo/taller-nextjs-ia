# Prompts para v0 (Misión 3)

Agrega SIEMPRE al final de tu prompt:

> **Requisitos técnicos:** un solo componente de React llamado `ComponenteV0` exportado con
> `export function ComponenteV0()`. Solo HTML y clases de Tailwind CSS, sin shadcn/ui, sin
> librerías externas, sin imágenes externas (usa emojis). Fondo oscuro, que se vea bien en móvil.

## Opción A · Tarjeta de stack
Una tarjeta "Mi stack" con 4 tecnologías en cuadrícula de 2x2, cada una con emoji, nombre y
una barra que indique mi nivel del 0 al 100.

## Opción B · Línea de tiempo
Una línea de tiempo vertical con 4 hitos de mi vida como estudiante (entrada a la carrera,
primer programa, primer proyecto en equipo, hoy). Cada hito con fecha, título y descripción corta.

## Opción C · Tarjeta de música (interactiva)
Un mini reproductor falso con el nombre de mi canción favorita, artista, una barra de progreso
y botones de play/pausa que cambien de ícono al hacer clic. (Necesitará `"use client"`)

## Opción D · Pregunta de opción múltiple (interactiva)
Un mini quiz de una pregunta sobre programación con 4 opciones. Al elegir, se pinta de verde
si es correcta o rojo si no, y muestra una explicación. (Necesitará `"use client"`)

## Opción E · Inventa la tuya
Estructura recomendada de un buen prompt de UI:
1. **Qué es** (tarjeta, sección, formulario…)
2. **Qué contiene** (elementos concretos, cuántos)
3. **Cómo se ve** (colores, espaciado, estilo)
4. **Cómo se comporta** (clics, hover, estados)
5. **Requisitos técnicos** (el bloque de arriba)

## Para iterar
- "Hazlo más compacto, reduce el padding a la mitad"
- "Cambia la paleta a tonos morados y rosas"
- "Agrega una animación sutil al pasar el mouse"
- "Reescríbelo sin shadcn, solo HTML y Tailwind"
