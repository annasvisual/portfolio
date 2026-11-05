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
