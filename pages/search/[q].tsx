import { useState, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import InfiniteScroll from "react-infinite-scroll-component";
import Masonry from "react-masonry-css";
import { BiLoaderAlt } from "react-icons/bi";
import Head from "next/head";
import ImagePreview from "../../components/image/ImagePreview";
import { SearchItem } from "../../api/image";
import Header from "../../components/header/Header";
import NavBrand from "../../components/header/NavBrand";
import HeaderSearchInput from '../../components/input/HeaderSearchInput';

const Search = () => {
  const imageUrl = process.env.NEXT_PUBLIC_BASEIMG;
  const router = useRouter();
  const [keyword, setKeyword] = useState<string>("")
  const q  = router.query?.q as string 
  useEffect(()=> {
    if(keyword){
      setKeyword(q)
    }
  },[keyword])
  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery(
    ["Search", q],
    ({ pageParam = 1 }) => SearchItem(q, pageParam),
    {
      getNextPageParam: (lastPage, allPages) =>
        allPages.length < Math.ceil(lastPage.total_pages / 20)
          ? allPages.length + 1
          : undefined,
    }
  );
  console.log(data?.pages);

  return (
    <>
      <Head>
        <title>Search - {q}</title>
      </Head>
      <Header>
        <NavBrand/>
        <HeaderSearchInput
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              router.replace(`/search/${keyword.trim()}`)
            }
          }}
        />
      </Header>
      <h1 className="bg-[#0f172a] w-full p-3 text-white">The results for {q}</h1>
      {data && (
        <InfiniteScroll
          style={{ overflow: "hidden" }}
          className="p-4  bg-[#0F172A]"
          dataLength={data.pages.length * 20}
          next={fetchNextPage}
          hasMore={Boolean(hasNextPage)}
          loader={
            <div className="w-full p-7 flex justify-center animate-spin">
              <BiLoaderAlt className="text-5xl text-gray-700" />
            </div>
          }
        >
          <Masonry
            breakpointCols={{ default: 4, 1440: 4, 1024: 3, 768: 2 }}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {data?.pages
              .map((group) => group.results)
              .reduce((pre, curr) => [...pre, ...curr])
              .map((poster, index) => (
                <ImagePreview
                  key={index}
                  src={`${imageUrl}${poster.poster_path}`}
                  alt={poster.title}
                  title={poster.title}
                  id={poster.id}
                  rate={poster.vote_average}
                />
              ))}
          </Masonry>
        </InfiniteScroll>
      )}
    </>
  );
};

export default Search;
