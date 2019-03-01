
const { addDirectiveResolveFunctionsToSchema } = require('graphql-directive')
const { graphql, buildSchema } = require('graphql')
const roles = require('./roles')

/**
 * Models
 */
const Signature = require('../app/models/signature')
const User = require('../app/models/user')

const schemaString = `
scalar ObjectID
directive @isAuthenticated on FIELD | FIELD_DEFINITION
directive @hasPermission(permission: String) on FIELD | FIELD_DEFINITION
directive @hasRole(role: String) on FIELD | FIELD_DEFINITION

type Query {
    ${Signature.query}
    ${User.query}
}

input PaginationInput {
    cursor: Int
    limit: Int
}

type Mutation {
    ${Signature.mutation}
    ${User.mutation}
}

${Signature.graph}
${User.graph}

`

const resolvers = {
    ...Signature.resolvers,
    ...User.resolvers
}

const schema = buildSchema(schemaString)

addDirectiveResolveFunctionsToSchema(schema, {
    async hasPermission(next, source, {permission}, ctx){
        let user = ctx.state.user
        if(!user){
            throw new Error("Must be authenticiated")
        }

        let perms = []

        user.document.roles
            .map(role => roles[role])
            .filter(val=>{
                perms = [...perms, ...val]
            })
        if (perms.indexOf(permission) !== -1) return next()
        throw new Error("Does not have permissions")
    }
})

module.exports = async (query, ctx) => {
    return await graphql(schema, query, resolvers, ctx)
}