
import SectionTitle from '../../Shared/SectionTitle/SectionTitle';
import MenuItems from '../../Shared/MenuItem/MenuItems';
import useMenu from '../../../hooks/useMenu';

const PopularMenu = () => {

    const [menu] = useMenu()
    const popular = menu.filter(item => item.category === 'popular')

    return (
        <section className='pb-16'>
            <SectionTitle
                heading='From Our Menu'
                subHeading='Popular Items'
            ></SectionTitle>
            <div className="grid md:grid-cols-2 gap-4 md:gap-10 mt-16">
                {
                    popular.map(item => <MenuItems key={item._id} item={item}>
                    </MenuItems>)
                }
            </div>
            <div className="text-center"><button className="btn btn-outline border-0 border-b-4 mt-8">View Full Menu</button></div>
        </section>
    );
};

export default PopularMenu;