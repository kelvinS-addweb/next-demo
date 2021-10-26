import { GetStaticProps } from 'next'
import { InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import { Post } from '../../models/Post'

const post = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <ul>
      {posts.map((post: Post) => (
        <Link key={post.id} href={`/posts/${post.id}`}>
          <a className="hover:underline">
            <li key={post.id}>post: {post.title}</li>
          </a>
        </Link>
      ))}
    </ul>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const res: Post[] = await fetch(
    'https://jsonplaceholder.typicode.com/posts/'
  ).then((response) => response.json())
  return {
    props: {
      posts: res,
    },
  }
}

export default post
