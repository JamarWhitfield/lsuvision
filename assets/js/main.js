document.addEventListener('DOMContentLoaded', ()=>{
  console.log('LSU Vision site starter — ready');

  const recentPaperLink = document.getElementById('recent-paper-link');
  if (!recentPaperLink) {
    return;
  }

  fetch('publications.html?v=20260414', { cache: 'no-store' })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to load publications: ${response.status}`);
      }
      return response.text();
    })
    .then((html) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const topPaperLink = doc.querySelector('#publications-list .card-title a');

      if (!topPaperLink) {
        return;
      }

      recentPaperLink.textContent = topPaperLink.textContent.trim();
      recentPaperLink.href = topPaperLink.href;

      if (topPaperLink.hasAttribute('target')) {
        recentPaperLink.target = topPaperLink.getAttribute('target') || '_blank';
      } else {
        recentPaperLink.removeAttribute('target');
      }

      if (topPaperLink.hasAttribute('rel')) {
        recentPaperLink.rel = topPaperLink.getAttribute('rel') || 'noopener';
      } else {
        recentPaperLink.removeAttribute('rel');
      }
    })
    .catch((error) => {
      console.error('Failed to load recent paper from publications.', error);
    });
});
