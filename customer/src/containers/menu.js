import React from 'react';

import Loader from '../ui/loader';
import Logo from '../ui/logo';
import Category from '../ui/category';
import Footer from '../ui/footer';

import '../styles/containers/menu.css';

const Menu = ({ menu: { categories } }) => (
  <div className="menu">
    {
      !categories
        ? <Loader />
        : (
          <>
            <Logo logoPath="/logo.jpg" barName="Penderels Oak" />
            {
              categories.map(category => (
                <Category key={category._id} category={category} />
              ))
            }
            <Footer buttonName="Checkout" onClick={() => console.log('clicked')} />
          </>
        )
   }
  </div>
);

export default Menu;
