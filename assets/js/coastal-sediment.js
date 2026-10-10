(() => {
  const drawings = JSON.parse(document.getElementById('coastalDrawingData').textContent);
  const image = document.getElementById('coastalGalleryImage');
  const trigger = document.getElementById('coastalGalleryTrigger');
  const thumbnails = document.querySelector('.coastal-gallery-thumbnails');
  const viewer = document.getElementById('coastalViewer');
  const viewerImage = document.getElementById('coastalViewerImage');
  const stage = document.querySelector('.coastal-viewer-stage');
  let current = 0, zoom = 1, panX = 0, panY = 0, drag = null;
  function update() {
    const drawing = drawings[current];
    image.src = drawing.display; image.alt = drawing.alt;
    trigger.setAttribute('aria-label', 'Open ' + drawing.title + ' in zoom viewer');
    document.getElementById('coastalDrawingNumber').textContent = String(current + 1).padStart(2, '0') + ' / 04';
    document.getElementById('coastalDrawingTitle').textContent = drawing.title;
    document.getElementById('coastalDrawingDescription').textContent = drawing.description;
    thumbnails.querySelectorAll('button').forEach((button, index) => button.setAttribute('aria-current', String(index === current)));
  }
  function transform() { viewerImage.style.transform = `translate(${panX}px, ${panY}px) scale(${zoom})`; }
  function reset() { zoom = 1; panX = panY = 0; drag = null; transform(); }
  function changeZoom(amount) { zoom = Math.min(5, Math.max(1, zoom + amount)); if (zoom === 1) panX = panY = 0; transform(); }
  function open(drawing) {
    reset(); viewerImage.src = drawing.image; viewerImage.alt = drawing.alt;
    document.getElementById('coastalViewerTitle').textContent = drawing.title;
    document.body.classList.add('coastal-viewer-open'); viewer.showModal();
  }
  drawings.forEach((drawing, index) => {
    const button = document.createElement('button'); button.type = 'button'; button.className = 'coastal-gallery-thumbnail';
    button.setAttribute('aria-label', 'Show drawing ' + (index + 1) + ': ' + drawing.title);
    const thumb = document.createElement('img'); thumb.src = drawing.thumbnail; thumb.alt = ''; thumb.loading = 'lazy';
    const label = document.createElement('span'); label.textContent = drawing.title;
    button.append(thumb, label); button.addEventListener('click', () => { current = index; update(); }); thumbnails.append(button);
  });
  document.getElementById('coastalPrevious').addEventListener('click', () => { current = (current + drawings.length - 1) % drawings.length; update(); });
  document.getElementById('coastalNext').addEventListener('click', () => { current = (current + 1) % drawings.length; update(); });
  trigger.addEventListener('click', () => open(drawings[current]));
  document.querySelectorAll('[data-drawing]').forEach(button => button.addEventListener('click', () => open(drawings[Number(button.dataset.drawing)])));
  document.querySelector('[data-context-image]').addEventListener('click', () => open({ image: 'https://res.cloudinary.com/ngg4n92q/image/upload/f_auto,q_auto,c_limit,w_2400/BMR_cjnlpx', alt: 'Original sea-level rise and site context map', title: 'Sea-level rise & site context' }));
  document.querySelector('.coastal-viewer-close').addEventListener('click', () => viewer.close());
  viewer.addEventListener('close', () => { document.body.classList.remove('coastal-viewer-open'); reset(); });
  viewer.querySelector('[data-zoom="in"]').addEventListener('click', () => changeZoom(.5));
  viewer.querySelector('[data-zoom="out"]').addEventListener('click', () => changeZoom(-.5));
  viewer.querySelector('[data-zoom="reset"]').addEventListener('click', reset);
  stage.addEventListener('wheel', event => { event.preventDefault(); changeZoom(event.deltaY < 0 ? .25 : -.25); }, { passive: false });
  stage.addEventListener('pointerdown', event => { if (zoom === 1) return; drag = { x: event.clientX - panX, y: event.clientY - panY }; stage.setPointerCapture(event.pointerId); });
  stage.addEventListener('pointermove', event => { if (!drag) return; panX = event.clientX - drag.x; panY = event.clientY - drag.y; transform(); });
  function stopDrag(event) { drag = null; if (stage.hasPointerCapture(event.pointerId)) stage.releasePointerCapture(event.pointerId); }
  stage.addEventListener('pointerup', stopDrag); stage.addEventListener('pointercancel', stopDrag);
  viewer.addEventListener('click', event => { if (event.target !== viewer) return; const rect = viewer.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) viewer.close(); });
  update();
})();
