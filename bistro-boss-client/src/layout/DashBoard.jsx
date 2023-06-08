import React from 'react';
import { FaBars, FaBook, FaCalendarAlt, FaHome, FaShoppingCart, FaUsers, FaUtensils, FaWallet } from 'react-icons/fa';
import { NavLink, Outlet } from 'react-router-dom';
import useCart from '../hooks/useCart';
import useAdmin from '../hooks/useAdmin';

const DashBoard = () => {
    const [cart] = useCart()

    // TODO: load data from the server to have dynamic isAdmin based on Data
    // const isAdmin = true
    const [isAdmin] = useAdmin()

    return (
        <div>
            <div className="drawer drawer-mobile ">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* <!-- Page content here --> */}
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
                    <Outlet></Outlet>

                </div>
                <div className="drawer-side bg-[#D1A054]">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80">

                        {
                            isAdmin ? <>
                                <li><NavLink to='/dashboard/adminhome'><FaHome /> Admin Home</NavLink></li>
                                <li><NavLink to='/dashboard/additem'><FaUtensils /> Add an Items</NavLink></li>
                                <li><NavLink to='/dashboard/manageitems'><FaWallet /> Manage Items</NavLink></li>
                                <li><NavLink to='/'><FaBook /> Manage Bookings</NavLink></li>
                                <li><NavLink to='/dashboard/allusers'><FaUsers /> All Users</NavLink></li>

                            </> :
                                <>
                                    <li><NavLink to='/dashboard/userhome'><FaHome /> User Home</NavLink></li>
                                    <li><NavLink to='/'><FaCalendarAlt /> Reservations</NavLink></li>
                                    <li><NavLink to='/'><FaWallet /> Payment History</NavLink></li>
                                    <li>
                                        <NavLink to='/dashboard/mycart'><FaShoppingCart /> My Cart <span className="badge badge-secondary">{cart && cart?.length || 0}</span>
                                        </NavLink>

                                    </li>
                                </>
                        }


                        <div className="divider"></div>
                        <li><NavLink to='/'><FaHome /> Home</NavLink></li>
                        <li><NavLink to='/menu'><FaBars /> Menu</NavLink></li>
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default DashBoard;