'use client';
import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import Link from 'next/link';
import {useRouter} from 'next/navigation';

  function AddProduct({ onProductAdded }) {
    const router= useRouter();
     const [name, setName] = useState('');
      const [quantity, setQuantity] = useState(0); 
      const [costPrice, setCostPrice] = useState(0); 
      const [sellingPrice, setSellingPrice] = useState(0);
       const [message, setMessage] = useState(''); 
       const [error, setError] = useState('');

        const handleAddProduct = async () => {  
          if (!name || quantity <= 0 || costPrice <= 0 || sellingPrice <= 0) {
            alert('Invalid input');
            return;
          }
            try{
          const formData = new FormData();
          formData.append('add_product', '1');
          formData.append('name', name);
           formData.append('quantity',quantity); 
           formData.append('cost_price', costPrice);
           formData.append('selling_price', sellingPrice);

           const response = await axios.post('http://localhost/tracker/products.php', formData);

           console.log('Response:', response.data);

           if (response.data.success) {
            alert(response.data.message);
             onProductAdded();
             setName('');
             setQuantity(0);
             setCostPrice(0);
             setSellingPrice(0);
           } else {
            console.error('Backend error:', response.data);
           } 
         } catch (err) {
          console.error('Request failed:', err);
         }    
          };
         
         return (
          <div className="bg-white">
        <div className="p-4 border border-orange-500 mb-4">
            <h2 className=" text-xl font-bold mb-2 text-orange-500">Add Product</h2> 
             <form>
                 <div className="mb-2">
       <label className="block text-orange-500"> Name: 
                 <input type="name" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-2 py-1 border border-orange-500 rounded"/> 
                     </label>
                 </div>
          <div className="mb-2">
            <label className="block text-orange-500">Quantity: <input type="number" value={quantity} onChange={(e) =>setQuantity(e.target.value)} className="w-full px-2 py-1 border border-orange-500 rounded"/> 
         </label> 
         </div>
          <div className="mb-2">
            <label className="block text-orange-500">Cost Price (#): <input type="number" value={costPrice} onChange={(e) =>setCostPrice(e.target.value)} className="w-full px-2 py-1 border border-orange-500 rounded"/> 
         </label>
         </div>
          <div className="mb-2">
            <label className="block text-orange-500">Selling Price (#): <input type="number" value={sellingPrice} onChange={(e) =>setSellingPrice(e.target.value)} className="w-full px-2 py-1 border border-orange-500 rounded"/> 
         </label> 
         </div>
          
         <button type="button" onClick={handleAddProduct} className="bg-orange-500 text-white px-4 py-2 rounded cursor-pointer "> Add Product</button> 
         {message && <p className="text-green-500 mt-2">{message}</p>}
         </form> 
       </div> 
       </div>
     );
    }
  export default AddProduct;