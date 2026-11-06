document.querySelector('#year').textContent = new Date().getFullYear();
for (const button of document.querySelectorAll('[data-copy]')) {
  let resetTimer;
  button.addEventListener('click', async () => {
    const value = button.dataset.copy;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(value);
      } else {
        const field = document.createElement('textarea');
        field.value = value;
        field.setAttribute('readonly', '');
        field.style.cssText = 'position:fixed;left:-9999px;top:0';
        document.body.append(field);
        let copied = false;
        try {
          field.select();
          copied = document.execCommand('copy');
        } finally {
          field.remove();
          button.focus({ preventScroll: true });
        }
        if (!copied) throw new Error('Copy unavailable');
      }
      clearTimeout(resetTimer);
      button.querySelector('.copy-label').textContent = 'Copied';
      resetTimer = setTimeout(() => { button.querySelector('.copy-label').textContent = 'Copy'; }, 2000);
    } catch {
      button.querySelector('.copy-label').textContent = 'Try again';
    }
  });
}

// Native dialog keeps keyboard focus inside the screenshot viewer.
const galleryLinks = [...document.querySelectorAll('.gallery-thumb')];
const viewer = document.querySelector('.image-viewer');
if (viewer && typeof viewer.showModal === 'function') {
  const picture = viewer.querySelector('.viewer-image');
  let current = 0;
  let opener;
  let previousOverflow;
  function showImage(index) {
    current = (index + galleryLinks.length) % galleryLinks.length;
    const link = galleryLinks[current];
    picture.classList.remove('is-entering');
    picture.onload = () => {
      picture.classList.remove('is-entering');
      requestAnimationFrame(() => picture.classList.add('is-entering'));
    };
    picture.src = link.href;
    picture.alt = link.dataset.galleryCaption;
    viewer.querySelector('.viewer-caption').textContent = link.dataset.galleryCaption;
    viewer.querySelector('.viewer-count').textContent = `${current + 1} / ${galleryLinks.length}`;
    viewer.querySelector('.viewer-image-wrap').scrollTop = 0;
  }
  galleryLinks.forEach((link, index) => link.addEventListener('click', event => {
    event.preventDefault();
    opener = link;
    showImage(index);
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    viewer.showModal();
    viewer.querySelector('.viewer-close').focus();
  }));
  // Horizontal swipes navigate; vertical scrolling and pinch zoom stay available.
  const swipeSurface = viewer.querySelector('.viewer-image-wrap');
  let swipeStart = null;
  swipeSurface.addEventListener('touchstart', event => {
    if (event.touches.length !== 1) { swipeStart = null; return; }
    const touch = event.touches[0];
    swipeStart = { x: touch.clientX, y: touch.clientY, time: Date.now() };
  }, { passive: true });
  swipeSurface.addEventListener('touchend', event => {
    if (!swipeStart || event.touches.length || !event.changedTouches.length) return;
    const touch = event.changedTouches[0];
    const dx = touch.clientX - swipeStart.x;
    const dy = touch.clientY - swipeStart.y;
    const elapsed = Date.now() - swipeStart.time;
    swipeStart = null;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.5 && elapsed < 700 && (window.visualViewport?.scale || 1) <= 1.05) {
      showImage(current + (dx < 0 ? 1 : -1));
    }
  }, { passive: true });
  swipeSurface.addEventListener('touchcancel', () => { swipeStart = null; }, { passive: true });
  picture.draggable = false;
  viewer.querySelector('.viewer-close').addEventListener('click', () => viewer.close());
  viewer.querySelector('.viewer-prev').addEventListener('click', () => showImage(current - 1));
  viewer.querySelector('.viewer-next').addEventListener('click', () => showImage(current + 1));
  viewer.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); showImage(current - 1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); showImage(current + 1); }
  });
  viewer.addEventListener('click', event => {
    if (event.target !== viewer) return;
    const box = viewer.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) viewer.close();
  });
  viewer.addEventListener('close', () => {
    document.body.style.overflow = previousOverflow;
    opener?.focus({ preventScroll: true });
  });
}
