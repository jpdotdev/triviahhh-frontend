import { useScoresContext } from '../hooks/useScoresContext'
import { useAuthContext } from '../hooks/useAuthContext'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const ScoreDetails = ({ score }) => {
  const { dispatch } = useScoresContext()
  const { user } = useAuthContext()

  const handleDelete = async () => {

    if (!user) {
      return
    }

    const response = await fetch('/scores/' + score._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_SCORE', payload: json})
    }
  }

  return (
    <div>
      <table className='score-table'>
        <tr>
          <td align='center' className='table-myScore'> {score.score} </td>
          <td align='center' className='table-score-out-of'> {score.total} </td>
          <td align='center' className='table-when'> <p>{formatDistanceToNow(new Date(score.createdAt), { addSuffix: true })}</p> </td>
          <td align='center' className='table-delete'> <button onClick={handleDelete} className='delete-btn'>DELETE</button> </td>
        </tr>
      </table>       
    </div>
  )
}

export default ScoreDetails
