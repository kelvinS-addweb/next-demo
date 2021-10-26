import { GetServerSidePropsContext } from 'next'
import { InferGetServerSidePropsType } from 'next'
import { Post } from '../../models/Post'

const post = ({
  post,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div>
      <h2>{post.title}</h2>
      <ul>
        <li>id: {post.id}</li>
        <li>userId: {post.userId}</li>
        <h3>
          body: <p>{post.body}</p>
        </h3>
      </ul>
    </div>
  )
}

export const getServerSideProps = async ({
  params,
}: GetServerSidePropsContext) => {
  const post: Post = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params?.id}`
  ).then((response) => response.json())

  if (!post) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      post: post as Post,
    },
  }
}

export default post
