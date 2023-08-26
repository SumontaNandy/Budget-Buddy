import React from 'react'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

export const Signup = () => {
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
        height: "770px",
        width: "400px",
        padding: "20px",
        borderRadius: "15px",
        boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
        backgroundColor: "red"
    }

    const history = useHistory();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const handleSignUp = async () => {

        try {
            const res = await fetch("http://127.0.0.1:5000/api/1/user/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({email, password})
            });

            if (res.ok) {
                // const data = await res.json();
                // const { access_token, refresh_token } = data;

                // Cookies.set('access_token', access_token);
                // Cookies.set('refresh_token', refresh_token);

                setErrorMessage("Signup Successful!");
                history.push("/");
            }
            else {
                setErrorMessage("Credentials Already Exist!");
            }
        } catch (error) {
            console.log(error);
        }
    }

    // const handleLogout = () => {
    //     Cookies.remove('access_token');
    //     Cookies.remove('refresh_token');
    //     history.push("/");
    // }

    const checkTokensAndRedirect = () => {
        // const access_token = Cookies.get('access_token');
        // const refresh_token = Cookies.get('refresh_token');

        // if (access_token && refresh_token) {
        //     history.push("/home");
        // }
    }

    const submit = (e) => {
        e.preventDefault();
        if (!email || !password) {
            alert("Credentials cannot be blank!");
        }
        else if (password !== confirmPassword) {
            alert("Passwords do not match!");
        }
        else {
            handleSignUp();
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
                            <h4>Please provide your basic information</h4>
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
                                <div className="form-group mb-3">
                                    <label htmlFor="confirmPassword" className="form-label">Re Enter The Password</label>
                                    <input type="password" value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value) }} className="form-control" id="confirmPassword" aria-describedby="emailHelp" />
                                </div>
                                <button type="submit" className="btn btn-outline-primary">Sign Up!</button>
                            </form>
                            <div class="d-flex justify-content-center links">
                                Have an account?<a href="/">Log In</a>
                            </div>
                        </div>
                        <p className="my-3" style={{ color: 'red' }}>{errorMessage}</p>
                    </div>
                </div>
            </div>
        </>
    )
}
