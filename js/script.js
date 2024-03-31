const form = document.getElementById('search-form');
const input = document.getElementById('search-input');
const imageGrid = document.getElementById('image-grid');
const loadMoreButton = document.getElementById('load-more');
let page = 1;
let currentQuery = '';

form.addEventListener('submit', async function (event) {
  event.preventDefault();
  const query = input.value.trim();
  if (query === '') return;

  currentQuery = query;
  page = 1; 

  try {
    const response = await fetch(`https://api.unsplash.com/search/photos?query=${query}&page=${page}&client_id=5H7JS-IgTcyE3fcOv426BQpMfiMINPJs3yb1aDBuNGo`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    displayImages(data.results);
    toggleLoadMoreButton(data.total_pages, page);  
  } catch (error) {
    console.error('Error fetching images:', error);
  }
});

loadMoreButton.addEventListener('click', async function () {
  page++;

  try {
    const response = await fetch(`https://api.unsplash.com/search/photos?query=${currentQuery}&page=${page}&client_id=5H7JS-IgTcyE3fcOv426BQpMfiMINPJs3yb1aDBuNGo`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    displayImages(data.results);
    toggleLoadMoreButton(data.total_pages, page); // Toggle the "Load More" button based on total pages
  } catch (error) {
    console.error('Error fetching more images:', error);
  }
});

function displayImages(images) {
  if (page === 1) {
    imageGrid.innerHTML = ''; 
  }

  images.forEach(image => {
    const imageCard = document.createElement('div');
    imageCard.classList.add('image-card');
    
    const img = document.createElement('img');
    img.src = image.urls.regular;
    img.alt = image.alt_description;
    imageCard.appendChild(img);
    
    const nameLink = document.createElement('a');
    nameLink.href = image.links.html;
    nameLink.target = '_blank'; 
    nameLink.textContent = image.user.name;
    imageCard.appendChild(nameLink);
    
    imageGrid.appendChild(imageCard);
  });
}

function toggleLoadMoreButton(totalPages, currentPage) {
  if (currentPage < totalPages) {
    loadMoreButton.style.display = 'block'; 
  } else {
    loadMoreButton.style.display = 'none'; 
  }
}


toggleLoadMoreButton(0, 0);
