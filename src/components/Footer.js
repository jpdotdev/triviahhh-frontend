import React from 'react'
import { Link } from 'react-router-dom'
import "../App.css"
import logo from '../images/logo.PNG'

export default function Footer() {
    return (
        <div>
            <footer> 
            <Link to="/" style={{ textDecoration: 'none' }}> 
                   <img src={logo} alt='TRIVIAHHH! logo'></img>
            </Link>
                <h3>Created by John Pezza</h3>
                <span>2023</span>
            </footer>
        </div>
    )
}