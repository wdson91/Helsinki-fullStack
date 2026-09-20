const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
  {
    title: 'HTML is easy',
    author: 'Danrlei',
    url: 'http://example.com/1',
    likes: 5
  },
  {
    title: 'Browser can execute only JavaScript',
    author: 'Danrlei',
    url: 'http://example.com/2',
    likes: 10
  }
]

describe('blog api tests', () => {
  test('dummy test to ensure test runner recognizes suite', () => {
    assert.strictEqual(1, 1)
  })

  test('unique identifier property of blog posts is named id', () => {
    const blog = new Blog({
      title: 'Test id',
      url: 'http://example.com',
      author: 'Author',
      likes: 1
    })
    const json = blog.toJSON()
    assert.ok(json.id)
    assert.strictEqual(json._id, undefined)
  })

  test('if likes property is missing, it defaults to 0', () => {
    const blog = new Blog({
      title: 'Test default likes',
      url: 'http://example.com',
      author: 'Author'
    })
    assert.strictEqual(blog.likes, 0)
  })
})
