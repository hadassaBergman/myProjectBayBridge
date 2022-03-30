import React, {useEffect, useReducer, useState} from 'react';
import './App.css';
import data from "./data.json";
const fs = require('fs');

function App() {

    const [products, setProducts] = useState(data);
    console.log("products",products);

    const [sum, setSum] = useState(0);

    useEffect(() => {
        storeData(products, './data.json')
    }, []);

    useEffect(() => {
        let sumOfProducts=0;
        for(let item of products){
            sumOfProducts = sumOfProducts+((item.price)*(item.quantity));
        }
        setSum(sumOfProducts);
    }, [products]);

    const storeData = (data, path) => {
        try {
            fs.writeFileSync(path, JSON.stringify(data))
        } catch (err) {
            console.error(err)
        }
    }

    return (<>
            <div>Prix d'expedition:15 euros</div>
            <div>Prix total:{sum} euros</div>
        <div className="App">
            {products.map((item) => (<div className={'row'}>
                <div className={"item"}> <span className={"item_title"}>Produit:</span> {item.product} </div>
                <div className={"item"}> <span className={"item_title"}>Prix:</span>{item.price} euros </div>
                <div className={"item"}> <span className={"item_title"}>Quantite:</span>{item.quantity} </div>
                <button onClick={()=>{
                    setProducts((ps) => ps.map((product) => (
                        {
                        ...product,
                        quantity: product.quantity+1,
                    })));
                    storeData(products, './data.json')
                }}> + </button>
                <button onClick={()=>{
                    setProducts((ps) => ps.map((product) => (
                        {
                        ...product,
                        quantity: product.quantity-1,
                    })));
                    storeData(products, './data.json')
                }}>-</button>
            </div>))}
        </div></>
    );
}

export default App;
