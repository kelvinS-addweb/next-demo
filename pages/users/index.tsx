import { GetStaticProps } from 'next'
import { InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import { User } from '../../models/User'
const seconds = 30
const user = ({ users }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <h1>ISR Demo: {seconds} seconds</h1>
      <ul>
        {users.map((user: User) => (
          <li key={user.id}>
            <Link href={`/users/${user.id}`}>
              <a className="hover:underline">user: {user.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const res: User[] = await fetch('http://localhost:4000/users/').then(
    (response) => response.json()
  )
  return {
    props: {
      users: res,
    },
    revalidate: seconds,
  }
}

export default user
