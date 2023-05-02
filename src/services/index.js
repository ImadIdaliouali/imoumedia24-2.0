const axios = require('axios').default;

import { ENDPOINTS, IMOUMEDIA24_BASE_URL, IMOUMEDIA24_URL } from '../constants';

const IMOUMEDIA24_HTTP_REQUEST = axios.create({
    baseURL: IMOUMEDIA24_BASE_URL,
});

const getPosts = (currentPage = 1, category) => IMOUMEDIA24_HTTP_REQUEST.get(ENDPOINTS.POSTS, { params: { page: currentPage, categories: category } });

const getCategories = () => IMOUMEDIA24_HTTP_REQUEST.get(ENDPOINTS.CATEGORIES);

const getPostById = (postId) => IMOUMEDIA24_HTTP_REQUEST.get(`${ENDPOINTS.POSTS}/${postId}`);

const getAuthor = (authorId) => IMOUMEDIA24_HTTP_REQUEST.get(`${ENDPOINTS.USERS}/${authorId}`);

const getImage = (path) => `${IMOUMEDIA24_URL}/${path}`;

export { getPosts, getCategories, getPostById, getAuthor, getImage };