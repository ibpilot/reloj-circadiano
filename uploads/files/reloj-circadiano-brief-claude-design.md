# Brief para Claude Design — Serie "El reloj circadiano molecular"

Este documento es el brief de proyecto para construir, con la herramienta interactiva de Claude (el "Visualizer" / lo que aquí llamamos Claude Design), una serie de widgets navegables que explican el mecanismo molecular del reloj circadiano descrito por Carlos STRO. Es un prototipo en chat, pensado como paso previo a evaluar si conviene convertirlo en una PWA real (single-file, instalable, como los proyectos de `ibpilot`).

**Regla de oro para quien continúe este proyecto**: no inventar contenido fuera de los textos fuente. Si un módulo no tiene texto fuente pegado en la conversación, se deja marcado como pendiente — no se rellena con suposiciones ni con conocimiento general sobre ritmos circadianos. Cada módulo de este brief indica de qué capítulo sale su contenido.

---

## 1. Sistema de diseño (reglas transversales)

**Paleta de colores por categoría** (no por módulo — esto es lo que hace que las piezas se sientan parte de una sola serie):
- **Gris** (`c-gray`) → estructural / hub: el complejo CLOCK+BMAL1, el núcleo supraquiasmático (NSQ).
- **Coral** (`c-coral`) → represores: PER, CRY, REV-ERB.
- **Teal** (`c-teal`) → activadores: ROR.
- **Morado** (`c-purple`) → sitio de competencia en el ADN: la caja E, el sitio RORE.

**Patrones de interacción** (usar siempre uno de estos tres, no inventar un cuarto sin necesidad real):
1. **Clic en nodo → profundiza**: usa `sendPrompt(...)` para abrir una explicación de ese submecanismo en el chat. Es la forma de "navegar" entre módulos.
2. **Toggle → cambia estado**: para dicotomías reales del texto (día/noche, alondra/búho, mito/realidad). Actualiza opacidades, grosores de flecha y un pequeño texto de estado.
3. **Stepper → proceso cíclico**: para mecanismos que son un ciclo (la fábrica y su interruptor). Nunca dibujar un ciclo como anillo en SVG; usar panel-por-etapa con puntos de progreso que dan la vuelta del último paso al primero.

**Convención de nombres**: snake_case descriptivo del contenido, no del número de módulo (`fabrica_interruptor_bucle_principal`, no `widget_1`). Facilita que, si esto se porta a PWA, cada archivo/función ya tenga un nombre con sentido.

---

## 2. Estado de los módulos

### W1 — La fábrica y su interruptor ✅ construido
**Fuente**: capítulo "Las cuatro sustancias sagradas y el tic-tac molecular" (CLOCK, BMAL1, PER, CRY, bucle principal).
**Formato**: stepper de 5 pasos con barra de "marea" (nivel de PER+CRY acumulado) que sube y baja.
**Pasos**: (1) amanecer y formación del heterodímero en la caja E, (2) arranque de la fábrica, (3) la marea sube y CK1 empieza a marcar a PER, (4) el interruptor se pulsa (PER:CRY reprime a CLOCK-BMAL1), (5) se desmonta el interruptor (β-TrCP/proteasoma para PER, FBXL3 para CRY).

### W2 — El segundo bucle ✅ construido
**Fuente**: capítulo "La casa edificada sobre la roca" (REV-ERB, ROR, RORE).
**Formato**: diagrama navegable con toggle día/noche.
**Nodos**: CLOCK+BMAL1 (hub), PER+CRY, REV-ERB, ROR, RORE. El toggle cambia qué proteína domina el sitio RORE y actualiza dos líneas de estado: si se está fabricando BMAL1 nuevo, y si la proteína BMAL1 ya fabricada está activa.

### W3 — La demolición de precisión 🔲 pendiente
**Fuente**: sección "La precisión con que se destruye" (capítulo de la roca).
**Contenido exacto a incluir**:
- CK1 marca a PER en dos regiones que tiran en sentidos contrarios:
  - Serina 477 (humanos) → fosfodegrón = etiqueta de muerte. β-TrCP la lee, cuelga ubiquitina, PER va al proteasoma. "CK1 escribe la sentencia; β-TrCP la ejecuta."
  - Serina 662 (región FASP) → marca protectora: estabiliza a PER, le alarga la vida, entorpece que CK1 complete el fosfodegrón.
- Compensación de temperatura: el equilibrio entre ambas marcas está afinado para que, con el calor, las dos reacciones se aceleren por igual y se cancelen.
- Casos reales: hámster con CK1 mutado (no marca bien la FASP → días de 20h); familias de alondras extremas (mismo fallo en la FASP de PER2 → reloj adelantado); mutación inversa en el fosfodegrón (PER se acumula → reloj alargado).
- CRY se desmonta por otra vía: FBXL3 es el verdugo principal en el núcleo. FBXL21 es un guardián de doble cara — en el núcleo protege a CRY (le disputa la presa a FBXL3), en el citoplasma ayuda a degradarlo.
**Formato sugerido**: diagrama ilustrativo tipo "tira y afloja" — un slider que desplaza el equilibrio entre la marca protectora y la marca condenatoria sobre PER, mostrando en vivo si el día se acorta o se alarga; un segundo bloque (más simple) para FBXL3/FBXL21 con un toggle núcleo/citoplasma.

### W4 — REV-ERB como sensor metabólico 🔲 pendiente
**Fuente**: sección "REV-ERB, la ventana al metabolismo" (capítulo de la roca).
**Contenido exacto a incluir**:
- REV-ERB necesita hemo acoplado para reprimir. Sin hemo es "una llave sin dientes".
- La cantidad de hemo libre en la célula sube y baja con la respiración, el oxígeno, el metabolismo.
- REV-ERB también nota CO y NO, que se acoplan al hierro del hemo y cambian su forma. El reloj "siente" el aire interno de la célula.
- Idea central: el reloj y el metabolismo no son sistemas aislados, se comunican como uno solo. REV-ERB es la bisagra (el texto adelanta que esto se desarrolla más en un capítulo futuro sobre el hígado y fármacos — no anticipar ese contenido, solo señalarlo como nota).
**Formato sugerido**: diagrama ilustrativo — REV-ERB con un hueco/bolsillo para el hemo; toggle "con hemo / sin hemo" que muestra la represión activa o inactiva; CO y NO como pequeñas partículas que se acoplan y deforman el hemo.

### W5 — Reloj maestro y relojes periféricos 🔲 pendiente
**Fuente**: sección "Un reloj maestro y un billón de relojes" (capítulo de la roca).
**Contenido exacto a incluir**:
- Mito a desmontar explícitamente: PER y CRY NO se secretan ni viajan por la sangre. Trabajan dentro del núcleo de la célula que las fabrica. El reloj maestro no reparte proteínas hechas.
- Qué hace el maestro: sincroniza relojes que ya laten solos (no los crea).
- Vive en el núcleo supraquiasmático (NSQ), encima del cruce de los nervios ópticos. Es fiable porque ~20.000 neuronas están acopladas entre sí, no porque cada una sea perfecta.
- Es la única estructura que ve la luz directamente y se pone en hora con el amanecer.
- 4 mecanismos de sincronización hacia los periféricos (hígado, piel, corazón, intestino):
  1. Cortisol a primera hora (viaja por sangre).
  2. Órdenes directas por nervios a los órganos.
  3. Vaivén diario de temperatura corporal.
  4. Decide sueño/vigilia y, con ello, cuándo se come y se ayuna — "la orden más potente de todas".
**Formato sugerido**: diagrama estructural — NSQ en el centro, 4 flechas etiquetadas a un grupo de órganos periféricos; un botón/toggle "mito vs. realidad" que contraste la idea errónea (proteínas viajando en sangre) con el mecanismo real (sincronización, no reparto).

### W6 — La luz / el amanecer 🔲 sin fuente todavía
Ambos capítulos señalan este tema como "el próximo". No construir nada hasta tener el texto correspondiente pegado en la conversación.

---

## 3. Orden de navegación

W1 → W2 → W3 → W4 → W5 → (W6 cuando exista el texto)

En cada widget, los botones de exploración (`sendPrompt`) hacen de enlace al siguiente módulo. Esa cadena de clics es el mapa de navegación que, si se decide construir la PWA, habría que replicar con navegación interna en vez de mensajes al chat.

---

## 4. Lo que hay que decidir antes de evaluar la PWA

- **Persistencia**: ¿la app debe recordar qué módulos ya se vieron? Los widgets de chat no tienen memoria entre mensajes — cada uno es autocontenido.
- **Reutilización de código**: el SVG/JS de cada widget es en gran parte portable; al migrar a PWA, sustituir `sendPrompt(...)` por navegación interna entre secciones.
- **Destino**: ¿uso personal, o pensado para compartir como contenido Samurái/STRO? Esto decide si el texto completo va integrado en la app o se mantiene aparte.

---

## 5. Cómo usar este archivo

Este brief es un resumen curado, no sustituye al texto fuente. Los datos de cada módulo están extraídos con cuidado, pero quien continúe el proyecto debe poder volver siempre al capítulo original para verificar cualquier matiz que mi resumen no haya capturado.

Por eso este brief va siempre acompañado del archivo `reloj-circadiano-fuentes.md`, que contiene los dos capítulos completos y verbatim:
- "Las cuatro sustancias sagradas y el tic-tac molecular" → fuente de W1.
- "La casa edificada sobre la roca" → fuente de W2, W3, W4 y W5.

Para construir un módulo: pega ambos archivos (este brief + el de fuentes) al inicio de una conversación nueva con Claude Design, y pide explícitamente el módulo que quieras (W3, W4 o W5). Cuando llegue el capítulo de la luz/el amanecer, añádelo al archivo de fuentes y actualiza este brief para W6.
