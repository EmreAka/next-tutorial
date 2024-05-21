"use client";

import styles from "./page.module.css";
import { useState, useEffect } from "react";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export default function Home({ params }: { params: { postId: string } }) {
  const [post, setPost] = useState<Post | undefined>(undefined);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts/" + params.postId
    );
    const post = (await response.json()) as Post;
    setPost(post);
  }

  return (
    <main>
      <h1 className={styles.title}>Posts</h1>
      <ul>
        {post && (
          <>
            <li className={styles.listItem} >
              <div key={post.id}>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
              </div>
            </li>
          </>
        )}
      </ul>
    </main>
  );
}
