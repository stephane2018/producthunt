import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from 'axios';
import jwtDecode from 'jwt-decode';
// Redux
import { Provider } from 'react-redux';
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userActions';
import {store} from './redux/store';
import AuthenticationRoute from './function/AuthenticationRoute'
import Home from '../src/view/Home';
import updateUsersProfil from '../src/view/updateUsersProfil';
import detailsProduits from '../src/view/detailsProduct';
import ProfilUser from '../src/view/profil';
import user from './view/updateUsersProfil';
import addproduit from './view/product/addlinkproduit';
import details from './view/product/details';
import gallery from './view/product/galeriesAndDescription';
import succesAddProduct from './view/product/succesaddproduct';
axios.defaults.baseURL =
  'https://us-central1-producthunts-cf964.cloudfunctions.net/api';

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 10000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = '/';
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}
function App() {
  return (
    
    <Router>
        <Switch>
      <Route exact path="/" component={Home}  />
      <Route exact path="/produits/:produitId" component={detailsProduits} />
      <Route exact path="/user/profil/updateinfos/:handle" component={updateUsersProfil} />
      <Route exact path="/user/profil/:handle" component={ProfilUser} />
      <Route exact path="/user/settings/:handle/" component={user}/>
      <Route exact path="/product/Ajouterproduit/new" component={addproduit} />
      <Route exact path="/product/Ajouterproduit/submission" component={details} />
      <Route exact path="/product/Ajouterproduit/galleryProduct" component={gallery} />
      <Route exact path="/product/Ajouterproduit/succesAddProduct" component={succesAddProduct} />
    </Switch>
    </Router>

  );
}
export default App;
