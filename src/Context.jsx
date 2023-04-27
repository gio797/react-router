import React, { useEffect, useState } from "react";

const Context = React.createContext()

function ContextProvider({children}) {
    const [allPhotos, setAllPhotos] = useState([])
    const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem('cart-Items')) || [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("all-Photos"));
        
        if (data) {
            setAllPhotos(data)
        }else {
            fetch("https://raw.githubusercontent.com/bobziroll/scrimba-react-bootcamp-images/master/images.json")
            .then(Response => Response.json())
            .then(data => setAllPhotos(data))
        }
        
    },[])

    useEffect(() => {
        localStorage.setItem('all-Photos', JSON.stringify(allPhotos));
      }, [allPhotos]);
    
    useEffect(() => {
        localStorage.setItem('cart-Items', JSON.stringify(cartItems));
      }, [cartItems]);
    


    function toggleFavorite(id) {
        const updatedArr = allPhotos.map(photo => {
            if(photo.id === id) {
                return {...photo, isFavorite: !photo.isFavorite}
            } return photo
        })
        setAllPhotos(updatedArr)
    }

    // function addItems(id) {
    //     const updatedArr = allPhotos.filter(photo => {
    //         return photo.id===id
    //     })
    //     setCartItems(prevItems => {
    //         return [...prevItems, updatedArr]
    //     })
    // }

    function addToCart(newItem){
        setCartItems(prevItems => {
            return [...prevItems, newItem]
        })
    }

    function removeFromCart(id){
        setCartItems(prevItems => {
            return prevItems.filter(item => item.id !== id)
        })
    }

    function emptyCart(){
        setCartItems([])
    }


    return (
        <Context.Provider value={{allPhotos, 
            cartItems, 
            toggleFavorite, 
            addToCart, 
            removeFromCart, 
            emptyCart}}>
            {children}
        </Context.Provider>
    )
}

export {ContextProvider, Context}