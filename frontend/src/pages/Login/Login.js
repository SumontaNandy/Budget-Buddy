import React from 'react'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Cookies from 'js-cookie';
import axios from 'axios';

export const Login = () => {

    let myStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
        margin: "40px auto",
        backgroundImage: 'url("https://www.moneysavingexpert.com/content/dam/mse/images/hero/hero-BankingSaving-BudgetPlanner.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat"
    }

    let cardStyle = {
        height: "370px",
        width: "400px",
        padding: "20px",
        borderRadius: "15px",
        boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
        backgroundColor: "red"
    }

    const history = useHistory();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const handleLogin = async () => {

        try {
            const res = await fetch("http://127.0.0.1:5000/api/1/user/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({email, password})
            });

            if (res.ok) {
                const data = await res.json();
				console.log(data);
                const { access_token, refresh_token } = data;

                Cookies.set('access_token', access_token);
                Cookies.set('refresh_token', refresh_token);

                localStorage.setItem('access_token', access_token);

                setErrorMessage("Login Successful!");
                history.push("/home");
            }
            else {
                setErrorMessage("Invalid Credentials!");
            }
        } catch (error) {
            console.log(error);
        }
    
    }

    const handleLogout = () => {
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');
        history.push("/");
    }

    const checkTokensAndRedirect = () => {
        const access_token = Cookies.get('access_token');
        const refresh_token = Cookies.get('refresh_token');

        if (access_token && refresh_token) {
            history.push("/home");
        }
    }

    const submit = (e) => {
        e.preventDefault();
        if (!email || !password) {
            alert("Email or Password cannot be blank!");
        }
        else {
            handleLogin();
        }
    }

    useEffect(() => {
        checkTokensAndRedirect();
    }, [])

    return (
        <>
            <div className='container my-3' style={myStyle}>
                <div className='d-flex justifiy-content-center h-100'>
                    <div className='card shadow p-3 mb-5 bg-white rounded' style={cardStyle}>
                        <div className='card-header'>
                            <h3>Welcome to Budget-Buddy!</h3>
                        </div>
                        <div className='card-body'>
                            <form className='form-inline' onSubmit={submit}>
                                <div className="form-group mb-3">
                                    <label htmlFor="email" className="form-label">Enter Your Email</label>
                                    <input type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} className="form-control" id="email" aria-describedby="emailHelp" />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="password" className="form-label">Enter The Password</label>
                                    <input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} className="form-control" id="password" aria-describedby="emailHelp" />
                                </div>
                                <button onClick={handleLogin} type="submit" className="btn btn-outline-primary">Log In</button>
                            </form>
                            <div class="d-flex justify-content-center links">
                                Don't have an account?<a href="/signup">Sign Up</a>
                            </div>
                        </div>
                        <p className="my-3" style={{ color: 'white' }}>{errorMessage}</p>
                    </div>
                </div>
            </div>
        </>
    )
}
