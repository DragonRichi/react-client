import { useGetAllPostQuery } from "../../app/services/postsApi"
import { Card } from "../../components/card"
import { CreatePost } from "../../components/create-post"

export const Posts = () => {
  const { data } = useGetAllPostQuery()

  return (
    <>
      <div className="mb-10 w-full">
        <CreatePost />
      </div>
      {
        data && data.length > 0 ?
          data.map(({ author, authorId, comments, content, createdAt, id, likedByUser, likes, updatedAt }) => (
            <Card
              key={id}
              avatarUrl={author.avatarUrl ?? ""}
              content={content}
              name={author.name ?? ""}
              likesCount={likes.length}
              commentsCount={comments.length}
              authorId={authorId}
              id={id}
              likedByUser={likedByUser}
              createdAt={createdAt}
              cardFor="post"
            />
          )) : null
      }

    </>
  )
}
