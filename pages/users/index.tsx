import { GetStaticProps } from 'next'
import { InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import { User } from '../../models/User'

const user = ({ users }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <ul>
      {users.map((user: User) => (
        <Link key={user.id} href={`/users/${user.id}`}>
          <a className="hover:underline">
            <li key={user.id}>user: {user.name}</li>
          </a>
        </Link>
      ))}
    </ul>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const res: User[] = await fetch(
    'https://jsonplaceholder.typicode.com/users/'
  ).then((response) => response.json())
  return {
    props: {
      users: res,
    },
  }
}

export default user
