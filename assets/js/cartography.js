(() => {
  const viewer = document.querySelector('.carto-viewer');
  if (!viewer) return;
  const image = viewer.querySelector('img');
  let opener;
  document.querySelectorAll('.carto-artwork').forEach(link => {
    link.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      opener = link;
      viewer.querySelector('h2').textContent = link.dataset.title;
      const preview = link.querySelector('img');
      image.alt = preview.alt;
      image.onerror = () => { image.onerror = null; image.src = preview.currentSrc || preview.src; };
      image.src = link.href;
      viewer.querySelector('.carto-view-original').href = link.href;
      viewer.showModal();
    });
  });
  viewer.querySelector('button').addEventListener('click', () => viewer.close());
  viewer.addEventListener('close', () => opener?.focus());
})();
