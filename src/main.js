import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchImages } from './api';
import { renderGallery, galleryLoaded } from './markup';

iziToast.settings({
  position: 'topRight',
  timeout: 3000,
  maxWidth: 300,
});

let gallery = new SimpleLightbox('.gallery a', {
  captionType: 'data',
  captionDelay: 250,
});

const galleryContainer = document.querySelector('.gallery');
const form = document.querySelector('.search-form');
const loadMoreBtn = document.querySelector('.load-more');
const imgListEnd = document.querySelector('.end-of-img-list');

form.addEventListener('submit', formSubmitHandler);
loadMoreBtn.addEventListener('click', loadMoreBtnHandler);

let pageNumber;
let userInput;

async function formSubmitHandler(e) {
  e.preventDefault();
  pageNumber = 1;
  userInput = e.target.searchQuery.value.trim();
  if (userInput === '') {
    iziToast.warning({
      message: 'Please specify search criteria!',
    });
    return;
  }
  galleryContainer.innerHTML = '';
  imgListEnd.style.display = 'none';
  loadMoreBtn.style.display = 'none';
  try {
    const imgs = await fetchImages(userInput, pageNumber);
    if (imgs.hits.length === 0) {
      iziToast.error({
        message: `Sorry, there are no images matching your search query. Please try again.`,
      });
      e.target.searchQuery.value = '';
      return;
    }
    renderGallery(imgs, galleryContainer, gallery);
    e.target.searchQuery.value = '';

    iziToast.success({
      message: `Hooray! We found ${imgs.totalHits} images`,
    });
    if (imgs.hits.length < 40) {
      imgListEnd.style.display = 'block';
      return;
    }
    loadMoreBtn.style.display = 'block';
  } catch (error) {
    iziToast.error({
      message: `${error.message}`,
    });
    console.log(error.message);
  }
}

async function loadMoreBtnHandler() {
  pageNumber++;
  loadMoreBtn.visibility = 'hidden';
  try {
    const imgs = await fetchImages(userInput, pageNumber);
    renderGallery(imgs, galleryContainer, gallery);
    galleryLoaded();

    if (pageNumber === 13) {
      loadMoreBtn.style.display = 'none';
      imgListEnd.style.display = 'block';
      return;
    }

    if (imgs.hits.length < 40 || imgs.hits.length === 0) {
      loadMoreBtn.style.display = 'none';
      imgListEnd.style.display = 'block';
      return;
    }
    loadMoreBtn.visibility = 'visible';
  } catch (error) {
    iziToast.error({
      message: `${error.message}`,
    });
    console.log(error.message);
  }
}
