import { useState , useEffect} from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const Content = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const getMorePost = async () => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/todos?_start=${posts.length}&_limit=20`
    );
    const newPosts = await res.json();
    setPosts((post) => [...post, ...newPosts]);
  };

  useEffect(()=>{
    fetch(
      "https://jsonplaceholder.typicode.com/todos?_limit=20"
    ).then((response) => response.json()).then(data=>setPosts(data));
  },[])

  useEffect(()=>{
    //posts.at(-1).id === posts.length && setHasMore(false)
    posts.length >=200 && setHasMore(false)
  },[posts])

  

  return (
    <>
      <InfiniteScroll
        dataLength={posts.length}
        next={getMorePost}
        hasMore={hasMore}
        loader={<h3 style={{color:"black"}}> Loading...</h3>}
        endMessage={<h4 style={{color:"black"}}>Nothing more to show</h4>}
      >
        {posts.map((data,i) => (
          <div key={data.id}>
            <div className="back" style={{
              padding: "10px",
              backgroundColor: "dodgerblue",
              color: "white",
              margin: "10px"
            }}>
              <strong> {data.id}</strong> {data.title}
            </div>
            {data.completed}
          </div>
        ))}
      </InfiniteScroll>
      
    </>
  );
};


export default Content;