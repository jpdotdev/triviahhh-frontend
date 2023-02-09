import React from 'react'
import "../App.css"
import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import logo from '../images/logo.PNG'

export default function Navbar() {
    const { logout } = useLogout()
    const { user } = useAuthContext()

    const handleClick = () => {
        logout()
    }

    const createUsername = (email) => {
        let atSymbol = email.indexOf('@')
        console.log(atSymbol)
        let final = email.slice(0, atSymbol)
        return final
    }

    return (
        <header>
            <div className='navigation'>
                <Link to="/" style={{ textDecoration: 'none' }}> 
                   <img src={logo} alt='TRIVIAHHH! logo'></img>
                </Link>
            <nav>
                {!user && (
                    <div className='navigation'>
                        <li className="links"> <Link to='/login'> Login </Link> </li>
                        <li className="links"> <Link to='/signup'> Signup </Link> </li>
                    </div>
                )}
                {user && (
                    <div className='navigation-logged-in'>
                        <span>{createUsername(user.email)}</span>
                        <li className="links"> <Link to="/quizzes"> Take Quiz! </Link> </li>
                        <li className="links"> <Link to="/scores"> My Scores </Link> </li>
                        <button onClick={handleClick} className="links"> Log Out </button>
                    </div>
                )}
                </nav>
            </div>
        </header>
    )
}

