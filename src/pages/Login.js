import React from 'react'
import { useLogin } from '../hooks/useLogin'

const Login = () => {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const {login, error, isLoading} = useLogin()

    const handleSubmit = async (event) => {
        event.preventDefault()

        await login(email, password)
    }


return (
    <form className='login-container' onSubmit={handleSubmit}>
        <h3>Login</h3>

        <label>Email: </label>
        <input 
        type='email'
        onChange={(event) => setEmail(event.target.value)}
        value={email}
        />

        <label>Password: </label>
        <input 
        type='password'
        onChange={(event) => setPassword(event.target.value)}
        value={password}
        />

        <button disabled={isLoading}> Login </button>
        {error && <div className='error'> {error} </div>}
    </form>
    )
}

export default Login