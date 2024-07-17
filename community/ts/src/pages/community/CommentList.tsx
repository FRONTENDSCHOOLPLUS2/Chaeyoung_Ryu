import { PostList } from "#types/community";
import useFetch from "@hooks/useFetch";
import CommentItem from "@pages/community/CommentItem";
import CommentNew from "@pages/community/CommentNew";
import { useParams } from "react-router-dom";
type Params = {
  _id: number | undefined;
};

function CommentList() {
  // {{URL}}/posts/1/replies //게시물의 id로 넘김

  const { _id } = useParams() as Params;
  const { data, refetch } = useFetch<PostList>(`/posts/${_id}/replies`);
  console.log("id=>", _id);

  console.log("commentdata=>", data);

  return (
    <>
      {/* 댓글 목록 */}
      <section className="mb-8">
        <h4 className="mt-8 mb-4 ml-2">댓글 {data?.item?.length}개</h4>
      </section>

      {data?.item?.map((listItem) => (
        <CommentItem key={listItem?._id} data={listItem} refetch={refetch} />
      ))}
      {/* <CommentItem data={data} /> */}
      <CommentNew refetch={refetch} />
    </>
  );
}

export default CommentList;
