<template>
    <master>
        <template slot="title"><slot name="title"/></template>
        <template slot="content">
            <div class="body-flex-container">
                <headerComponent/>
                <div class="content">
                    <slot name="content"/>
                </div>
            </div>
        </template>
        <template slot="head">
            <slot name="head"/>
        </template>
    </master>
</template>
<script>
import master from "vue/layouts/master.vue"
import headerComponent from "vue/layouts/includes/app/header.vue"
import { gqlreq, inputify } from "utils/grapher"
import statizer from "statizer"

statizer({
    token: null,
    me: {
        firstName: null,
        lastName: null,
        email: null,
        username: null,
        displayPicture: null
    }
})

export default {
    async serverPrefetch(){
        let { ctx } = this.$ssrContext
        
        let { data, errors } = await gqlreq(`{
            me {
                firstName
                lastName
                email
                username
                displayPicture
            }
        }`, ctx)

        if(errors) throw errors

        this.$state.me = data.me
        this.$state.token = ctx.state.token
    },
    components: {
        master,
        headerComponent
    },
}
</script>
<style lang="stylus" scoped>
.content{
    flex 1 0 auto
}

.body-flex-container{
    display flex
    flex-direction column
    height: 100%
}
</style>
