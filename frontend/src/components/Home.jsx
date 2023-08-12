import React from "react";
import { Link } from "react-router-dom";

export default function Home()
{
    return (
        <ul>
            <li>
                <Link to="/account-types">Accounts</Link>
            </li>
            <li>
                <Link to="/contact">Contact</Link>
            </li>
        </ul>
    );
}