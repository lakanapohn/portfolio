(() => {
  const drawings = JSON.parse(document.getElementById('internshipDrawingData').textContent);
  const group = document.getElementById('internshipGalleryGroup');
  const image = document.getElementById('internshipGalleryImage');
  const trigger = document.getElementById('internshipGalleryTrigger');
  const thumbnails = document.querySelector('.coastal-gallery-thumbnails');
  const viewer = document.getElementById('internshipViewer');
  const viewerImage = document.getElementById('internshipViewerImage');
  const stage = document.querySelector('.coastal-viewer-stage');
  let collection = [], current = 0, zoom = 1, panX = 0, panY = 0, drag = null;
  function update() {
    const drawing = drawings[collection[current]];
    image.src = drawing.display; image.alt = drawing.alt;
    trigger.setAttribute('aria-label', 'Open ' + drawing.title + ' in zoom viewer');
    document.getElementById('internshipDrawingNumber').textContent = String(current + 1).padStart(2, '0') + ' / ' + String(collection.length).padStart(2, '0');
    document.getElementById('internshipDrawingTitle').textContent = drawing.title;
    document.getElementById('internshipDrawingDescription').textContent = drawing.description;
    thumbnails.querySelectorAll('button').forEach((button, index) => button.setAttribute('aria-current', String(index === current)));
  }
  function buildCollection() { if (!group) return;
    collection = drawings.map((drawing,index) => drawing.group === group.value ? index : -1).filter(index => index >= 0);
    current = 0; thumbnails.replaceChildren();
    collection.forEach((drawingIndex,index) => {
      const drawing = drawings[drawingIndex];
      const button = document.createElement('button'); button.type = 'button'; button.className = 'coastal-gallery-thumbnail';
      button.setAttribute('aria-label','Show figure ' + (index + 1) + ': ' + drawing.title);
      const thumb = document.createElement('img'); thumb.src = drawing.thumbnail; thumb.alt = ''; thumb.loading = 'lazy';
      const label = document.createElement('span'); label.textContent = drawing.title;
      button.append(thumb,label); button.addEventListener('click',() => { current = index; update(); }); thumbnails.append(button);
    });
    update();
  }
  function transform() { viewerImage.style.transform = `translate(${panX}px, ${panY}px) scale(${zoom})`; }
  function reset() { zoom = 1; panX = panY = 0; drag = null; transform(); }
  function changeZoom(amount) { zoom = Math.min(6,Math.max(1,zoom + amount)); if (zoom === 1) panX = panY = 0; transform(); }
  function open(drawing) { reset(); viewerImage.src = drawing.image; viewerImage.alt = drawing.alt; document.getElementById('internshipViewerTitle').textContent = drawing.title; document.body.classList.add('coastal-viewer-open'); viewer.showModal(); }
  group?.addEventListener('change',buildCollection);
  document.getElementById('internshipPrevious')?.addEventListener('click',() => { current = (current + collection.length - 1) % collection.length; update(); });
  document.getElementById('internshipNext')?.addEventListener('click',() => { current = (current + 1) % collection.length; update(); });
  trigger?.addEventListener('click',() => open(drawings[collection[current]]));
  document.querySelectorAll('[data-drawing]').forEach(button => button.addEventListener('click',() => open(drawings[Number(button.dataset.drawing)])));
  document.querySelector('.coastal-viewer-close').addEventListener('click',() => viewer.close());
  viewer.addEventListener('close',() => { document.body.classList.remove('coastal-viewer-open'); reset(); });
  viewer.querySelector('[data-zoom="in"]').addEventListener('click',() => changeZoom(.5));
  viewer.querySelector('[data-zoom="out"]').addEventListener('click',() => changeZoom(-.5));
  viewer.querySelector('[data-zoom="reset"]').addEventListener('click',reset);
  stage.addEventListener('wheel',event => { event.preventDefault(); changeZoom(event.deltaY < 0 ? .25 : -.25); },{passive:false});
  stage.addEventListener('pointerdown',event => { if (zoom === 1) return; drag = {x:event.clientX-panX,y:event.clientY-panY}; stage.setPointerCapture(event.pointerId); });
  stage.addEventListener('pointermove',event => { if (!drag) return; panX=event.clientX-drag.x; panY=event.clientY-drag.y; transform(); });
  function stopDrag(event) { drag=null; if(stage.hasPointerCapture(event.pointerId)) stage.releasePointerCapture(event.pointerId); }
  stage.addEventListener('pointerup',stopDrag); stage.addEventListener('pointercancel',stopDrag);
  viewer.addEventListener('click',event => { if(event.target!==viewer) return; const rect=viewer.getBoundingClientRect(); if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom) viewer.close(); });
  buildCollection();
})();

(() => {
  const tabs = Array.from(document.querySelectorAll('[data-workflow-step]'));
  const panels = Array.from(document.querySelectorAll('.internship-workflow-panel'));
  function select(tab) {
    tabs.forEach(item => { const active = item === tab; item.setAttribute('aria-selected', String(active)); item.tabIndex = active ? 0 : -1; });
    panels.forEach(panel => { panel.hidden = panel.id !== tab.getAttribute('aria-controls'); });
  }
  tabs.forEach((tab,index) => {
    tab.addEventListener('click', () => select(tab));
    tab.addEventListener('keydown', event => {
      let next = index;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % tabs.length;
      else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index + tabs.length - 1) % tabs.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = tabs.length - 1;
      else return;
      event.preventDefault(); select(tabs[next]); tabs[next].focus();
    });
  });
})();
