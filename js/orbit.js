(function () {
  const stage = document.getElementById('orbitStage');
  const centerEl = document.getElementById('orbitCenter');
  const ringEl = document.getElementById('orbitRing');
  const heroSection = document.querySelector('.orbit_hero');
  
  if (!stage || !centerEl || !heroSection) return;

  const items = Array.from(stage.querySelectorAll('.orbit_hero__item'));

  // Estado global
  const state = {
    cx: 0,
    cy: 0,
    radius: 300,
    speed: 0.6,        // radianes/seg
    gapMin: 20,      // separación mínima extra respecto al texto
    gapMax: 64       // separación máxima extra (se ajusta con viewport)
  };

  // Cálculo del centro y radio para rodear el texto
  function computeOrbit() {
    const sectionRect = heroSection.getBoundingClientRect();
    const centerRect = centerEl.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Centro relativo a la sección (no al viewport)
    state.cx = sectionRect.width / 2;
    state.cy = sectionRect.height / 2;

    // Radio mínimo para no tocar el texto: mitad de la diagonal del texto
    const halfDiagonal = Math.sqrt(centerRect.width * centerRect.width + centerRect.height * centerRect.height) / 2;

    // Gap dinámico según viewport
    const gap = Math.min(
      state.gapMax,
      Math.max(state.gapMin, Math.min(vw, vh) * 0.06)
    );

    // Radio base también responde al tamaño de la pantalla pero limitado
    const responsiveBase = Math.min(vw * 0.35, vh * 0.35, 350);

    // El radio final es el mayor entre: que no toque el texto y un base cómodo
    state.radius = Math.max(halfDiagonal + gap, responsiveBase);

    // (Opcional) dibujar el anillo de la órbita
    if (ringEl) {
      const d = state.radius * 2;
      ringEl.style.width = `${d}px`;
      ringEl.style.height = `${d}px`;
      ringEl.style.left = `${state.cx}px`;
      ringEl.style.top = `${state.cy}px`;
    }
  }

  // Distribuir ángulos iniciales equiespaciados
  const nodes = items.map((el, i) => ({
    el,
    angle: (i / items.length) * Math.PI * 2
  }));

  // Observa cambios de tamaño del texto (cambios de fuente, wraps, etc.)
  const ro = new ResizeObserver(() => {
    computeOrbit();
  });
  ro.observe(centerEl);
  ro.observe(heroSection);

  // Solo recalcular en resize, NO en scroll
  window.addEventListener('resize', computeOrbit, { passive: true });

  // Animación
  let last = performance.now();
  function animate(ts) {
    const dt = Math.min(0.05, (ts - last) / 1000);
    last = ts;

    nodes.forEach(n => {
      n.angle += state.speed * dt; // misma órbita para todos
      const x = state.cx + Math.cos(n.angle) * state.radius;
      const y = state.cy + Math.sin(n.angle) * state.radius;
      n.el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
    });

    requestAnimationFrame(animate);
  }

  // Iniciar
  computeOrbit();
  requestAnimationFrame(animate);
})();
