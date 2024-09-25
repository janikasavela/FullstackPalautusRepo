const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const { test, after, beforeEach, describe } = require("node:test");
const { Blog } = require("../models/blog");
const assert = require("node:assert");
const { initialBlogs, initialBlog } = require("./test_helper");
const { User } = require("../models/user");
const jwt = require("jsonwebtoken");

const api = supertest(app);

let token;
beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  const user = new User({
    username: "testuser",
    name: "Test User",
    passwordHash: "hashedpassword",
  });

  const savedUser = await user.save();

  const userForToken = {
    username: savedUser.username,
    id: savedUser._id,
  };

  token = jwt.sign(userForToken, process.env.SECRET);

  const blogsWithUser = initialBlogs.map((blog) => ({
    ...blog,
    user: savedUser._id,
  }));

  await Blog.insertMany(blogsWithUser);
});

describe("data loaded from db is valid", () => {
  test("all blogs from database are returned and format is json", async () => {
    const response = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    assert.strictEqual(response.body.length, initialBlogs.length);
  });

  test("the field identifying the returned blogs should be called id", async () => {
    const response = await api.get("/api/blogs");

    response.body.forEach((blog) => {
      assert(blog.id, "id is missing");
      assert(!blog._id, "_id should not be defined");
    });
  });
});

describe("Blog API tests with authentication", () => {
  test("a valid blog can be added when token is provided", async () => {
    const newBlog = initialBlog;

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`) // Lisätään token
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs");

    const titles = response.body.map((r) => r.title);

    assert.strictEqual(response.body.length, initialBlogs.length + 1);
    assert(titles.includes("Go To Statement Considered Harmful"));
  });

  test("blog addition fails with status 401 if token is not provided", async () => {
    const newBlog = initialBlog;

    await api.post("/api/blogs").send(newBlog).expect(401); // Odotetaan 401 Unauthorized

    const response = await api.get("/api/blogs");
    assert.strictEqual(response.body.length, initialBlogs.length); // Blogimäärä ei saa muuttua
  });

  test("if no value is given to the likes field, its value is set to 0", async () => {
    const { likes, ...newBlog } = initialBlog;

    const response = await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`) // Lisätään token
      .send(newBlog)
      .expect(201);

    assert.strictEqual(response.body.likes, 0);
  });

  test("if no value is given to the title or url fields, response has status code 400", async () => {
    const { title, url, ...newBlog } = initialBlog;

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`) // Lisätään token
      .send(newBlog)
      .expect(400);
  });
});

/* describe("post method works and has valid error handling", () => {
  test("a valid blog can be added", async () => {
    const newBlog = initialBlog;

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs");

    const titles = response.body.map((r) => r.title);

    assert.strictEqual(response.body.length, initialBlogs.length + 1);
    assert(titles.includes("Go To Statement Considered Harmful"));
  });

  test("if no value is given to the likes field, its value is set to 0", async () => {
    const { likes, ...newBlog } = initialBlog;

    const response = await api.post("/api/blogs").send(newBlog);

    assert.strictEqual(response.body.likes, 0);
  });

  test("if no value is given to the title or url fields, response has status code 400 Bad Request", async () => {
    const { title, url, ...newBlog } = initialBlog;

    await api.post("/api/blogs").send(newBlog).expect(400);
  });
}); */

describe("delete request works and has valid error handling", () => {
  test("when given valid id as params the delete request works", async () => {
    const blogToDelete = initialBlogs[0];

    const response = await api
      .delete(`/api/blogs/${blogToDelete._id}`)
      .set("Authorization", `Bearer ${token}`) // Lisätään token
      .expect(200);

    assert.deepStrictEqual(response.body.id, blogToDelete._id);

    const remainingBlogs = await api.get("/api/blogs");
    assert.strictEqual(remainingBlogs.body.length, initialBlogs.length - 1);
  });

  test("when given valid id but no token is provided, deletion fails with status 401", async () => {
    const blogToDelete = initialBlogs[0];

    await api.delete(`/api/blogs/${blogToDelete._id}`).expect(401); // Odotetaan 401 Unauthorized

    const remainingBlogs = await api.get("/api/blogs");
    assert.strictEqual(remainingBlogs.body.length, initialBlogs.length); // Blogimäärä ei saa muuttua
  });
});

/* describe("delete request work and has valid error handling", () => {
  test("when given valid id as params the delete request works", async () => {
    const blogToDelete = initialBlogs[0];

    const response = await api
      .delete(`/api/blogs/${blogToDelete._id}`)
      .expect(200);

    assert.deepStrictEqual(response.body.id, blogToDelete._id);

    const remainingBlogs = await api.get("/api/blogs");
    assert.deepStrictEqual(remainingBlogs.body.length, initialBlogs.length - 1);
  });

  test("when given valid id but still not a blog post in database with given id return has status code 404", async () => {
    await api.delete("/api/blogs/5a422aa71b54a676234d17f1").expect(404);

    const remainingBlogs = await api.get("/api/blogs");
    assert.deepStrictEqual(remainingBlogs.body.length, initialBlogs.length);
  });

  test("when given unvalid id as params return has status code 400", async () => {
    await api.delete("/api/blogs/1234").expect(400);
  });
}); */

describe("updating works and has valid error handling", () => {
  test("when given valid id as params and req.body includes likes the update request works", async () => {
    const blogToUpdate = { likes: 100, ...initialBlogs[0] };

    const response = await api
      .put(`/api/blogs/${blogToUpdate._id}`)
      .set("Authorization", `Bearer ${token}`) // Lisätään token
      .send(blogToUpdate)
      .expect(200);

    assert.strictEqual(response.body.likes, blogToUpdate.likes);
  });

  /*   test("when given valid id as params and req.body includes likes the update request works", async () => {
    const blogToUpdate = { likes: 100, ...initialBlogs[0] };

    const response = await api
      .put(`/api/blogs/${blogToUpdate._id}`)
      .send(blogToUpdate)
      .expect(200);

    assert.deepStrictEqual(response.body.likes, blogToUpdate.likes);
  });

  test("when given valid id but still not a blog post in database with given id return has status code 404", async () => {
    const blogToUpdate = { likes: 100, ...initialBlogs[0] };

    await api
      .put("/api/blogs/5a422aa71b54a676234d17f1")
      .send(blogToUpdate)
      .expect(404);
  });

  test("when given unvalid id as params return has status code 400", async () => {
    const blogToUpdate = { likes: 100, ...initialBlogs[0] };

    await api.put("/api/blogs/1234").send(blogToUpdate).expect(400);
  });

  test("when likes field is not provided, response has status code 400 bad request", async () => {
    const { likes, ...blogToUpdate } = initialBlogs[0];

    await api
      .put(`/api/blogs/${blogToUpdate._id}`)
      .send(blogToUpdate)
      .expect(400);
  }); */
});

after(async () => {
  await mongoose.connection.close();
});
