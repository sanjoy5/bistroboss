import React, { useEffect, useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useAuthContext } from '../../../providers/AuthProvider';
import './CheckoutForm.css'
import Swal from 'sweetalert2';

const CheckoutForm = ({ cart, price }) => {
    const stripe = useStripe()
    const elements = useElements()
    const { user } = useAuthContext()
    const [cardError, setCardError] = useState('')
    const [axiosSecure] = useAxiosSecure()
    const [clientSecret, setClientSecret] = useState('')
    const [processing, setProcessing] = useState(false)
    const [transactionId, setTransactionId] = useState('')


    useEffect(() => {

        if (price > 0) {
            axiosSecure.post('/create-payment-intent', { price })
                .then(res => {
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret)
                })
        }
    }, [price, axiosSecure])

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement);

        if (card === null) {
            return;
        }
        const { error } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        })

        if (error) {
            console.log('[error]', error);
            setCardError(error.message)
        } else {
            setCardError('')
            // console.log('[PaymentMethod]', paymentMethod);
        }

        setProcessing(true)

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || 'unknown',
                        name: user?.displayName || 'anonymous',
                    },
                },
            },
        );

        if (confirmError) {
            console.log(confirmError)
        }
        console.log('paymentIntent : ', paymentIntent);
        setProcessing(false)

        if (paymentIntent.status === "succeeded") {
            setTransactionId(paymentIntent.id)
            // save payment info to the server 
            const payment = {
                email: user?.email,
                transactionId: paymentIntent.id,
                price,
                date: new Date(),
                quantity: cart?.length,
                status: 'Service Pending',
                cartItems: cart.map(item => item._id),
                menuItems: cart.map(item => item.menuItemId),
                itemName: cart.map(item => item.name)
            }
            axiosSecure.post('/payments', payment)
                .then(res => {
                    console.log(res.data);
                    if (res.data.result.insertedId) {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Your payment is completed',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                })
        }
    }

    return (
        <div className='w-2/3 m-8'>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className='btn btn-primary btn-sm btn-outline mt-4' type="submit" disabled={!stripe || !clientSecret || processing}>
                    Pay
                </button>
            </form>

            {cardError && <p className='text-red-500 mt-3'>{cardError}</p>}
            {transactionId && <p className='text-green-500 mt-4'>Transaction complete with transactionId : {transactionId}</p>}
        </div>
    );
};

export default CheckoutForm;