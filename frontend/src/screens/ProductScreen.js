import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailsProduct } from '../actions/productActions';
import ReactGa from 'react-ga';




function ProductScreen (props) {
    
    const [qty, setQty] = useState(1);
    const [color, setColor] = useState("White");
    const productDetails = useSelector(state => state.productDetails);
    const {product,loading,error} = productDetails;
   
    
    const dispatch = useDispatch();

    useEffect(()=>{
        
        ReactGa.pageview(window.location.pathname + window.location.search)
        console.log(ReactGa.ga())
        dispatch(detailsProduct(props.match.params.id));
        return ()=>{
    
        }
        
      },[])
    
    const handleAddToCart = () => {
        ReactGa.event({
            category : 'Garment',
            label : 'Cart',
            action : 'Additing Cart',
            value : qty*product.price
                       
        })
        props.history.push("/cart/"+props.match.params.id+"?qty="+qty+"&color="+color);
          
    }

     
    return <div>
        <div className="back-to-result">
            <Link to="/"> Back to Results</Link>
        </div>
        {loading?<div>...Loading</div>:
        error?<div>{error}</div>:
            (
                <div className="details">
            <div className="details-image">
                <img src={product.image} alt="product"></img>
            </div>
            <div className="details-info">
                <ul>
                    <li>
                        <h4>{product.name}</h4>
                    </li>
                    <li>
                        {product.rating} Stars ({product.numReviews} Reviews)
                    </li>
                    <li>
                        Price:<span className="price">${product.price}</span>
                    </li>
                    <li>
                        Description
                        <div>
                            {product.description}
                        </div>
                    </li>
                    <li>
                        Color
                        <select value={color} onChangeCapture={(e) => {
                             setColor(e.target.value)}} >
                        {
                             (product.colors)?
                             product.colors.map(x=>
                                 <option>{x}</option>)
                             :<option>Not Present</option>
                        }
                        </select>
                    </li>
                   
                </ul>
            </div>
            <div className="details-action">
                <ul>
                    <li>
                        Price: ${product.price}
                    </li>
                    <li>
                        Status: {product.countInStock > 0 ? "In Stock" : "Not Available"} 
                    </li> 
                    <li>
                        Qty: <select value={qty} onChange={(e) => {setQty(e.target.value )}}>
                            {[...Array(product.countInStock).keys()].map(x=>
                                <option key={x+1} value={x+1}>{x+1}</option>
                                )}
                        </select>
                    </li>
                    <li>
                        {product.countInStock > 0 ?
                         <button onClick={handleAddToCart} className="button">Add to Cart</button>:
                         <button disabled className="button">Add to Cart</button>
                        }
                    </li>
                </ul>
            </div>
        </div>
            )
        }
        
       
    </div>
}

export default ProductScreen;