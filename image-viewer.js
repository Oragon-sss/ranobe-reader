(function () {
  function closeViewer() {
    const viewer = document.querySelector('.image-viewer');
    if (!viewer) return;

    viewer.classList.remove('open');
    document.body.classList.remove('viewer-open');
    window.setTimeout(() => viewer.remove(), 180);
  }

  function openViewer(image) {
    closeViewer();

    const viewer = document.createElement('div');
    viewer.className = 'image-viewer';
    viewer.setAttribute('role', 'dialog');
    viewer.setAttribute('aria-modal', 'true');

    const closeButton = document.createElement('button');
    closeButton.className = 'image-viewer-close';
    closeButton.type = 'button';
    closeButton.setAttribute('aria-label', 'Close image');

    const fullImage = document.createElement('img');
    fullImage.className = 'image-viewer-img';
    fullImage.src = image.currentSrc || image.src;
    fullImage.alt = image.alt || '';

    viewer.append(closeButton, fullImage);
    document.body.appendChild(viewer);
    document.body.classList.add('viewer-open');

    requestAnimationFrame(() => viewer.classList.add('open'));

    viewer.addEventListener('click', closeViewer);
    closeButton.addEventListener('click', closeViewer);
    fullImage.addEventListener('click', (event) => event.stopPropagation());
  }

  window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-lightbox-image]').forEach((image) => {
      image.tabIndex = 0;
      image.setAttribute('role', 'button');

      image.addEventListener('click', () => openViewer(image));
      image.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openViewer(image);
        }
      });
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeViewer();
    });
  });
})();
