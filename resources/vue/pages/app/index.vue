<template>
    <members>
        <template slot="title">Members</template>
        <template slot="content">
            <h2>Hello {{ firstName }} </h2>
            
        </template>
    </members>
</template>
<script>
import members from "vue/layouts/members.vue"
import grapher from "utils/grapher.js"

export default {
    async asyncData(ctx){
        let token = ctx.state.token
        
        let { data, errors } = (await grapher.request(`{
            me {
                firstName
                lastName
                email
                username
            }
        }`, token))

        if(errors) console.log(errors)

        return data
    },
    components: {
        members
    }
}
</script>
