import useSWR from 'swr'
import { Todo } from '../models/Todo'
const fetcher = async () => {
  const response = await fetch('http://localhost:4000/todos')
  const data = await response.json()
  return data
}

function ClientSide() {
  const { data, error } = useSWR('dashboard', fetcher)

  if (error) return 'An error has occurred.'
  if (!data) return 'Loading...'

  return (
    <div>
      <h2>Client-Side Rendering using SWR:</h2>
      {data.map((item: Todo) => {
        return (
          <div key={item.id}>
            <h2>{item.title}</h2>
            <h3>{item.completed}</h3>
          </div>
        )
      })}
    </div>
  )
}

export default ClientSide
