import bcrypt from 'bcryptjs'
import generateToken from '../utils/generateToken'
import getUserId from '../utils/getUserId'
import hashPassword from '../utils/hashPassword'

const Mutation = {
  async createPost(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)
    const post = await prisma.mutation.createPost(
      {
        data: { ...args.data, author: { connect: { id: userId } } },
      },
      info
    )

    return post
  },
  async updatePost(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)
    const postExists = await prisma.exists.Post({
      id: args.id,
      author: { id: userId },
    })
    if (!postExists) {
      throw new Error(`Unable to update post.`)
    }

    const isPublished = await prisma.exists.Post({
      id: args.id,
      published: true,
    })

    if (isPublished && args.data.published === false) {
      await prisma.mutation.deleteManyComments({
        where: {
          post: {
            id: args.id,
          },
        },
      })
    }

    const post = await prisma.mutation.updatePost(
      {
        where: {
          id: args.id,
        },
        data: args.data,
      },
      info
    )
    return post
  },
  async deletePost(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)

    const postExists = await prisma.exists.Post({ id: args.id, author: { id: userId } })

    if (!postExists) {
      throw new Error(`Unable to delete post.`)
    }

    return prisma.mutation.deletePost(
      {
        where: { id: args.id },
      },
      info
    )
  },
  async createComment(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)
    const postExists = await prisma.exists.Post({ id: args.data.post, published: true })
    if (!postExists) {
      throw new Error(`Post not found.`)
    }
    const comment = await prisma.mutation.createComment(
      {
        data: {
          text: args.data.text,
          author: {
            connect: {
              id: userId,
            },
          },
          post: {
            connect: {
              id: args.data.post,
            },
          },
        },
      },
      info
    )
    return comment
  },
  async updateComment(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)
    const commentExists = await prisma.exists.Comment({
      id: args.id,
      author: { id: userId },
    })
    if (!commentExists) {
      throw new Error(`Unable to update comment.`)
    }
    const comment = await prisma.mutation.updateComment(
      { where: { id: args.id }, data: args.data },
      info
    )
    return comment
  },

  async deleteComment(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)
    const commentExists = await prisma.exists.Comment({
      id: args.id,
      author: { id: userId },
    })
    if (!commentExists) {
      throw new Error(`Unable to delete comment.`)
    }
    const comment = await prisma.mutation.deleteComment({ where: { id: args.id } }, info)
    return comment
  },

  async createUser(parent, args, { prisma }, info) {
    const password = await hashPassword(args.data.password)
    const user = await prisma.mutation.createUser({
      data: { ...args.data, password },
    })
    return {
      user,
      token: generateToken(user.id),
    }
  },

  async login(parent, args, { prisma }, info) {
    if (args.data.password.length < 8) {
      throw new Error('Password must be 8 characters or longer.')
    }
    const [user] = await prisma.query.users({ where: { email: args.data.email } })

    if (!user) {
      throw new Error('Unable to login.')
    }
    const isMatch = await bcrypt.compare(args.data.password, user.password)
    if (!isMatch) {
      throw new Error('Unable to login.')
    }

    return {
      user,
      token: generateToken(user.id),
    }
  },

  async updateUser(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)

    if (typeof args.data.password === `string`) {
      args.data.password = await hashPassword(args.data.password)
    }

    return await prisma.mutation.updateUser(
      {
        data: args.data,
        where: { id: userId },
      },
      info
    )
  },
  async deleteUser(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)

    return prisma.mutation.deleteUser({ where: { id: userId } }, info)
  },
}
export { Mutation as default }
