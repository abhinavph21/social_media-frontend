import React from 'react'
// import styles from './index.css'
import { Avatar, Card, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ImageIcon from "@mui/icons-material/Image";
import VideocamIcon from "@mui/icons-material/Videocam";
import ArticleIcon from "@mui/icons-material/Article";
import StoryCircle from './StoryCircle';
import PostCard from '../Post/PostCard';

const MiddlePart = () => {
    const story = [1, 1, 1, 1]
    const posts = [1, 1, 1, 1]
    const handleOpenCreatePostModal = () => { };

    return (
        <div className="px-20">
            <div className="bg- py-5 flex items-center bg-[#191c29] p-5 rounded-b-md">
                <div className="flex flex-col items-center mr-4 cursor-pointer">
                    <Avatar sx={{ width: "5rem", height: "5rem", bgcolor: "#212534", color: "rgb(88,199,250)" }}>
                        <AddIcon sx={{ fontSize: "3rem" }} />
                    </Avatar>
                    <p>New</p>
                </div>

                {story.map((item) => (
                    <StoryCircle />
                ))}
            </div>
            <div className="card p-5 mt-5">
                <div className="flex justify-between">
                    <Avatar sx={{ bgcolor: "#212534", color: "rgb(88,199,250)" }} className="bg-[black]" />
                    <input
                        placeholder="Create new post..."
                        className="outline-none w-[90%] bg-slate-100 rounded-full px-5 bg-transparent border border-[#3b4054]"
                        readOnly
                        type="text"
                    />
                </div>
                <div className="flex justify-center space-x-9 mt-5">
                    <div className="flex items-center">
                        <IconButton color="primary" onClick={handleOpenCreatePostModal}>
                            <ImageIcon />
                        </IconButton>

                        <span>media</span>
                    </div>
                    <div className="flex  items-center">
                        <IconButton color="primary">
                            <VideocamIcon />
                        </IconButton>

                        <span>video</span>
                    </div>
                    <div className="flex  items-center">
                        <IconButton color="primary">
                            <ArticleIcon />
                        </IconButton>

                        <span>Write Article</span>
                    </div>
                </div>
            </div>
            <div className="mt-5 space-y-5">
                {posts.map(() => (
                    <>
                        <PostCard />
                    </>
                ))}
            </div>
        </div >
    )
}

export default MiddlePart