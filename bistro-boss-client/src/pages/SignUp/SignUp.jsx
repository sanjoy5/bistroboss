
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { Helmet } from 'react-helmet-async';
import { useAuthContext } from '../../providers/AuthProvider';
import Swal from 'sweetalert2'
import SocialLogin from '../Shared/SocialLogin/SocialLogin';
import { useState } from 'react';

const SignUp = () => {
    const { createUser, updateUserProfile } = useAuthContext()
    const [error, setError] = useState('')
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const navigate = useNavigate()


    const onSubmit = data => {
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user
                console.log(loggedUser);
                updateUserProfile(loggedUser, data.name, data.photoURL)
                    .then(() => {
                        const saveUser = { name: data.name, email: data.email }
                        fetch('http://127.0.0.1:5000/users', {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify(saveUser)
                        })
                            .then(res => res.json())
                            .then(data => {
                                if (data.insertedId) {
                                    setError('')
                                    reset()
                                    Swal.fire({
                                        position: 'center',
                                        icon: 'success',
                                        title: 'User was created successfully',
                                        showConfirmButton: false,
                                        timer: 1500
                                    })
                                    navigate('/')
                                }
                            })
                    })
                    .catch(error => setError(error.message))

            })
            .catch(error => setError(error.message))

    };


    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Sign Up</title>
            </Helmet>

            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Sign Up now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card card-body flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form className="" onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" {...register("name", { required: true })} placeholder="name" className="input input-bordered" />
                                {errors.name && <span className='text-red-500 mt-1'>Name field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input type="text" {...register("photoURL", { required: true })} placeholder="photo url" className="input input-bordered" />
                                {errors.photoURL && <span className='text-red-500 mt-1'>Photo URL field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" {...register("email", { required: true })} placeholder="email" className="input input-bordered" />
                                {errors.email && <span className='text-red-500 mt-1'>Email field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" {...register("password", {
                                    required: true,
                                    minLength: 6,
                                    maxLength: 20,
                                    pattern: /(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])/
                                })}
                                    placeholder="password" className="input input-bordered" />

                                {errors.password?.type === 'required' && <p className='text-red-500 mt-1'>Password is required</p>}
                                {errors.password?.type === 'minLength' && <p className='text-red-500 mt-1'>Password must be 6 character</p>}
                                {errors.password?.type === 'maxLength' && <p className='text-red-500 mt-1'>Password must be less than 20 character</p>}
                                {errors.password?.type === 'pattern' && <p className='text-red-500 mt-1'>Password must be at least a symbol, upper and lower case letters and a number

                                </p>}

                            </div>
                            <div className="form-control mt-6">
                                <input type='submit' className="btn btn-primary" value='Sign Up' />
                            </div>
                        </form>
                        {
                            error && <label className="label">
                                <p className="text-sm text-red-500">{error}</p>
                            </label>
                        }

                        <label className="label">
                            <p className="text-sm">Already have an account? <Link to="/login" className='link link-hover'>Login</Link></p>
                        </label>
                        <SocialLogin></SocialLogin>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;