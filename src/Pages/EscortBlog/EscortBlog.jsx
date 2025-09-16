import React from 'react'

const EscortBlog = () => {
  const blogs = [
    {
      id: 1,
      title: "Top 10 Tips for a Safe Experience",
      excerpt: "Safety should always come first. Here are the top things to keep in mind...",
      author: "Admin",
      date: "Sept 15, 2025",
    },
    {
      id: 2,
      title: "How to Choose the Right Escort",
      excerpt: "Choosing the right companion is important. Here’s how to make the best choice...",
      author: "Sophia",
      date: "Sept 12, 2025",
    },
    {
      id: 3,
      title: "Behind the Scenes: Escort Life",
      excerpt: "Ever wondered what life is like behind the scenes? Read more here...",
      author: "Lara",
      date: "Sept 10, 2025",
    },
  ]

  return (
    <div className="bg-pink-100 p-6">
      <h2 className="text-2xl font-bold text-pink-500 mb-6">Escort Blog</h2>
      <div className="space-y-6">
        {blogs.map(blog => (
          <div key={blog.id} className="bg-white p-4 shadow-md">
            <h3 className="text-xl font-semibold text-pink-500">{blog.title}</h3>
            <p className="text-gray-600 mt-2">{blog.excerpt}</p>
            <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
              <span>By {blog.author}</span>
              <span>{blog.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default EscortBlog
