import React, { useState, useContext, useRef } from "react"
import { Context } from "../Context"
import PropTypes from 'prop-types'
import useHover from "../hooks/useHover"

function Image({className, img}) {
    // const [hovered, setHovered] = useState(false)
    const [hovered, ref] = useHover()
    const {toggleFavorite, cartItems, addToCart, removeFromCart} = useContext(Context)
    
    // const heartIcon = hovered && 
    // <i 
    //     className={img.isFavorite ?"ri-heart-fill favorite" : "ri-heart-line favorite"} onClick={() => toggleFavorite(img.id)}>
    // </i>

    function heartIcon() {
        if(img.isFavorite) {
            return <i className="ri-heart-fill favorite" onClick={() => toggleFavorite(img.id)}></i>
        } else if(hovered) {
            return <i className="ri-heart-line favorite" onClick={() => toggleFavorite(img.id)}></i>
        }
    }

    function cartIcon() {
        const alreadyInTheCart = cartItems.some(item => item.id === img.id)
        
        if(alreadyInTheCart) {
            return <i className="ri-shopping-cart-fill cart" onClick={() => removeFromCart(img.id)}></i>
        }else if(hovered) {
            return <i className="ri-add-circle-line cart" onClick={() => addToCart(img)}></i>
        }
    }
    // const cartIcon = hovered && <i className="ri-add-circle-line cart" onClick={() => addItems(img)}></i>

    return (
        <div className={`${className} image-container`} 
            ref={ref}
        >
            <img src={img.url} className="image-grid"/>
            {heartIcon()}
            {cartIcon()}
        </div>
    )
}

Image.propTypes = {
    className: PropTypes.string,
    img: PropTypes.shape({
        id: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        isFavorite: PropTypes.bool
    })
}

export default Image