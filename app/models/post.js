const connection = require('./connection')

const { Model } = require('moongraph')
const { ObjectID } = require('mongodb')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class Post extends Model {
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
                input.sessions = []
                
                let model = new User(input)

                await model.save()

                return model.transform
            },
            loginUser: async({input}, ctx) => {
                let model
                
                if(!model) model = await this.findOne({email: input.user.toLowerCase()})
                if(!model) model = await this.findOne({username: input.user})
                if(!model) throw Error(`No user found with username or email of: ${input.user}`)

                let hashedPassword = model.document.password

                let match = await bcrypt.compare(input.password, hashedPassword)
                
                if(match){ 
                    let secret = ctx.app.get('env:secret')
                    let session = {
                        token: jwt.sign({id: String(model.document._id)}, secret),
                        lastUsed: new Date().getTime()
                    }
                    model.document.sessions.push(session)
                    model.save()
                    return session.token
                }
                throw Error(`Password is incorrect`)
            }
        }
    }

    static get mutation(){
        return `
            createPost(input: UserLoginInput): String
            deletePost(input: UserCreate): User
        `
    }

    static get query(){
        /**
            signatures: [Signature]
            signature(id: ObjectID): Signature
         */
        return `
            post: User
        `
    }

    static get graph(){
    return gql`
        type Post {
            _id: ObjectID
            authors: [User]
            title: String
        }
        `
    }
}

module.exports = Post