import React from 'react';
import Navbar from '../components/Navbar';
import Banner from '../components/Banner';

const Home = () => {
    return (
        <div>
            <Navbar/>
           <Banner/>
           <section>
            Best selling products
           </section>
        </div>
    );
};

export default Home;