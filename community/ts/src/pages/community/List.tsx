import Pagination from "@components/Pagination";
import Search from "@components/Search";
import useFetch from "@hooks/useFetch";
import ListItem from "@pages/community/ListItem";
import { memberState, typeState } from "@recoil/user/atoms";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { PostList } from "#types/community";

function List() {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [keyword, setKeyword] = useState<string | null>("");
  const user = useRecoilState(memberState);
  const type = useRecoilValue(typeState);
  const { loading, data, error, refetch } = useFetch<PostList>(
    `/posts?type=${type}&limit=10&page=${page}&keyword=${keyword}`
  );

  useEffect(() => {
    refetch();
  }, [page, type, keyword]);
  // const { loading, data, error, refetch } = useFetch(`/posts`);
  console.log("type => ", type);

  console.log("fetch리턴값=>", data);

  const handleSearch = (keyword: string) => {
    setKeyword(keyword);
    setPage(1);
  };

  return (
    <main className="min-w-80 p-10">
      <div className="text-center py-4">
        <h2 className="pb-4 text-2xl font-bold text-gray-700 dark:text-gray-200">
          정보 공유
        </h2>
      </div>
      <div className="flex justify-end mr-4">
        <Search onClick={handleSearch} />

        <button
          className="bg-orange-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded"
          onClick={() => {
            if (user[0]) {
              navigate(`/${type}/new`);
            } else {
              alert("로그인 후 글 작성이 가능합니다.");
              navigate("/user/login");
            }
          }}
        >
          글작성
        </button>
      </div>
      <section className="pt-10">
        <table className="border-collapse w-full table-fixed">
          <colgroup>
            <col className="w-[10%] sm:w-[10%]" />
            <col className="w-[60%] sm:w-[30%]" />
            <col className="w-[30%] sm:w-[15%]" />
            <col className="w-0 sm:w-[10%]" />
            <col className="w-0 sm:w-[10%]" />
            <col className="w-0 sm:w-[25%]" />
          </colgroup>
          <thead>
            <tr className="border-b border-solid border-gray-600">
              <th className="p-2 whitespace-nowrap font-semibold">번호</th>
              <th className="p-2 whitespace-nowrap font-semibold">제목</th>
              <th className="p-2 whitespace-nowrap font-semibold">글쓴이</th>
              <th className="p-2 whitespace-nowrap font-semibold hidden sm:table-cell">
                조회수
              </th>
              <th className="p-2 whitespace-nowrap font-semibold hidden sm:table-cell">
                댓글수
              </th>
              <th className="p-2 whitespace-nowrap font-semibold hidden sm:table-cell">
                작성일
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.item?.map((item) => (
              <ListItem key={item._id} type={type} data={item} />
            ))}
          </tbody>
        </table>
        <hr />

        <div>
          <Pagination
            totalPage={data?.pagination?.totalPages}
            current={data?.pagination?.page}
            setPage={setPage}
            type={type}
          />
        </div>
      </section>
    </main>
  );
}

export default List;
