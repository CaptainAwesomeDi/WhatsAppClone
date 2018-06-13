export const Schema = [`
# declare custom scalars
scalar Date

# a group chat entity
type Group {
  id: Int! # unique id for the group
  name: String # name of the group
  users: [User]! # users in the group
  messages: [Message] # messages sent to the group
}

type Mutation {
  # send a message to a group
  createMessage(
    text:String!, userId: Int!, groupId: Int!
  ):Message
}

# a user
type User {
 id: Int!
 email: String!
 username: String
 messages: [Message]
 groups: [Group]
 friends: [User]
}

type Message {
  id: Int!
  to: Group!
  from: User!
  text: String!
  createdAt: Date!
}

#query for types
type Query {
  # Return a user by their email or id
  user(email: String, id: Int): User

  # Return messages sent by a user via userId
  # Return messages sent to a group via groupId
  messages(groupId: Int, userId: Int): [Message]

  # Return a group by its id
  group(id: Int!): Group
}

  schema {
    query: Query
    mutation: Mutation
  }
`];

export default Schema;