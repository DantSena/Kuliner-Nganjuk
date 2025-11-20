// search.js — wire search input to main.applyFilters
(function(){
  const searchEl = document.getElementById('searchInput');
  const categoryEl = document.getElementById('categoryFilter');
  const ratingEl = document.getElementById('ratingFilter');

  function doFilter(){
    const keyword = searchEl.value || '';
    const category = categoryEl.value || '';
    const minRating = ratingEl.value || '';
    window.app.applyFilters({ keyword, category, minRating });
  }

  // debounce simple
  let timer;
  searchEl && searchEl.addEventListener('input', ()=>{
    clearTimeout(timer);
    timer = setTimeout(doFilter, 220);
  });

  categoryEl && categoryEl.addEventListener('change', doFilter);
  ratingEl && ratingEl.addEventListener('change', doFilter);
})();
