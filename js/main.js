// main.js — load data and render cards; expose helper functions for search/filter
let kulinerData = [];

async function loadData(){
  try{
    const res = await fetch('data/kuliner.json');
    kulinerData = await res.json();
    displayList(kulinerData);
    populateLocationOptions();
  }catch(err){
    console.error('Gagal memuat data:', err);
    document.getElementById('listWrap').innerHTML = '<p style="padding:20px">Gagal memuat data kuliner.</p>';
  }
}

function displayList(list){
  const wrap = document.getElementById('listWrap');
  const noResult = document.getElementById('noResult');
  wrap.innerHTML = '';
  if(!list || list.length === 0){
    noResult.style.display = 'block';
    return;
  }
  noResult.style.display = 'none';
  list.forEach(item=>{
    const card = document.createElement('article');
    card.className = 'kuliner-card';
    card.innerHTML = `
      <img class="kuliner-img" src="${item.gambar}" alt="${item.nama}" loading="lazy"/>
      <div class="kuliner-body">
        <h3>${item.nama}</h3>
        <p class="muted">${truncate(item.deskripsi,110)}</p>
        <p><strong>Lokasi:</strong> ${item.lokasi}</p>
        <p>⭐ ${item.rating} • ${item.harga} <span class="tag">${item.kategori || 'lainnya'}</span></p>
        <p style="margin-top:10px"><a class="btn" href="detail.html?id=${item.id}">Lihat Detail</a></p>
      </div>
    `;
    wrap.appendChild(card);
  });
}

function truncate(text, n){
  if(!text) return '';
  return text.length>n ? text.slice(0,n-1)+'…' : text;
}

// helpers used by search.js / filter.js
function getAllData(){ return kulinerData }
function applyFilters({keyword='', category='', minRating='', location=''} = {}){
  const kw = String(keyword || '').toLowerCase().trim();
  let filtered = kulinerData.filter(item=>{
    const matchKeyword = kw === '' || [item.nama, item.lokasi, item.deskripsi, item.kategori].join(' ').toLowerCase().includes(kw);
    const matchCategory = !category || (item.kategori === category);
    const matchRating = !minRating || Number(item.rating) >= Number(minRating);
    const matchLocation = !location || item.lokasi.toLowerCase().includes(location.toLowerCase());
    return matchKeyword && matchCategory && matchRating && matchLocation;
  });
  displayList(filtered);
}

function populateLocationOptions(){
  // optional: build location select if you want in future
}

window.addEventListener('load', loadData);
window.app = {
  getAllData, applyFilters
};
