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

    validateToken(token){
        let sessions = this.document.sessions
        if(sessions && sessions.constructor === Array){
            let dateOffset = (24*60*60*1000) * 20
            let maxDate = new Date().getTime() + dateOffset

            let match = false

            for(let index in sessions){
                let session = sessions[index]

                let sessionValidUntil = session.lastUsed + dateOffset
                
                if(sessionValidUntil < maxDate){
                    if(session.token === token){
                        this.document.sessions[index].lastUsed = new Date().getTime()
                        this.save()

                        match = true

                        continue
                    }
                }else{
                    delete this.document.sessions[index]
                    this.save()
                }
            }

            if(match) return true
        }

        return false
    }

    static async authenticate(token, ctx){
        let secret = ctx.app.get('env:secret')
        let decodedToken = jwt.verify(token, secret)
        
        if(decodedToken.id){
            let user = await User.findOne({_id: new ObjectID(decodedToken.id)})
            if(user.validateToken(token)){
                return user
            }
        }

        return null

        //figure out fail process
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
            sessions (input: PaginationInput): [UserSession]
        }

        interface UserProfile {
            firstName: String
            lastName: String
            dateOfBirth: String
        }

        type UserSession {
            lastUsed: String
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