"use client";

import styles from "./page.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  const router = useRouter();

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const posts = (await response.json()) as Post[];
    setPosts(posts);
  }

  function navigateToPost(postId: number) {
    router.push(`/posts/${postId}`);
  }

  return (
    <main>
      <h1 className={styles.title}>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li
            className={styles.listItem}
            key={post.id}
            onClick={() => navigateToPost(post.id)}
          >
            <div key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
