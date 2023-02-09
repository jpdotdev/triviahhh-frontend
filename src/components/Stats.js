import React from 'react'
import "../App.css"
import { useScoresContext } from "../hooks/useScoresContext"
import { useAuthContext } from '../hooks/useAuthContext'

export default function Stats({score, questionNum}) {

const { dispatch } = useScoresContext()
const { user } = useAuthContext()

const [error, setError] = React.useState(null)
let total;

if (questionNum > 1) {
    total = questionNum - 1;
} else {
    total = questionNum
}


const handleSubmit = async () => {
    if (!user) {
        setError('You must be logged in')
        return
    }

    const scores = { score, total }

    const response = await fetch('/scores', {
        method: 'POST',
        body: JSON.stringify(scores),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
        }
    })
    const json = await response.json()

    if(!response.ok) {
        setError(json.error)
    } 
    if(response.ok) {
        setError(null)
        dispatch({type: 'CREATE_SCORE', payload: json})
    }
}

    return (
        <div className='statsContainer'>
            <h1> Quiz Completed! </h1>
            <h3> Your Score: {score} / {total} </h3>
            <form onSubmit={handleSubmit}>
                <button > Save Score! </button>
            </form>
        </div>
    )
}