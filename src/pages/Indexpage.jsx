import { useEffect } from "react";
import Post from "../Post";
import { useState } from "react";
import { UserContext } from "../Usercontext";
import { useContext } from "react";
import Loaderpage from './Loaderpage';


export default function Indexpage() {

    const { userinfo } = useContext(UserContext);

    console.log("user info is", userinfo);

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch('https://lalithblogweb.onrender.com/post').then(res => {
            res.json().then(posts => {

                setPosts(posts);
            })
        })


    }, [])

    if (userinfo === null || userinfo === '') {
        window.location.reload();
    }

    return (
        <>
            {

                Array.isArray(posts)&&posts.length!==0 ? (posts.map(per => {
                    return <Post key={per._id} title={per.title} summary={per.summary} create_at={per.createdAt} _id={per._id} cover={per.cover} author={per.author.username} />


                })) : (
                    <>
                    <Loaderpage/>
                    </>
                )
            }


        </>
    )
}
