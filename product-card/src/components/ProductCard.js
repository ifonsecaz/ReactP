import React, {useState } from 'react'

const ProductCard = (props) => {
    const [prodPrice,setProdPrice] = useState(props.product.price);
    const [discount,setDiscount] = useState(true);

    const toggleDisc = () =>{
        if(discount){
            setProdPrice(prodPrice*0.7);
            setDiscount(false);
        }
        else{
            setProdPrice(prodPrice/0.7);
            setDiscount(true);
        }

    }


    return (
        <>
        <br></br>
        <div className="row g-4">
            <div className="col-md-4"></div>
            <div className="col-md-4">
                <div className ="card h-100" style={{width: "11rem;"}}>
                    <img src={props.product.image} className ="card-img-top" alt={`${props.product.title} + image`} ></img>
                <div className ="card-body text-center">
                    <h5 className ="card-title">{props.product.title}</h5>
                    <p className ="card-text">{props.product.description}</p>
                    <div className ="lead" id="options">
                        <p>Price: ${prodPrice}</p>
                    </div>
                    <p style={{visibility: discount ? "hidden ":"visible"}}>"30% discount"</p>
                </div>
                </div>
                <br></br>
                 <button type="button" className="btn btn-secondary" onClick={toggleDisc}>Click me</button> 
            </div>
        </div>
        </>);
};

export default ProductCard;