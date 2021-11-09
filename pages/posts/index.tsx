import { GetStaticProps } from 'next'
import { InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import { Post } from '../../models/Post'

const post = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <ul>
        {posts.map((post: Post) => (
          <li key={post.id}>
            <Link href={`/posts/${post.id}`}>
              <a className="hover:underline">
                post {post.id}: {post.title}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const res: Post[] = await fetch('http://localhost:4000/posts/').then(
    (response) => response.json()
  )
  return {
    props: {
      posts: res,
    },
  }
}

export default post
