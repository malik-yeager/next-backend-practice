import { AppDataSource } from "./config/data-source";
import { Post } from "./entities/Post";

export async function seedPosts() {
  const postRepo = AppDataSource.getRepository(Post);

  const posts = [
    postRepo.create({
      slug: "welcome-to-our-blog",
      title: "Welcome to Our Blog",
      excerpt: "This is the first post on our brand new platform!",
      thumbnail: "https://example.com/images/welcome.jpg",
      content: {
        time: Date.now(),
        blocks: [
          {
            type: "paragraph",
            data: {
              text: "Welcome to our first post! This blog is powered by our new CMS backend."
            }
          }
        ]
      },
      status: "published",
      visibility: "public",
      tags: ["welcome", "intro"],
      categories: ["general"],
      meta: {
        seoTitle: "Welcome to Our Blog",
        seoDescription: "Introductory post about our new platform"
      },
      views_count: 0,
      likes_count: 0,
      comments_count: 0,
      revision: 1
    })
  ];

  await postRepo.save(posts);
  console.log("✅ Seeded posts successfully!");
}
