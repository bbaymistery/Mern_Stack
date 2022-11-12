import React from 'react'
import Announcement from '../components/Announcement'
import Slider from '../components/Slider'
import Categories from '../components/Categories'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar/index'
import AllProductsOnHomePage from '../components/AllProductsOnHomePage'

const Home = () => {
    return (
        <div>
            <Announcement />
            <Navbar />
            <Slider />
            <p style={{
                textAlign: 'center',
                fontSize: '2rem',
                fontWeight: 'bold',
                marginTop: '5rem'
            }}>Categories</p>
            <Categories />
            <hr>
            </hr>
            <p style={{
                textAlign: 'center',
                fontSize: '2rem',
                fontWeight: 'bold',
                marginTop: '5rem'
            }}>All Products</p>

            <AllProductsOnHomePage />
            <Footer />
        </div>
    )
}

export default Home