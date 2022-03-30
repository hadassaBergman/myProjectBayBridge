import React, {useEffect, useReducer, useState} from 'react';
import './App.css';
import data from "./data.json";

const fs = require('fs');

function App() {

    const [products, setProducts] = useState(data);
    console.log("products", products);

    const [sum, setSum] = useState(0);

    useEffect(() => {
        storeData(products, './data.json')
    }, []);

    useEffect(() => {
        let sumOfProducts = 0;
        for (let item of products) {
            sumOfProducts = sumOfProducts + ((item.price) * (item.quantity));
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
            <div className="App">
                <h1 className={"title"}> Projet E-shop Hadassa Bergman</h1>
                <div className={"left"}>
                    <div> <span className={"item_title"}>Prix d'expedition: </span>15 euros</div>
                    <div> <span className={"item_title"}>Prix total sans livraison:</span>{sum} euros</div>
                </div>
                {products.map((item) => (<div className={'row'}>
                    <div className={"item"}><span className={"item_title"}>Produit:</span> {item.product} </div>
                    <div className={"item"}><span className={"item_title"}>Prix:</span>{item.price} euros</div>
                    <div className={"item"}><span className={"item_title"}>Quantite:</span>{item.quantity} </div>
                    <button className={"btn"} onClick={() => {
                        setProducts((ps) => ps.map((item2) => {
                            if (item2.product === item.product) {
                                return {
                                    ...item2,
                                    quantity: item2.quantity + 1,
                                };
                            } else {
                                return item2;
                            }
                        }));
                    }}> +
                    </button>
                    <button className={"btn"} onClick={() => {
                        setProducts((ps) => ps.map((item2) => {
                            if (item2.product === item.product) {
                                return {
                                    ...item2,
                                    quantity: item2.quantity - 1,
                                };
                            } else {
                                return item2;
                            }
                        }));
                    }}>-
                    </button>

                    <button className={"btn"} onClick={()=>{
                        setProducts((ps) => ps.filter((item2) => (item2.product !== item.product)));
                    }}> Supprimer</button>
                </div>))}
            </div>
           <div className={"center"}> <button className={"btn "} onClick={()=>{ storeData(products, './data.json')
           }}> Sauvegarder </button> </div>
        </>
    );
}

export default App;
