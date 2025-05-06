export const fetchPosts = () => fetch("/posts").then((res) => res.json());
export const fetchPostById = (id) =>
  fetch(`/posts/${id}`).then((res) => res.json());

export const createPost = (post) =>
  fetch("/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  });

export const updatePost = (id, post) =>
  fetch(`/posts/${id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  });

export const deletePost = (id) =>
  fetch("/posts/delete", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });
