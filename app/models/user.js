const connection = require('./connection')

const { Model } = require('moongraph')
const { ObjectID } = require('mongodb')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class User extends Model {
    static get connection(){
        return connection.getCollection('user')
    }

    get transform(){
        let obj = Object.assign({}, this.document)
        
        return obj
    }
    
    static get resolvers(){
        return {
            me: async ({id}) => {
                if(id) return (await this.findOne({_id: new ObjectID(id)})).transform

                if(model === null) return null
            },
            createUser: async ({input}) => {
                input.email = input.email.toLowerCase()
                input.password = await bcrypt.hash(input.password, 12)
                
                let model = new User(input)

                await model.save()

                return model.transform
            },
            loginUser: async({input}, ctx) => {
                let model = await this.findOne({email: input.user.toLowerCase()})
                if(!model) model = await this.findOne({username: input.user})
                if(!model) throw Error(`No user found with username or email of: ${input.user}`)
                
                let hashedPassword = model.document.password

                let match = await bcrypt.compare(input.password, hashedPassword)
                
                if(match){ 
                    let secret = ctx.app.get('env:secret')
                    let token = jwt.sign(String(model.document._id), secret)
                    return token
                }
                throw Error(`Password for ${input.user} is incorrect`)
            }
        }
    }

    static get mutation(){
        return `
            loginUser(input: UserLoginInput): String
            createUser(input: UserCreate): User
        `
    }

    static get query(){
        /**
            signatures: [Signature]
            signature(id: ObjectID): Signature
         */
        return `
            me: User
        `
    }

    static get graph(){
    return `
        type User {
            _id: ObjectID
            username: String
            email: String
            phone: String
            profile: UserProfile
            address: String
            roles: [String]
            sessions: [UserSession]
        }

        interface UserProfile {
            firstName: String
            lastName: String
            dateOfBirth: String
        }

        type UserSession {
            _id: ObjectID
            token: String
            refreshToken: String
            lastUsed: Int
            user: User
            agent: String
        }

        input UserCreate {
            username: String!
            email: String!
            password: String!
            phone: String
            address: String
        }

        input UserLoginInput {
            user: String!
            password: String!
        }
        `
    }
}

module.exports = User