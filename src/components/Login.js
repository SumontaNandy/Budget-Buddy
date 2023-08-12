import React from 'react'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Cookies from 'js-cookie';

export const Login = () => {

    let myStyle = {
        minHeight: "80vh",
        margin: "40px auto"
    }

    const history = useHistory();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const checkLogin = async (email, password) => {
        let url = "http://localhost:5000/api/1/user/auth/login"
        let state = {
            email: email,
            password: password
        }
        fetch(url,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', },
                body: JSON.stringify(state),
            })
            .then(response => response.json())
            .then(data => {
                setEmail(data.email)
                setPassword(data.password)
                setLogin(true)
            })
            .catch((error) => {
                setEmail("")
                setPassword("")
                setLogin(false)
            });
    }

    const submit = (e) => {
        e.preventDefault();
        if (!email || !password) {
            alert("Email or Password cannot be blank!");
        }
        else {
            checkLogin(email, password);
        }
    }

    return (
        <>
            <h1>Welcome to Budget-Buddy!</h1>
            <div className='container my-3' style={myStyle}>
                <h3>Please Log In to continue!</h3>
                <form onSubmit={submit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Enter Your Email</label>
                        <input type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} className="form-control" id="email" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Enter The Password</label>
                        <input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} className="form-control" id="password" aria-describedby="emailHelp" />
                    </div>
                    <button type="submit" className="btn btn-outline-primary">Log In</button>
                </form>
            </div>
        </>
    )
}
