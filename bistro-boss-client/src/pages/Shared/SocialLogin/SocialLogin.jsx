import React from 'react';
import { FaGoogle } from 'react-icons/fa';
import { useAuthContext } from '../../../providers/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';

const SocialLogin = () => {
    const { googleSignIn } = useAuthContext()
    const navigate = useNavigate()
    const location = useLocation()

    const from = location.state?.from?.pathname || "/"

    const handleGoogleSingIn = () => {
        googleSignIn()
            .then(result => {
                const loggedInUser = result.user
                console.log(loggedInUser, '%%%');
                const saveUser = { name: loggedInUser.displayName, email: loggedInUser.email }
                fetch('http://127.0.0.1:5000/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(saveUser)
                })
                    .then(res => res.json())
                    .then(() => {
                        navigate(from, { replace: true })
                    })
            })
    }

    return (
        <div>
            <div className="divider"></div>
            <div className="text-center">
                <button onClick={handleGoogleSingIn} className="btn btn-circle btn-outline">
                    <FaGoogle className='text-2xl' />
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;