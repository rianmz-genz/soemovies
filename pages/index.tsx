import { GetHomeImage } from "../api/image";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import InfiniteScroll from "react-infinite-scroll-component";
import Masonry from "react-masonry-css";
import Banner from '../components/banner/Banner';
import BannerCaption from '../components/banner/BannerCaption';
import BannerSearchInput from '../components/input/BannerSearchInput';
import {BiLoaderAlt} from 'react-icons/bi'
import ImagePreview from '../components/image/ImagePreview';
import Head from "next/head";
import { useState } from 'react';

const Index = () => {
  const imageUrl = process.env.NEXT_PUBLIC_BASEIMG;
  const [searchValue, setSearchValue] = useState<string>("");
  const router = useRouter();
  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery(
    ["Home"],
    ({ pageParam = 1 }) => GetHomeImage(pageParam),
    {
      getNextPageParam: (lastPage, allPages) =>
        allPages.length < Math.ceil(lastPage.total_pages / 20)
          ? allPages.length + 1
          : undefined,
    }
  );
  return (
    <>
    <Head>
      <title>SoeMovies</title>
    </Head>
      <Banner>
        <BannerCaption
          title="SoeMovies"
          description="Find out about many films from all corners of the world from themoviedb api"
        />
        <BannerSearchInput
          value={searchValue}
          onChange={(e) =>
            setSearchValue(e.target.value.trimStart().replace(/ +(?= )/g, ''))
          }
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              router.push(`/search/${searchValue.trim()}`)
            }
          }}
        />
      </Banner>
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

export default Index;
