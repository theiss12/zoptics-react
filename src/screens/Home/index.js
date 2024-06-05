import "./style.scss";

import { useState, useEffect } from "react";
import { loadData } from '../../services/api';

import Cover from "../../components/Cover";
import Services from '../../components/Services';
import Tiles from '../../components/Tiles';
import ProductGroup from '../../components/ProductGroup';
import Footer from "../../components/Footer";
//import Cart from "../../components/Cart";

function Home({productsData, productGroupsData, cartItems, updateCart}) {
  const [servicesData, setServicesData] = useState([]);
  const [refferencesData, setRefferencesData] = useState([]);
  const [coverSlideData, setCoverSlideData] = useState([]);


  const apisToLoad = [
    { resourceType: "services", setter: setServicesData },
    { resourceType: "refferences", setter: setRefferencesData },
    { resourceType: "slides", setter: setCoverSlideData },
  ]

  useEffect(() => {
    apisToLoad.forEach(apiToLoad => {
      loadData(apiToLoad.resourceType, apiToLoad.setter);
    });
  }, []);

  return (
    <div className="screen-home">
      <Cover slides={coverSlideData} />
      <Services items={servicesData} />
      <Tiles items={refferencesData} />
      {
        productGroupsData.map((productGroup, groupIndex) =>
          <ProductGroup
            key={productGroup.id}
            group={productGroup}
            products={productsData}
            updateCart={updateCart}
            collapsedState={groupIndex !== 0}
          />
        )
      }
      <Footer />
    </div>
  );
}

export default Home;