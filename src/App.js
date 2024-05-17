import './App.css';

import { loadData } from './services/api';

import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppProvider from './providers/AppProvider';
import Home from './screens/Home';
import Products from "./screens/Products";
import Product from './screens/Product';
import Blog from './screens/Blog';
import Article from './screens/Article';
import Cart from './screens/Cart';
import Game from './screens/Game';
import Contact from './screens/Contact';
import Search from './screens/Search';
import DefaultLayout from './layouts/DefaultLayout';

import { setSessionProducts } from './services/session';

function App() {
  const [productGroupsData, setProductGroupData] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [articles, setArticles] = useState([]);

  const apisToLoad = [
    { resourceType: "product-groups", setter: setProductGroupData, action: () => { } },
    { resourceType: "products", setter: setProductsData, action: setSessionProducts },
    { resourceType: "articles", setter: setArticles, action: () => { } }
  ]

  useEffect(() => {
    apisToLoad.forEach(apiToLoad => {
      loadData(apiToLoad.resourceType, apiToLoad.setter, apiToLoad.action);
    });
  }, []);

  return (
    <div className="App">
      <AppProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<DefaultLayout/>}>
              <Route index element={
                <Home
                  productsData={productsData}
                  productGroupsData={productGroupsData}
                />
              }>
              </Route>
              <Route path="products" element={ <Products /> }></Route>
              <Route path="products/:slug" element={<Product />}></Route>
              <Route path="blog" element={ <Blog articles={articles} /> }></Route>
              <Route path="blog/:slug" element={ <Article articles={articles} /> }></Route>
              <Route path="contact" element={ <Contact /> }></Route>
              <Route path="terms" element={ <p>Terms</p> }></Route>
              <Route path="search" element={ <Search articles={articles}/> }></Route>
              <Route path="cart" element={ <Cart /> }></Route>
              <Route path="game" element={ <Game /> }></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </div>
  );
}

export default App;
