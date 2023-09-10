import * as React from 'react';
import { useState, useEffect } from 'react'

export default function TransactionSummaryContent() {

    const [trxSummary, setTrxSummary] = useState([])

    useEffect(() => {
        const cookies = document.cookie;
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Cookie': cookies
        });
        // Fetch saving goals data from the Flask backend API
        fetch('http://127.0.0.1:5000/api/1/user/transaction/transaction_by_month', { headers })
            .then(response => response.json())
            .then(data => setTrxSummary(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    console.log(trxSummary)

    return (
        <>
        <h1>The Transaction Summary is:</h1>
            {trxSummary}
        </>
    )
}



//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6dHJ1ZSwiaWF0IjoxNjkzNzM4OTY1LCJqdGkiOiJiNGM3ZGVlMC1lMjk4LTQ3OTMtOGU4Zi1mNzgyZDRlNDVlOWUiLCJ0eXBlIjoiYWNjZXNzIiwic3ViIjoiZWZiNmIxYmUtYjMwYS00NjVkLWJlODUtYmIxNDI2OWU5NDVkIiwibmJmIjoxNjkzNzM4OTY1LCJleHAiOjE2OTM3NDI1NjV9.ifhkWVKRu2hVTYiP4lw0lOP23dEunlj65QMt-o27efg