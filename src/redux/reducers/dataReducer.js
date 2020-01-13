import {
  SET_PRODUITS,
  LIKE_PRODUIT,
  UNLIKE_PRODUIT,
  LOADING_DATA,
  DELETE_PRODUIT,
  POST_PRODUIT,
  UPDATE_PRODUITS,
  SET_PRODUIT,
  STOP_LOADING_UI,
  GET_COMMENT_PRODUCTS,
  GET_COMMENT_TO_CURRENT_LISTES_PRODUCTS,
  SUBMIT_COMMENT, 
  LOAD_IMAGE_DATA_TO_REUSE, 
  LOAD_IMAGE_DATA_TO_REUSEONE,
  LOAD_IMAGE_DATA_TO_REUSETWO,
  LOAD_IMAGE_DATA_TO_REUSETHREE,
} from '../types';

const initialState = {
  produits: [],
  comments:[],
  comment:{},
  produit: {},
  vote: 0,
  idforVote:0,
  message:'',
  firsdataImageForProduct:{},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      };
    case STOP_LOADING_UI:
      return {
        ...state,
        loading: false
      };
    case LOAD_IMAGE_DATA_TO_REUSE:
      return {
        ...state,
        firsdataImageForProduct: action.payload,
        loading: false
      };
    case LOAD_IMAGE_DATA_TO_REUSEONE:
        return {
          ...state,
          firsdataImageForProduct1: action.payload,
          loading: false
        };
    case LOAD_IMAGE_DATA_TO_REUSETWO:
        return {
          ...state,
          firsdataImageForProduct2: action.payload,
          loading: false
        };
    case LOAD_IMAGE_DATA_TO_REUSETHREE:
          return {
            ...state,
            firsdataImageForProduct3: action.payload,
            loading: false
          };
    case SET_PRODUITS:
        return {
          ...state,
          produits: action.payload,
          loading: false
        };
    case UPDATE_PRODUITS:
        return {
        ...state,
         message: action.payload.message,
        loading: false
    };
    case GET_COMMENT_PRODUCTS:
        return {
        ...state,
        comments: action.payload,
        loading: false
    };
    case GET_COMMENT_TO_CURRENT_LISTES_PRODUCTS:
        return {
        ...state,
        comments: [...state.comments ,action.payload],
        loading: false
    };
   
    case SET_PRODUIT:
      return {
        ...state,
        produit: action.payload,
        loading: false
      };
    case LIKE_PRODUIT:
      return {
        ...state,
        vote: action.payload.upvote,
        idforVote:action.payload.productId
      };
    case UNLIKE_PRODUIT:
      let index = state.produits.findIndex(
        (produit) => produit.produitId === action.payload.productId
      );
      state.produits[index] = action.payload;
      if (state.produit.produitId === action.payload.productId) {
        state.produit = action.payload;
      }
      return {
        ...state
      };
    case DELETE_PRODUIT:
      index = state.screams.findIndex(
        (scream) => scream.screamId === action.payload
      );
      state.screams.splice(index, 1);
      return {
        ...state
      };
    case POST_PRODUIT:
      return {
        ...state,
        produits: [action.payload, ...state.screams]
      };
   
    default:
      return state;
  }
}
