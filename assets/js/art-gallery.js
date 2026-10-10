(() => {
  const links = [...document.querySelectorAll('.art-image-link')];
  const viewer = document.querySelector('.art-viewer');
  if (!viewer || !links.length) return;
  const image = viewer.querySelector('#art-viewer-image');
  const title = viewer.querySelector('#art-viewer-title');
  const count = viewer.querySelector('.art-viewer-count');
  let current = 0;
  let opener;
  function show(index) {
    current = (index + links.length) % links.length;
    const link = links[current];
    image.src = link.href;
    image.alt = link.querySelector('img').alt;
    title.textContent = link.closest('figure').querySelector('figcaption').textContent;
    count.textContent = `${current + 1} / ${links.length}`;
  }
  links.forEach((link, index) => link.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    opener = link;
    show(index);
    viewer.showModal();
  }));
  viewer.querySelector('.art-close').addEventListener('click', () => viewer.close());
  viewer.querySelector('.art-previous').addEventListener('click', () => show(current - 1));
  viewer.querySelector('.art-next').addEventListener('click', () => show(current + 1));
  viewer.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); show(current - 1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); show(current + 1); }
  });
  viewer.addEventListener('close', () => opener?.focus());
})();
