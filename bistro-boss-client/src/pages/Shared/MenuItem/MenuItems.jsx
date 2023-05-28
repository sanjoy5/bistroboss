import React from 'react';
import pizza from '../../../assets/home/pizza.jpg'

const MenuItems = ({ item }) => {
    const { name, image, price, recipe } = item;
    return (
        <div className='flex space-x-2'>
            <img style={{ borderRadius: '0 200px 200px' }} className='w-[100px]' src={image} alt="" />
            <div className="">
                <h3 className="uppercase">{name} ---------</h3>
                <p className="">{recipe}</p>
            </div>
            <p className="text-yellow-500">${price}</p>
        </div>
    );
};

export default MenuItems;