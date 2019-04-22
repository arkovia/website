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
import Vue from "vue"

let state = Vue.observable({
    me: {
        firstName: null,
        lastName: null,
        email: null,
        username: null,
        displayPicture: null
    }
})

Vue.mixin({
    beforeCreate(){
        this.$state = state
        this.$ssrContext.state = state
    }
})


export default {
    async serverPrefetch(){
        let { ctx } = this.$ssrContext
        let { token } = ctx.state
        
        let { data, errors } = await gqlreq(`{
            me {
                firstName
                lastName
                email
                username
                displayPicture
            }
        }`, token)

        if(errors) console.log(errors)

        this.$state.me = data.me
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
