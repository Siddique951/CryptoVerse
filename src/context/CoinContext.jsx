import { createContext, useState, useEffect } from "react";

export const CoinContext = createContext();

const CoinContextProvider = (props) => {
    const [allCoin, setAllCoin] = useState([]);
    const [currency, setCurrency] = useState({
        name: "usd",
        symbol: "$"
    });

    // ✅ API call yaha pe
    const fetchAllCoin = async () => {
        const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`;
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'x-cg-demo-api-key': 'CG-99jCVp69GKc35UPK2ofSgZXU' 
            }
        };

        try {
            const response = await fetch(url, options);
            const data = await response.json();
            console.log("Fetched Data:", data);
            setAllCoin(data); // state update
        } catch (error) {
            console.error("Error fetching coins:", error);
        }
    };

    // ✅ useEffect se call jab component load ho
    useEffect(() => {
        fetchAllCoin();
    }, [currency]);

    const contextValue = {
        allCoin,
        currency,
        setCurrency
    };

    return (
        <CoinContext.Provider value={contextValue}>
            {props.children}
        </CoinContext.Provider>
    );
};

export default CoinContextProvider;
