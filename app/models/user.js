const connection = require('./connection')
const gql = require('./gql')

const { Model } = require('moongraph')
const { ObjectID } = require('mongodb')
const { createCanvas } = require("canvas");
const convert = require('color-convert')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

function generateDisplayPicture(initials){
    let canvas = createCanvas(100, 100);
    let canvasctx = canvas.getContext("2d");

    canvasctx.arc(50, 50, 50, 0, 2 * Math.PI);
    canvasctx.fillStyle = `#${convert.hsv.hex(Math.random() * 360, 86, 50)}`
    canvasctx.fill();

    canvasctx.font = "35px Arial";
    canvasctx.textAlign = "center";
    canvasctx.textBaseline = "middle";
    canvasctx.fillStyle = "#fff";
    canvasctx.fillText(initials, 50, 50);
    return canvas.toDataURL()
}

class User extends Model {
    static get connection(){
        return connection.getCollection('user')
    }

    get transform(){
        let obj = Object.assign({}, this.document)



        //sessions
        
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
            me: async ({id}, ctx) => {
                let model = null
                if(id){
                    model = (await this.findOne({_id: new ObjectID(id)}))
                }else{
                    if(ctx.state.user){
                        model = ctx.state.user
                    }
                }

                if(model) return model.transform
                return model
            },
            createUser: async ({input}, ctx) => {
                input.email = input.email.toLowerCase()
                input.password = await bcrypt.hash(input.password, 12)
                input.sessions = []
                input.roles = []
                
                let model = new User(input)

                let secret = ctx.app.get('env:secret')
                let session = {
                    token: jwt.sign({id: String(model.document._id)}, secret),
                    lastUsed: new Date().getTime()
                }

                model.document.sessions.push(session)

                try {
                    await model.save()
                } catch (error) {
                    throw error
                }

                return session.token
            },
            loginUser: async({input}, ctx) => {
                let model
                
                if(!model) model = await this.findOne({email: input.user.toLowerCase()})
                if(!model) model = await this.findOne({username: input.user})
                if(!model) throw Error(`No user found with username or email of '${input.user}'`)

                if(!model.document.displayPicture){
                    let doc = model.document
                    let initials = `${doc.firstName.substr(0, 1) + doc.lastName.substr(0,1)}`
                    model.document.displayPicture = generateDisplayPicture(initials)
                    await model.save()
                }

                let hashedPassword = model.document.password

                let match = await bcrypt.compare(input.password, hashedPassword)
                
                if(match){ 
                    let secret = ctx.app.get('env:secret')
                    let session = {
                        token: jwt.sign({id: String(model.document._id)}, secret),
                        lastUsed: new Date().getTime()
                    }
                    model.document.sessions.push(session)
                    await model.save()
                    return session.token
                }
                throw Error(`Password is incorrect`)
            }
        }
    }

    static get mutation(){
        return `
            loginUser(input: UserLoginInput): String
            createUser(input: UserCreate): String
        `
    }

    static get query(){
        return `
            me: User @isAuthenticated
        `
    }

    static async createIndexes(){
        return await super.createIndexes({
            username: {
                unique: true
            },
            email: {
                unique: true
            }
        })
    }

    static get graph(){
    return gql`
        type User {
            _id: ObjectID
            firstName: String
            lastName: String
            username: String
            email: String
            phone: String
            profile: UserProfile
            address: String
            roles: [String]
            sessions (input: PaginationInput): [UserSession]
            displayPicture: String
        }

        interface UserProfile {
            dateOfBirth: String
        }

        type UserSession {
            lastUsed: String
            agent: String
        }

        input UserCreate {
            firstName: String!
            lastName: String!
            username: String!
            email: String!
            password: String!
        }

        input UserLoginInput {
            user: String!
            password: String!
        }
        `
    }
}

module.exports = User