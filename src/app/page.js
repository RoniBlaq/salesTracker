'use client';
import React, { useEffect, useState } from 'react'; 
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import styles from './page.module.scss';
import Head from 'next/head';
import Image from 'next/image';


function Home () {
  return(

   <div className={`${styles.container} text-white min-h-screen flex flex-col`}>
    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/221808/sky.jpg" alt="photo" className={styles.background} />
       
     <Head>
      <title>Sales Tracker</title>
       </Head>
       <header className="py-4 px-6 flex justify-between items-center z-10 relative">
        <h1 className="text-2xl md:text-3xl text-center font-bold text-orange-500">Sales Tracker</h1>
         </header>

         <main className="py-12 px-6 flex flex-col items-center justify-center flex-grow z-10 relative">
          <section className="text-center animate-fade-in"> 
            <h2 className="text-2xl md:text-4xl font-bold mb-4">Streaming your Sales Process</h2>
            <p className="md:text-lg mb-8">Easily track and manage your sales with our intuitive platform.</p>
            <div className="flex space-x-4"> 
              <Link href="/first" className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-full transition-colors text-1xl md:text-2xl">Add Product</Link>
            <Link href="/SalesTracker" className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-full transition-colors text-1xl md:text-2xl">View Sales Tracker</Link>
            </div>
          </section> 
          </main>
     {Array.from({ length:100 }, (_, i) => (
      <div key={i} className={styles.circleContainer}>
      <div className={styles.circle}/>
      </div>
     ))}
      </div>
  );
}
  export default Home;