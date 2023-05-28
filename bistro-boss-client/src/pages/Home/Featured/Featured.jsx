import React from 'react';
import SectionTitle from '../../Shared/SectionTitle/SectionTitle';
import featuredImg from '../../../assets/home/featured.jpg'
import './Featured.css'

const Featured = () => {
    return (
        <div className='featured-items bg-fixed pt-2 mt-16 text-white'>
            <SectionTitle
                heading='Featured Item'
                subHeading='Check it Out'
            ></SectionTitle>

            <div className="md:flex bg-slate-500 bg-opacity-60 justify-center items-center pt-6 pb-24 px-36 gap-10 mt-16">
                <div className="">
                    <img src={featuredImg} alt="" />
                </div>
                <div className="">
                    <p className="">Aug 20, 2039</p>
                    <p className="uppercase">Where can i get some?</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, aspernatur hic totam fuga magni debitis dolorum quis fugit, consequuntur illo reiciendis officia? Dolorem quae, consequuntur at aut cumque officiis eligendi adipisci laboriosam quos saepe error sit nesciunt modi sequi id amet voluptatibus deserunt molestias molestiae odio dolore totam! Quis, numquam?</p>
                    <button className="btn btn-outline border-0 border-b-4 mt-3">Order Now</button>
                </div>
            </div>
        </div>
    );
};

export default Featured;