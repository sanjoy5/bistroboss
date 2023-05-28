import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import slide1 from '../../../assets/home/slide1.jpg'
import slide2 from '../../../assets/home/slide2.jpg'
import slide3 from '../../../assets/home/slide3.jpg'
import slide4 from '../../../assets/home/slide4.jpg'
import slide5 from '../../../assets/home/slide5.jpg'
import SectionTitle from '../../Shared/SectionTitle/SectionTitle';

const Category = () => {
    return (
        <div className='pb-16'>
            <SectionTitle heading='Order Online' subHeading='From 11.00am to 10.00pm' />
            <Swiper
                slidesPerView={4}
                spaceBetween={30}

                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper mt-16"
            >
                <SwiperSlide>
                    <img src={slide1} alt="" />
                    <h2 className="text-4xl uppercase text-center -mt-16 text-white">Salad</h2>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slide2} alt="" />
                    <h2 className="text-4xl uppercase text-center -mt-16 text-white">Pizza</h2>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slide3} alt="" />
                    <h2 className="text-4xl uppercase text-center -mt-16 text-white">Soup</h2>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slide4} alt="" />
                    <h2 className="text-4xl uppercase text-center -mt-16 text-white">Desserts</h2>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slide5} alt="" />
                    <h2 className="text-4xl uppercase text-center -mt-16 text-white">Salad</h2>
                </SwiperSlide>

            </Swiper>
        </div>
    );
};

export default Category;