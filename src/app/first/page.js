'use client';
import React, { useEffect, useState } from 'react'; 
import axios from 'axios';
// import AddProduct from '@/components/AddProduct';
import SalesTracker from '@/components/SalesTracker';

function First () {

  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState ([]);
  const [refresh, setRefresh] = useState([false]);

  useEffect(() => {
    axios.get('http://localhost/tracker/sales.php?products')
    .then(response => setProducts(response.data));
    axios.get('http://localhost/tracker/sales.php?sales')
     .then(response => setSales(response.data));
     setRefresh(false);
  }, [refresh]);
     
  const handleProductAdded = () => {
    setRefresh(true);
  }; 
  
  const handleSaleRecorded = (newSale) => {
    setSales([...sales, newSale]);
    setRefresh(true);
  };


  return(
     
   <div className="container mx-auto p-4 bg-black"> 
   <h1 className=" text-3x1 font-bold mb-4 text-orange-500 text-center">Inventory & Sales Management</h1> 
     
    <SalesTracker
    products={products}
    sales={sales}
    onSalesRecorded={handleSaleRecorded}
    />
      </div>
  );
}
  export default First;