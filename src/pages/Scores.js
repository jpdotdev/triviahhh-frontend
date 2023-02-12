import React from 'react'
import { useScoresContext } from '../hooks/useScoresContext'
import { useAuthContext } from '../hooks/useAuthContext'
import ScoreDetails from '../components/ScoreDetails'

const Scores = () => {

    const { scores, dispatch } = useScoresContext()
    const { user } = useAuthContext()

    React.useEffect(() => {
     const fetchScores = async () => {
        const response = await fetch('https://triviahhh-backend.onrender.com/scores/', {
          headers: {'Authorization': `Bearer ${user.token}`},
        })
        const json = await response.json()

        if(response.ok) {
           dispatch({type: 'SET_SCORES', payload: json})
        }
    }

    if(user) {
      fetchScores()
    }
    }, [dispatch, user])

    return (
        <div>
        <table className='score-table-header'>
         <tr>
            <th className='table-myScore'> My Score </th>
            <th className='table-score-out-of'> Out of </th>
            <th className='table-when'> When? </th>
            <th className='table-delete'> Remove? </th>
          </tr>
        </table>
          <div>
            {scores && scores.map(score => (
              <ScoreDetails score={score} key={score._id} />
            ))}
          </div>
        </div>
      )
    }

export default Scores