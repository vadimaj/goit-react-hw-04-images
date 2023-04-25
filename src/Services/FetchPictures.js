import axios from 'axios';
const BASIC_URL = 'https://pixabay.com/api';
const KEY = '34291894-c5b60193cb7b58e4e154e577d';
const PICTURES_PER_PAGE = 12;

const FetchPictures = async (searchQuery, page) => {
  const options = new URLSearchParams({
    key: KEY,
    q: searchQuery,
    per_page: PICTURES_PER_PAGE,
    image_type: 'photo',
    lang: 'en',
    page: page,
    orientation: 'horizontal',
    safesearch: true,
  });
  try {
    const response = await axios.get(`${BASIC_URL}/?${options}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export { FetchPictures, PICTURES_PER_PAGE };
