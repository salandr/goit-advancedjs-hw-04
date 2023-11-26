const PIXABAY_API_KEY = '40913956-3fb26abc12009e80362ea258a';
import axios from 'axios';

export async function fetchImages(query, pageNumber) {
  const response = await axios.get(
    `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${pageNumber}&per_page=40`
  );
  return response.data;
}
