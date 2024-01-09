import React from 'react';
import { useParams } from 'react-router-dom';
import '../styles/ProductDetail.css';

import { productList1, productList2 } from './Products'; 

function ProductDetail() {
  const { productId } = useParams();
  const allProducts = [...productList1, ...productList2];
  const product = allProducts.find(p => p.id === parseInt(productId));

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="product-detail">
      <img src={product.image} alt={product.name} className="product-detail-image" />
      <h2 className="product-detail-name">{product.name}</h2>
      <div dangerouslySetInnerHTML={{ __html:product.info}}/>
    </div>
  );
}

export default ProductDetail;