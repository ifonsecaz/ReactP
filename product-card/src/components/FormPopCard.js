import React, { useState } from "react";
import ProductCard from "./ProductCard";

const FormPopCard = (props) => {
    const [product, setProduct] = useState({
        title:"Colmillo",
        description:"Colmillo's plush with vest",
        price:"405",
        image:"https://tienda.itam.mx/cdn/shop/products/Colmillo-Peluche-2022-01.jpg?v=1660233543&width=1445"
    })

    const [formData, setFormData] = useState({ //temp form update
        title: '',
        price: '',
        description: '',
        image: ''
    });

    const handleChange = (e) =>{
        const { name, value } = e.target;
            setFormData(prevState => ({
            ...prevState,  // Spread the previous state
            [name]: value  // Update the specific field
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault() //prevents reloading page on submission
        setProduct(formData);
    };

    return(
    <>
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label className="form-label">Product title</label>
            <input type="text" className="form-control" name="title" value={formData.title} onChange={handleChange}></input>
        </div>
        <div className="mb-3">
            <label className="form-label">Price</label>
            <input type="text" className="form-control" name="price" value={formData.price} onChange={handleChange}></input>
        </div>
        <div className="mb-3">
            <label  className="form-label">Description</label>
            <input type="text" className="form-control" name="description" value={formData.description} onChange={handleChange}></input>
        </div>
        <div className="mb-3">
            <label  className="form-label">Image URL</label>
            <input type="text" className="form-control" name="image" value={formData.image} onChange={handleChange}></input>
        </div>
        <button type="submit" claclassNamess="btn btn-primary" >Submit</button>
        </form>
        <ProductCard 
            product={product}
        />
    </>);
};

export default FormPopCard;