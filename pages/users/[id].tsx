import { GetStaticProps } from 'next'
import { InferGetStaticPropsType } from 'next'
import { User } from '../../models/User'

const user = ({ user }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div>
      <h2>{user.name}</h2>
      <ul>
        <li>id: {user.id}</li>
        <li>username: {user.username}</li>
        <li>email: {user.email}</li>
        <li>phone: {user.phone}</li>
      </ul>
    </div>
  )
}

export const getStaticPaths = async () => {
  const users: User[] = await fetch(
    'https://jsonplaceholder.typicode.com/users/'
  ).then((response) => response.json())

  const paths = users.map((user: User) => ({
    params: { id: user.id.toString() },
  }))

  return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  console.log(params)
  const user: User = await fetch(
    `https://jsonplaceholder.typicode.com/users/${params?.id}`
  ).then((response) => response.json())

  return {
    props: {
      user,
    },
  }
}

export default user
