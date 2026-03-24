'use client';
import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import Link from 'next/link';
import AddProduct from './AddProduct';
import {useRouter} from 'next/navigation';

  function SalesTracker() {
    const router= useRouter();
    const [products, setProducts] = useState([]);
    const [sales, setSales] = useState([]); 
    const [selectedProduct, setSelectedProduct] = useState(null); 
    const [quantitySold, setQuantitySold] = useState(0);
    const [salePrice, setSalePrice] = useState(0); 
    const [error, setError] = useState(null);

     useEffect(() => {
        axios.get('https://tracker.great-site.net/products.php?products=1')
        .then(res => { setProducts(res.data);
     })
        .catch(err => console.error(err)); 
         axios.get('https://tracker.great-site.net/sales.php?sales=1')
        .then(res => { setSales(res.data);
     })
        .catch(err => console.error(err)); 
     }, []);

    const handleProductAdded = async () => {
      try{
        const res = await axios.get('https://tracker.great-site.net/products.php?products=1');
        setProducts(res.data);
      } catch(err) { 
        console.error(err); 
      }
    };


    const handleQuantityChange= (e) => setQuantitySold(e.target.value);
    const handleSalePriceChange = (e) => setSalePrice(e.target.value);
    const handleSale = (product) => {
        setSelectedProduct(product);
       };
       
       const handleSubmitSale = async () => { 

        try{
          const formData = new FormData();
          formData.append('sale','1');
          formData.append('product_id', selectedProduct.id);
           formData.append('quantity_sold', quantitySold);
            formData.append('sale_price', salePrice);

            const response = await axios.post('https://tracker.great-site.net/sales.php', formData );
     
            if (response.data.success) {
              alert(response.data.message);
              const salesRes = await axios.get('https://tracker.great-site.net/sales.php?sales=1');
              setSales(salesRes.data);
                setSelectedProduct(null);
            setQuantitySold(0);
            setSalePrice(0);
            }
        } catch (err) {
          console.error(err);
        }
        };
        if (error) {
          return <div className="text-red-500">Error: {error}</div>;
        }
  
         return (
          <>
          <AddProduct onProductAdded={handleProductAdded}/> 
           <div className="bg-white p-4 m-b-6"> 
           <h1 className="text-3xl text-orange-500 border-b-2 border-black pb-2">Sales Tracker</h1>
            <div className="flex flex-col lg:flex-row justify-between"> 
              <div className="lg:w-1/2 border border-orange-500 p-4 mb-4 lg:mb-0"> 
                <h2 className="font-bold text-orange-500">Products</h2>
                 <ul className="space-y-2 "> 
                {Array.isArray(products) && products.map((product) => (
                   <li key={product.id} className="mb-2">
                   <button onClick={() => handleSale(product)} className="bg-orange-500 text-white px-4 py-2 rounded cursor-pointer w-full"> 
                    {product.name} 
                    </button>
                    </li> 
                  ))} 
                    </ul> 
                    </div>
                      
            <div className="lg:w-1/2 border border-orange-500 p-4 overflow-x-auto">
            <h2 className="text-orange-500">Sales</h2> 
            <div className="overflow-x-auto">
             <table className="w-full border-collapse"> 
        <thead>
           <tr> 
          <th className="border border-orange-500 text-black p-2">Product</th>
          <th className="border border-orange-500 text-black p-2">Quantity Sold</th> 
          <th className="border border-orange-500 text-black p-2">Sale Price</th>
         <th className="border border-orange-500 text-black p-2">Profit</th> 
         </tr> 
         </thead>
         <tbody> 
         {Array.isArray(sales) && sales.map((sale)  => ( <tr key={sale.id}> 
        <td className="border border-orange-500 p-2 text-black">{sale.product_name}</td>
       <td className="border border-orange-500 p-2 text-black">{sale.quantity_sold}</td> 
       <td className="border border-orange-500 p-2 text-black">{sale.sale_price}</td> 
       <td  className="border border-orange-500 p-2 text-black">{sale.profit}</td> 
      </tr>
       ))}
       </tbody>
      </table> 
        <button type="button" onClick={() => {
        setQuantitySold(0);
        setSalePrice(0);
        setSelectedProduct(null);
       }}
       className="ml-4 bg-gray-500 text-white px-4 py-2 rounded">
        Clear
       </button>AW3
      </div>
       </div> 
        </div> 
       {selectedProduct && ( 
        <div className="mt-4 border border-orange-500 p-4"> 
        <h2 className="text-orange-500">Record Sale for {selectedProduct.name}</h2>
         <form>
         <div className="mb-2">
       <label className="block text-orange-500"> Quantity Sold: 
       <input type="number" value={quantitySold} onChange={handleQuantityChange} className="w-full px-2 py-1 border border-orange-500 rounded"/> 
       </label>
        </div>
         <div className="mb-2">
  <label className="block text-orange-500"> Sale Price: <input type="number" value={salePrice} onChange={handleSalePriceChange} className="w-full px-2 py-1 border border-orange-500 rounded"/> 
  </label> 
  </div>
 <button type="button" onClick={handleSubmitSale} className="bg-orange-500 text-white px-4 py-2 rounded cursor-pointer "> Submit Sale                             
 </button>
 </form>                    
  </div>
 )}
  </div> 
  </>
     );
    }
  export default SalesTracker;