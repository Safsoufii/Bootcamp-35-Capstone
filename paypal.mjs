const getPaypalInfo = async (paypal) => {
    const paypalURL = "https://paypaldimasv1.p.rapidapi.com/authorizeOrder";

    try {
        const paypalRes = await fetch(paypalURL. {
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'X-RapidAPI-Key': 'c29a54c56fmsh397b2cae1ef347dp16e1bajsn0710d7b0f79f',
                'X-RapidAPI-Host': 'PayPaldimasV1.p.rapidapi.com'
            },
        });

        if (!paypalRes.ok) {
            throw new Error("City API request failed");
        }

        const order = await paypalRes.json();

        if (!order.orderId || order.orderId.length === 0)
        throw new Error ('OrderID "${orderId}" not found');
    }
}