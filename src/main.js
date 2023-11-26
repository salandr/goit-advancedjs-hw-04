import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchImages } from './api';
import { renderGallery, galleryLoaded } from './markup';

iziToast.settings({
  position: 'bottomRight',
  timeout: 3000,
  maxWidth: 300,
});

let gallery = new SimpleLightbox('.gallery a', {
  captionType: 'data',
  captionDelay: 250,
});

//access elements on page
const galleryContainer = document.querySelector('.gallery');
const form = document.querySelector('.search-form');
const loadMoreBtn = document.querySelector('.load-more');
const imgListEnd = document.querySelector('.end-of-img-list');
//add event listeners to form and button
form.addEventListener('submit', formSubmitHandler);
loadMoreBtn.addEventListener('click', loadMoreBtnHandler);
//variables to store page number and userInput respectively
let pageNumber;
let userInput;
//submit form handler
async function formSubmitHandler(e) {
  e.preventDefault();
  pageNumber = 1; //set page number to one on each new search
  userInput = e.target.searchQuery.value.trim(); //user input value
  if (userInput === '') {
    iziToast.warning({
      message: 'Please specify search criteria!',
    });
    return;
  }
  galleryContainer.innerHTML = ''; //clear previous search gallery content
  imgListEnd.style.display = 'none'; //hides message of the end of img list if it was shown before
  loadMoreBtn.style.display = 'none'; //hides "Load more" button, if was visible before
  try {
    const imgs = await fetchImages(userInput, pageNumber); //fetch images based on user query
    //check if anything found and if array is empty show message
    if (imgs.hits.length === 0) {
      iziToast.error({
        message: `Sorry, there are no images matching your search query. Please try again.`,
      });
      e.target.searchQuery.value = '';
      return;
    }
    renderGallery(imgs, galleryContainer, gallery); //render gallery, refresh Simplelightbox
    e.target.searchQuery.value = ''; //clear input field
    //show success message with total hits
    iziToast.success({
      message: `Hooray! We found ${imgs.totalHits} images`,
    });
    if (imgs.hits.length < 40) {
      imgListEnd.style.display = 'block';
      return;
    }
    loadMoreBtn.style.display = 'block'; //make "Load more" button visible
  } catch (error) {
    // handle error
    iziToast.error({
      message: `${error.message}`,
    });
    console.log(error.message);
  }
}
//"load more" button handler
async function loadMoreBtnHandler() {
  pageNumber++; //increase page number by 1 with each request
  loadMoreBtn.visibility = 'hidden'; // hide "Load more" button
  try {
    const imgs = await fetchImages(userInput, pageNumber); //fetch next page images
    renderGallery(imgs, galleryContainer, gallery); // add new images to gallery and refresh Simplelightbox
    galleryLoaded(); //apply smooth scrolling
    //check page number, and display message about end of list of images, requesting page 7 will result in error
    if (pageNumber === 13) {
      loadMoreBtn.style.display = 'none';
      imgListEnd.style.display = 'block';
      return;
    }
    //check if reached the end of images list and hide "Load more" button and show message
    if (imgs.hits.length < 40 || imgs.hits.length === 0) {
      loadMoreBtn.style.display = 'none';
      imgListEnd.style.display = 'block';
      return;
    }
    loadMoreBtn.visibility = 'visible'; //show "Load more" button
  } catch (error) {
    //handle error
    iziToast.error({
      message: `${error.message}`,
    });
    console.log(error.message);
  }
}
