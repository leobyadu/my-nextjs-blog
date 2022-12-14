import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import useSWR from "swr";
import { request } from "graphql-request";
import Wrapper from "../../layout/wrapper";




const fetcher = (endpoint, query, variables) =>
  request(endpoint, query, variables);

export const getStaticProps = async () => {
  const data = await fetcher(
    "https://api-ap-northeast-1.hygraph.com/v2/cl63tp35j7a8p01t7cmnheovx/master",
    `
    {
      posts (orderBy: createdAt_DESC){
        title
        slug
        date
        description
        tags                
      }
    }
    `
    );

    return {
      props: {
        posts: data.posts,
      },
    };
  };

export default function Posts({ posts }) {
  
  const [searchValue, setSearchValue] = useState("");
  const { data, error } = useSWR(
    [
      "https://api-ap-northeast-1.hygraph.com/v2/cl63tp35j7a8p01t7cmnheovx/master",
      `
      query getPosts($searchValue: String) {
        posts(orderBy: createdAt_DESC, where: {title_contains: $searchValue}) {
          title
          slug
          date
          description
          tags
        }
      }     
      
      `,
      searchValue,
    ],
    (endpoint, query) => fetcher(endpoint, query, { searchValue }),
    { initialData: { posts }, revalidateOnFocus: true }
  );

  if (error) {
    return (
      <div className="max-w-3xl mx-auto">
        <h2 className="text-1xl text-red text text-center justify-between">There was an error with the data fetching !!!!</h2>
      </div>
    );
  }
  
  return (
    <>
      <div className="max-w-3xl mx-auto px-4">  
      <div>      
          <h1 className="text-4xl font-semibold mb-7">All Posts</h1>        
          <input
            type="text"
            value={searchValue}
            placeholder="Search blog posts"
            className="focus:outline-none mb-6 focus:ring-2 focus:ring-gray-500 w-full rounded-lg border h-10 pl-4 text-lg text-gray-500 border-gray-200"
            onChange={(event) => setSearchValue(event.target.value)}
          />
        </div>
        {data?.posts?.map((item) => (
          <div key={item.slug}>
            <Link href={`/posts/${item.slug}`}>
              <a>
                <div className="mt-4">
                  <div className="text-xs">{item.date}</div>
                  <h1 className="text-2xl font-semibold">{item.title}</h1>
                  <div className="mt-2">
                    {item.tags.map((tag) => (
                      <span
                        className="text-white uppercase tracking-wide text-xs mr-2 px-2 py-1 rounded-full bg-slate-800"
                        key={tag}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            </Link>
          </div>
        ))}
        </div>
      
    </>
  );
}
