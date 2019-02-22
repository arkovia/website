<template>
    <a class="nav-link" :href="href" :class="{ active: isActive() }"><slot></slot></a> 
</template>
<script>
export default {
    props: ['href'],
    methods: {
        isActive(){
            if(this.$isServer) return false
            return window.location.pathname === this.href
        }
    },
    mounted(){
        this.$forceUpdate()
    }
}
</script>
<style lang="stylus" scoped>
@import "~stylus/variables"


.nav-link{
    color: darken($theme1, 15%)
    border-bottom 3px solid rgba(0,0,0,0)
    cursor pointer
    box-sizing: border-box
    padding: 14px 14px
    padding-bottom: 10px
    display: flex
    text-decoration: none
    font-weight: 600
    font-size 1.2em
    
    &.active{
        border-bottom 3px solid darken($theme1, 15%)
    }
    &:hover{
        border-bottom 3px solid darken($theme1, 25%)
    }
    &:active{
        border-bottom 3px solid darken($theme1, 25%)
    }

    @media (max-width: $tablet) {
        border-bottom: 1px solid #eee;
        &.active, &:hover, &:active{
            border-bottom: 1px solid #eee;
        }
    }

    &.menu{
        font-size 1.5em
        border: 0
        border-bottom: 3px solid rgba(0,0,0,0)
        display none
        @media(max-width: $tablet){
            display flex
        }
    }
}
</style>


