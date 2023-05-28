import React from 'react';
import MenuItems from '../../Shared/MenuItem/MenuItems';
import Cover from '../../Shared/Cover/Cover';
import { Link } from 'react-router-dom';

const MenuCategory = ({ items, title, img }) => {
    return (
        <div className='py-12'>
            {title && <Cover img={img} title={title}></Cover>}
            <div className="grid md:grid-cols-2 gap-4 md:gap-10 mt-16">
                {
                    items.map(item => <MenuItems key={item._id} item={item}>
                    </MenuItems>)
                }
            </div>
            <div className="text-center"><Link to={`/order/${title}`} className="btn btn-outline border-0 border-b-4 mt-8">View Full Menu</Link></div>
        </div>
    );
};

export default MenuCategory;