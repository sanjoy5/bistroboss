import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FaTrashAlt, FaUserShield } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AllUsers = () => {
    const [axiosSecure] = useAxiosSecure()
    const token = localStorage.getItem('access-token')
    const { data: users = [], refetch } = useQuery(['users'], async () => {
        // const res = await fetch('http://127.0.0.1:5000/users', {
        //     headers: {
        //         authorization: `bearer ${token}`
        //     }
        // })
        // return res.json()

        const res = await axiosSecure.get('/users')
        return res.data
    })

    const handleMakeAdmin = (user) => {
        fetch(`http://127.0.0.1:5000/users/admin/${user._id}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    refetch()
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: `${user.name} is an admin now!`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    }
    const handleDelete = (user) => {

    }

    return (
        <div className='w-full p-10'>
            <Helmet>
                <title>Bistro Boss | All Users</title>
            </Helmet>
            <div className="h-16 items-center flex">
                <h3 className="text-3xl font-semibold uppercase">Total Users: {users.length}</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users?.map((user, idx) => (
                                <tr key={user._id}>
                                    <th>{idx + 1}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        {
                                            user.role === 'admin' ? 'admin'
                                                : <button onClick={() => handleMakeAdmin(user)} className="btn btn-ghost bg-red-600 text-white">
                                                    <FaUserShield className='text-2xl' />
                                                </button>
                                        }
                                    </td>
                                    <td>
                                        <button onClick={() => handleDelete(user)} className="btn btn-ghost bg-red-600 text-white">
                                            <FaTrashAlt className='text-xl' />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;