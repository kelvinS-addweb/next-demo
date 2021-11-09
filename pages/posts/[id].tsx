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
        <li>
          <h3>
            body: <p>{post.body}</p>
          </h3>
        </li>
      </ul>
    </div>
  )
}

export const getServerSideProps = async ({
  params,
}: GetServerSidePropsContext) => {
  const post: Post = await fetch(
    `http://localhost:4000/posts/${params?.id}`
  ).then((response) => response.json())

  // if (Object.keys(post).length === 0 && post.constructor === Object) {
  //   return {
  //     notFound: true,
  //   }
  // }

  if (Object.keys(post).length === 0 && post.constructor === Object) {
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
