import React from 'react';
import { useAuthContext } from '../../../providers/AuthProvider';
import Swal from 'sweetalert2'
import { useLocation, useNavigate } from 'react-router-dom';
import useCart from '../../../hooks/useCart';

const FoodCard = ({ item }) => {
    const { name, image, price, recipe, _id } = item;
    const { user } = useAuthContext()
    const [, refetch] = useCart()
    const navigate = useNavigate()
    const location = useLocation()

    const handleAddToCart = item => {
        console.log(item, user);
        if (user && user.email) {
            const cartitem = { menuItemId: _id, name, image, price, recipe, email: user.email }
            fetch('http://127.0.0.1:5000/carts', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(cartitem)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        refetch()   // refetch cart to update the number of items in the cart  
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Food added on the cart',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                })
        } else {
            Swal.fire({
                title: 'Please login to order the food',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Login Now'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } })
                }
            })
        }
    }

    return (
        <div>
            <div className="card  bg-base-100 shadow-xl">
                <figure><img src={image} alt="Items" /></figure>
                <p className="bg-slate-900 text-white absolute right-0 mt-5 mr-7 py-1 px-2">${price}</p>
                <div className="card-body">
                    <p>song</p>
                    <h2 className="card-title mx-auto">{name}</h2>
                    <p className='pt-2 pb-4'>{recipe.slice(0, 70)}...</p>
                    <div className="card-actions justify-center">
                        <button onClick={() => handleAddToCart(item)} className="btn btn-outline btn-warning border-0 border-b-4">Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;