import React from 'react';
import SectionTitle from '../../../pages/Shared/SectionTitle/SectionTitle'
import { useForm } from "react-hook-form";
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import Swal from 'sweetalert2'


const img_hosting_token = import.meta.env.VITE_IMAGE_UPLOAD_TOKEN
const AddItem = () => {
    const [axiosSecure] = useAxiosSecure()
    const { register, handleSubmit, reset } = useForm();
    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`
    const onSubmit = data => {
        const formData = new FormData()
        formData.append('image', data.image[0])

        fetch(img_hosting_url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgResponse => {
                if (imgResponse.success) {
                    const imgURL = imgResponse.data.display_url
                    const { name, price, category, recipe } = data
                    const newItem = { name, price: parseFloat(price), category, recipe, image: imgURL }
                    console.log(newItem);
                    axiosSecure.post('/menu', newItem)
                        .then(data => {
                            console.log('After posting new menu : ', data.data);
                            if (data.data.insertedId) {
                                reset()
                                Swal.fire({
                                    position: 'center',
                                    icon: 'success',
                                    title: 'Item Added Successfully',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                            }
                        })
                }
            })
    };

    return (
        <div className='w-full px-4 md:px-10'>
            <SectionTitle subHeading="What's new" heading='Add an Item' ></SectionTitle>

            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text font-semibold">Recipe name*</span>
                    </label>
                    <input type="text" placeholder="Recipe name" {...register("name", { required: true, maxLength: 120 })} className="input input-bordered w-full " />
                </div>

                <div className="flex gap-6 my-5">
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text font-semibold">Category</span>
                        </label>
                        <select defaultValue="Pick one" {...register("category", { required: true })} className="select select-bordered">
                            <option disabled>Pick one</option>
                            <option>Pizza</option>
                            <option>Soup</option>
                            <option>Salad</option>
                            <option>Dessert</option>
                            <option>Drinks</option>
                            <option>Desi</option>
                        </select>
                    </div>

                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-semibold">Price*</span>
                        </label>
                        <input {...register("price", { required: true })} type="number" placeholder="Price" className="input input-bordered w-full" />
                    </div>
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-semibold">Recipe Details</span>
                    </label>
                    <textarea {...register("recipe", { required: true })} className="textarea textarea-bordered h-24" placeholder="Recipe Details"></textarea>
                </div>

                <div className="form-control w-full my-5">
                    <label className="label">
                        <span className="label-text font-semibold">Item Image</span>
                    </label>
                    <input type="file" {...register("image", { required: true })} className="file-input file-input-bordered w-full" />
                </div>

                <input type="submit" value="Add an Item" className='btn' />

            </form>
        </div>
    );
};

export default AddItem;