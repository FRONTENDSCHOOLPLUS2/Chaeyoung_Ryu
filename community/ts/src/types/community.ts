interface IResponse {
  ok: number;
}

interface Post {
  _id: number;
  name: string;
  user: User;
  title: string;
  content: string;
  createdAt: string;
  // updatedAt: string;
  // seller_id?: number;
  views: number;
}

export interface DetailList extends Omit<PostList, "item"> {
  item: Post;
}

interface User {
  _id: number;
  name: string;
  profile?: File[];
}

export interface PostList extends IResponse {
  item: Post[];
  pagination: {
    page: number;
    totalPages: number;
    total: number;
    limit: number;
  };
}
// totalPage={data?.pagination?.totalPages}
//             current={data?.pagination?.page}
//             setPage={setPage}
//             refetch={refetch}
//             type={type}
