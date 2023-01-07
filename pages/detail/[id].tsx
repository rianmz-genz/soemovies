import React, { useState } from "react";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { GetDetailImage } from "../../api/image";
import { VscStarFull, VscArrowLeft } from "react-icons/vsc";
import { useRouter } from "next/router";
import Header from "../../components/header/Header";
import NavBrand from "../../components/header/NavBrand";
import HeaderSearchInput from "../../components/input/HeaderSearchInput";
const DetailMovie = ({ movie }: any) => {
  const [keyword, setKeyword] = useState<string>("");
  const router = useRouter();
  console.log(movie);
  const imageUrl = process.env.NEXT_PUBLIC_BASEIMG;
  return (
    <article className="pt-20 w-full  h-screen max-sm:h-fit bg-[#112136] relative text-white flex flex-col justify-center items-center max-sm:py-20">
      <VscArrowLeft
        className="absolute top-14 left-48 max-sm:top-8 max-sm:left-14 text-2xl bg-slate-700 p-1 rounded-full cursor-pointer"
        onClick={() => {
          router.push("/");
        }}
      />
      <h1 className="absolute top-12 left-56 ml-2 mt-1 max-sm:top-7 max-sm:left-24 text-2xl">
        Detail Movie
      </h1>
      <div className="flex max-sm:flex-col max-sm:items-center justify-center w-11/12 h-fit max-sm:gap-y-6">
        <Image
          className="w-72 rounded-lg"
          src={`${imageUrl}${movie.poster_path}`}
          width={100}
          height={100}
          alt={movie.title}
          loading="lazy"
        />
        <div className="w-1/2 border border-slate-600 max-sm:h-fit ml-6 max-sm:w-11/12 rounded-lg relative bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 p-6">
          <h2 className="font-medium text-xl mb-6 text-white">{movie.title}</h2>
          <p className="text-base text-slate-300 ">
            {movie.overview}
            <br />
          </p>
          <p className="text-base text-slate-300 md:absolute md:bottom-12 max-sm:mt-3 ml-1">
            Release on : {movie.release_date}{" "}
          </p>
          <div className="flex md:absolute md:bottom-6 max-sm:mt-3 items-center">
            <VscStarFull className="text-yellow-400" />
            <p className="ml-1 text-yellow-400">{movie.vote_average} / 10.0</p>
          </div>
        </div>
        <span className="absolute top-3 right-4 w-1/4 skew-y-12 h-4/6 z-0 blur-3xl bg-gradient-to-r from-slate-600 to-slate-500 opacity-40"></span>
      </div>
    </article>
  );
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id as string | undefined;

  if (!id) {
    return {
      notFound: true,
    };
  }

  try {
    const movie = await GetDetailImage(Number(id));
    return {
      props: {
        movie,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
// export const getServerSideProps:GetServerSideProps = async (context) => {
//     const id = context.params?.id as string | undefined
//     if (!id) {
//         return {
//           notFound: true as boolean,
//         }
//       }
//     try{
//         const detail = await getDetailImage(Number(id))
//         return{
//             props:{
//                 detail
//             }
//         }
//     }catch(error){
//         return{
//             notFound: true as boolean
//         }
//     }

// }

export default DetailMovie;
