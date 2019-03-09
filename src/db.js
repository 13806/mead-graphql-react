const users = [
  {
    id: '1A',
    name: 'Andrew',
    email: 'andrew@example.com',
    age: 27,
  },
  {
    id: '2',
    name: 'Sarah',
    email: 'sarah@example.com',
  },
  {
    id: '3',
    name: 'Mike',
    email: 'mike@example.com',
  },
]

const comments = [
  {
    id: '21',
    author: '1A',
    post: '10',
    text:
      'Velit veniam eiusmod ullamco non. Labore aliqua aute irure in et nisi nisi occaecat ex proident qui est id do. Quis elit pariatur deserunt id exercitation enim quis est dolore. Nisi cillum dolore velit Lorem pariatur elit culpa ullamco minim aliqua duis. Minim sit aliqua elit laborum est deserunt Lorem irure ipsum id magna. In sunt mollit in proident dolor pariatur sunt.',
  },
  {
    id: '22',
    author: '1A',
    post: '11',
    text:
      'Quis reprehenderit in mollit dolor exercitation sit officia qui. Cillum officia minim enim nulla culpa tempor est laborum voluptate quis. Magna anim sint culpa deserunt do dolor Lorem do sit in aliqua. Tempor sit exercitation ullamco aute. Cillum enim esse sit pariatur ex nostrud excepteur. Ipsum ut voluptate do in minim irure consectetur. Culpa officia ipsum commodo consectetur aute in consequat ullamco consectetur occaecat occaecat.',
  },
  {
    id: '23',
    author: '2',
    post: '10',
    text:
      'Labore reprehenderit dolore ad velit sit eu labore anim. Irure ea veniam sunt ea sunt reprehenderit do aute qui pariatur. Voluptate sunt ex eu ipsum. Adipisicing do eu ipsum commodo id incididunt irure minim elit excepteur. In nostrud esse nulla duis elit. Quis duis aliqua irure duis esse deserunt eiusmod incididunt duis labore nostrud aliqua tempor.',
  },
  {
    id: '24',
    author: '3',
    post: '11',
    text:
      'Occaecat consequat nulla adipisicing et consectetur magna duis. Deserunt ut minim minim nulla quis ipsum culpa pariatur nostrud aliqua eiusmod id. Velit qui nostrud aliquip reprehenderit irure minim ut ex ea ea nostrud exercitation nulla. Ullamco et quis fugiat consequat ea reprehenderit est aliqua est in voluptate cillum. Tempor anim veniam ex aliquip voluptate commodo aliqua esse id.',
  },
]

const posts = [
  {
    id: '10',
    title: 'GraphQL 101',
    body: 'This is how to use GraphQL...',
    published: true,
    author: '1A',
  },
  {
    id: '11',
    title: 'GraphQL 201',
    body: 'This is an advanced GraphQL post...',
    published: false,
    author: '2',
  },
  {
    id: '12',
    title: 'Programming Music',
    body: '',
    published: false,
    author: '1A',
  },
]

const db = {
  posts,
  users,
  comments,
}

export { db as default }
