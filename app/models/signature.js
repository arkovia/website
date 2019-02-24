const connection = require('./connection')

const { Model } = require('moongraph')
const { ObjectID } = require('mongodb')

class Signature extends Model{
    static get connection(){
        return connection.getCollection('signature')
    }

    get transform(){
        let obj = Object.assign({}, this.document)
        
        return obj
    }
    
    static get resolvers(){
        return {
            signature: async ({id}) => {
                if(id) return (await this.findOne({_id: new ObjectID(id)})).transform

                if(model === null) return null
            },
            signatureCount: async () => {
                return await this.count()
            },
            signatures: async (input) => {
                return (await this.find(input))
                    .map(val => val.transform)
            },
            signaturesPastWeek: async () => {
                let date = new Date()

                date.setHours(-24 * 7)

                let objectid = new ObjectID(Math.floor(date/1000).toString(16) + "0000000000000000")

                return await this.count({ _id: {
                    $gt: objectid
                }})
            },
            createSignature: async ({input}) => {
                console.log('new signup: ')
                let { registeredVoter, name, address} = input
                console.log({ registeredVoter, name, address})
                let model = new Signature(input)
                await model.save()
                return model.transform
            }
        }
    }

    static get mutation(){
        return `
            createSignature(input: SignatureCreate): Signature
        `
    }

    static get query(){
        /**
            signatures: [Signature]
            signature(id: ObjectID): Signature
         */
        return `
            signatureCount: Int
            signaturesPastWeek: Int
        `
    }

    static get graph(){
    return `
        type Signature {
            _id: ObjectID
            registeredVoter: Boolean
            signature: String
            address: String
            name: String
        }

        input SignatureCreate {
            registeredVoter: Boolean!
            signature: String!
            address: String!
            name: String!
        }
        `
    }
}

module.exports = Signature