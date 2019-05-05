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
    canvasctx.fillStyle = `#${convert.hsv.hex(Math.random() * 360, 90, 70)}`
    canvasctx.fill();

    canvasctx.font = "50px Ubuntu";
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
        let obj = {...this.document}
        
        return obj
    }

    async deleteToken(token){
        let sessions = this.document.sessions

        let match = false

        this.document.sessions = sessions.filter((session)=>{
            if(session.token !== token) return session
            match = true
        })
        
        await this.save()

        return match
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

    async createToken(ctx){
        let secret = ctx.app.get('env:secret')
        let session = {
            token: jwt.sign({id: String(this.document._id)}, secret),
            lastUsed: new Date().getTime()
        }

        this.document.sessions.push(session)

        try {
            await this.save()
        } catch (error) {
            throw error
        }

        return session.token
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
            me: async ({}, ctx) => {
                let model = null
                if(ctx.state.user){
                    model = ctx.state.user
                }

                if(model) return model.transform
                return model
            },
            signOut: async ({input}, ctx) => {
                let model = ctx.state.user
                let { token } = input

                if(!model) throw new Error('You must be logged in to delete a token')
                if(!token) throw new Error('You must provide a token')

                return await model.deleteToken(token)
            },
            createUser: async ({input}, ctx) => {
                let userBoilerPlate = {
                    sessions: [],
                    roles: []
                }

                input.email = input.email.toLowerCase()
                input.password = await bcrypt.hash(input.password, 12)

                let userObject = Object.assign(userBoilerPlate, input)

                let model = new User(userObject)

                let token = model.createToken(ctx)

                return token
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

                let { password } = model.document

                let match = await bcrypt.compare(input.password, password)
                
                if(match){
                    return model.createToken(ctx)
                }
                throw Error(`Password is incorrect`)
            }
        }
    }

    static get mutation(){
        return `
            loginUser(input: UserLoginInput): String
            createUser(input: UserCreate): String
            signOut(input: UserToken): Boolean
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

        input UserToken {
            token: String
        }
        `
    }
}

module.exports = User