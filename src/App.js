import React, {useEffect, useState} from 'react';
import './App.css';
import data from "./data.json";
const fs = require('fs');

function App() {


    const [products, setProducts] = useState(data);
    console.log("products", products);

    const [sum, setSum] = useState(0);

    useEffect(() => {
        let sumOfProducts = 0;
        for (let item of products) {
            sumOfProducts = sumOfProducts + ((item.price) * (item.quantity));
        }
        if(products.length<4){
            setSum(sumOfProducts+15);
        }
        if(products.length>=4){
            setSum(sumOfProducts+30);
        }

    }, [products]);

    useEffect((item) => {
        setProducts((ps) => ps.map((item2) => {
                return {
                    ...item2,
                    priceForAll: item2.quantity * item2.price,
                };
        }));
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
                    {products.length<4 && <div> <span className={"item_title"}>Prix d'expedition: </span>15 euros</div>}
                    {products.length>=4 && <div> <span className={"item_title"}>Prix d'expedition: </span>30 euros</div>}
                    {products.map((item) => (<div className={""}> <span className={"item_title"}>Prix des {item.product}s:</span>{item.priceForAll} euros </div>))}
                    <div> <span className={"item_title"}>Prix total:</span>{sum} euros</div>
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
           <div className={"center"}> <button className={"btn "} onClick={()=>{
               storeData(JSON.stringify(products), './data.json')
           }}> Sauvegarder </button> </div>
        </>
    );
}

export default App;
