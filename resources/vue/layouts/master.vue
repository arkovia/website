<template>
    <servue>
        <template slot="content">
            <slot name="content"></slot>
        </template>
        <template slot="head">
            <title>{{ title }}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta name="theme-color" content="#009CB5">
            <meta name="description" :content="description">
            <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,400i,500,700" rel="stylesheet">
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
            <slot name="head"></slot>
        </template>
    </servue>
</template>
<script>
import servue from "servue.vue";

export default {
    created(){
        if(this.$isServer){
            this.$ssrContext.htmlattr = 'lang="en"'
        }
    },
    components: {
        servue
    },
    computed: {
        title(){
            return this.$slots.title ? this.$slots.title[0].text + ' - Future Aus' : 'Future Aus' 
        },
        description(){
            return this.$slots.description ? this.$slots.description[0].text : 'Australia\'s newest party - the viable alternative'
        }
    }
}
</script>
<style lang="stylus">
@import "../../stylus/app"

#app, body, html{
    height 100%
}

#app{
    display flex
    flex-direction column
}

</style>