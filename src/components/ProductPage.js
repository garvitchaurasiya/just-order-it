import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Slider from './Slider'

const ProductPage = () => {
    const [state, setState] = useState({})
    const [quantity, setQuantity] = useState(1);

    const navigate = useNavigate();

    const { search } = useLocation();
    const location = useLocation();
    const productId = new URLSearchParams(search).get('id');

    useEffect(() => {
        const getProduct = async () => {
            const response = await fetch(`http://localhost:5000/getProduct/${productId}`);
            const json = await response.json();
            console.log(json);
            setState(json)
        }
        getProduct();

    }, [location])

    const handleAddToCart = async () => {
        if (localStorage.getItem('email')) {
            console.log(localStorage.getItem('email'));
            let response = await fetch(`http://localhost:5000/addtocart`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: localStorage.getItem('email'),
                    productId,
                    quantity
                })
            })
        }
        else {
            navigate('/signin');
        }
    }

    return (
        <div className='flex w-11/12 mx-auto justify-between items-center'>
            <div className='w-2/6 h-2/6'>
                {
                    state.images && <Slider imagesArray={state.images} />
                }
            </div>
            <div className='p-6 w-3/5'>
                <p className='text-2xl'>{state.title}</p>
                <p>
                    <span className='text-gray-600'>Brand: </span>
                    <span className='text-blue-700'>{state.brand}</span>
                    <span className='text-white bg-green-700 rounded-lg p-1.5 mx-10'>
                        Rating {state.rating}
                    </span>
                </p>
                <hr className='my-2 border-1 border-gray' />
                <p className='text-2xl text-red-500 font-bold'>₹ {state.price}</p>
                <p className='italic'>{state.description}</p>
                <hr className='my-2 border-1 border-gray' />

                <div>
                    <p className='text-lg font-bold'>Available offers</p>
                    <p><span className='font-bold'>Special Price</span> Get extra ₹369 off (price inclusive of cashback/coupon) <span className='text-blue-600 font-bold'>T&C</span></p>
                    <p><span className='font-bold'>Bank Offer</span> 5% Cashback on Flipkart Axis Bank Card <span className='text-blue-600 font-bold'>T&C</span></p>
                    <p>Buy this Product and Get Extra ₹500 Off on Two-Wheelers <span className='text-blue-600 font-bold'>T&C</span></p>
                    <p><span className='font-bold'>Partner</span> OfferSign up for Flipkart Pay Later and get Flipkart Gift Card worth up to ₹500 <span className='text-blue-600 font-bold'>Know More</span></p>
                </div>

                <div className='flex justify-around'>

                    <div className='flex justify-around align-center border-2 text-gray-500 border-gray-500 w-2/6'>
                        <div><button onClick={() => { setQuantity(Math.max(0, quantity - 1)) }} className='text-3xl'>-</button></div>
                        <div className='mt-1 text-2xl'>{quantity}</div>
                        <div><button onClick={() => { setQuantity(quantity + 1) }} className='text-3xl'>+</button></div>
                    </div>
                    <div className='w-2/6 mx-2'>
                        <button onClick={handleAddToCart} className='py-2 w-full text-2xl fond-bold text-white bg-black rounded-lg hover:bg-yellow-400 '>Add to cart</button>
                    </div>
                    <div className='w-2/6'>
                        <button className='py-2 w-full text-2xl fond-bold text-black bg-yellow-400 rounded-lg hover:bg-black hover:text-white'>Buy Now</button>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default ProductPage