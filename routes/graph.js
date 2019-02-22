const Slashed = require('slashed')
const {
    graphql,
    buildSchema
} = require('graphql')
const Router = Slashed.Router
const Signature = require('../app/models/signature')

const schemaString = `
scalar ObjectID

type Query {
    ${Signature.query}
}

input PaginationInput {
    cursor: Int
    limit: Int
}

type Mutation {
    ${Signature.mutation}
}

${Signature.graph}

`

const resolvers = {
    ...Signature.resolvers
}

const schema = buildSchema(schemaString)

var router = new Router()

router.all('', async (ctx) => {
    let query = ctx.request.body.query
    ctx.body = await graphql(schema, query, resolvers, {})
})

module.exports = router