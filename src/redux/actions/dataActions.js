import {
  SET_PRODUITS,
  LOADING_DATA,
  LIKE_PRODUIT,
  UNLIKE_PRODUIT,
  DELETE_PRODUIT,
  SET_ERRORS,
  POST_PRODUIT,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_PRODUIT,
  STOP_LOADING_UI,
  SUBMIT_COMMENT, 
  GET_COMMENT_TO_CURRENT_LISTES_PRODUCTS,
  GET_COMMENT_PRODUCTS,
  LOAD_IMAGE_DATA_TO_REUSE,
  LOAD_IMAGE_DATA_TO_REUSEONE,
  LOAD_IMAGE_DATA_TO_REUSETWO,
  LOAD_IMAGE_DATA_TO_REUSETHREE,
  UPDATE_PRODUITS
} from '../types';
import axios from 'axios';
// Get all produit
export const getproduits = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get('/productListes')
    .then((res) => {
      dispatch({
        type: SET_PRODUITS,
        payload: res.data
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_PRODUITS,
        payload: []
      });
    });
};
export const getproduit = (produitsId) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/product/${produitsId}`)
    .then((res) => {
      dispatch({
        type: SET_PRODUIT,
        payload: res.data
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => console.log(err));
};
//get comment listes of product 
export const getcomments = (produitsId) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/getcomment/${produitsId}`)
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: GET_COMMENT_PRODUCTS,
        payload: res.data
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => console.log(err));
};
// Post a produits
export const postproduits = (id, newproduits) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post(`/addproduct/${id}`, newproduits)
    .then((res) => {
      dispatch({
        type: POST_PRODUIT, 
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};
// Post a produits
export const savetherestofdata= (id, newproduits) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post(`/update/${id}`, newproduits)
    .then((res) => {
      dispatch({
        type: UPDATE_PRODUITS,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};
// Post a produits
export const deleteProduct = (id) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post(`/cancel/${id}`)
    .then((res) => {
      dispatch({
        type: POST_PRODUIT,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

// Like a produits
export const likeproduits = (produitsId) => (dispatch) => {
  axios
    .get(`/product/${produitsId}/vote`)
    .then((res) => {
      dispatch({
        type: LIKE_PRODUIT,
        payload: res.data
      });
    })
    .catch((err) => console.log(err));
};
// Unlike a produits
export const unlikeproduits = (produitsId) => (dispatch) => {
  axios
    .get(`product/${produitsId}/unvote`)
    .then((res) => {
      dispatch({
        type: UNLIKE_PRODUIT,
        payload: res.data
      });
    })
    .catch((err) => console.log(err));
};
// Submit a comment
export const submitComment = (produitsId, commentData) => (dispatch) => {
  axios
    .post(`product/${produitsId}/comment`, commentData)
    .then((res) => {
      dispatch({
        type: GET_COMMENT_TO_CURRENT_LISTES_PRODUCTS,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch((err) => console.log(err));
};
export const deleteproduits = (produitsId) => (dispatch) => {
  axios
    .delete(`produit/${produitsId}`)
    .then(() => {
      dispatch({ type: DELETE_PRODUIT, payload: produitsId });
    })
    .catch((err) => console.log(err));
};

export const getUserData = (userHandle) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/user/${userHandle}`)
    .then((res) => {
      dispatch({
        type: SET_PRODUIT,
        payload: res.data.produit
      });
    })
    .catch(() => {
      dispatch({
        type: SET_PRODUIT,
        payload: null
      });
    });
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

export const uploadFirsToProductbeforUploadAllProductDataImage = (formData) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .post(`/addproductimage`, formData, {headers: { 'content-type': 'application/x-www-form-urlencoded' }})
    .then((res) => {
      localStorage.setItem('imagePrincipale', res.data.UserImagefirst);
      localStorage.setItem('idproduct', res.data.productId);
      dispatch({
        type: LOAD_IMAGE_DATA_TO_REUSE, 
        payload: res.data
      });
    })
    .catch((err) => console.log(err));
};
export const uploadFirsToProductbeforUploadAllProductDataImage1 = (idProduits, formData) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .post(`/addproductImage1/${idProduits}`, formData, {headers: { 'content-type': 'application/x-www-form-urlencoded' }})
    .then((res) => {
      localStorage.setItem('img1', res.data.Userproduct1);
      dispatch({
        type:LOAD_IMAGE_DATA_TO_REUSEONE,
        payload: res.data
      });
    })
    .catch((err) => console.log(err));
};
export const uploadFirsToProductbeforUploadAllProductDataImage2= (idProduits, formData) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .post(`/addproductImage2/${idProduits}`, formData, {headers: { 'content-type': 'application/x-www-form-urlencoded' }})
    .then((res) => {
      localStorage.setItem('img2', res.data.Userproduct2);
      dispatch({
        type: LOAD_IMAGE_DATA_TO_REUSETWO,
        payload: res.data
      });
    })
    .catch((err) => console.log(err));
};
export const uploadFirsToProductbeforUploadAllProductDataImage3= (idProduits, formData) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .post(`/addproductImage3/${idProduits}`, formData, {headers: { 'content-type': 'application/x-www-form-urlencoded' }})
    .then((res) => {
      localStorage.setItem('img3', res.data.Userproduct3);
      dispatch({
        type: LOAD_IMAGE_DATA_TO_REUSETHREE,
        payload: res.data
      });
    })
    .catch((err) => console.log(err));
};

