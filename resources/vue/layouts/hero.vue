<template>
    <div class="hero" :style=heroImage>
        <slot/>
    </div>
</template>
<script>
export default {
    props: ['img'],
    computed:{
        heroImage(){
            if(!this.img) return {}
            return {
                "background-image": `url('${this.img}')`
            }
        }
    }
}
</script>
<style lang="stylus" scoped>
@import "~stylus/variables"
.hero{
    background: transparent
    &.colored{
        background: darken($theme1, 30%)
        color: white
    }
    &.img{
        background: #222;
        color: white
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
    }
    &.dark{
        background: #001123
        color: white
    }
    .inner-hero{
        margin: auto 
        max-width $desktop
        width: 100%
        &.page {
            background: white;
            box-shadow: 0 0 4px 0 rgba(0,0,0,0.25)
            padding: 20px 50px;
            @media (max-width: $laptop) {
                padding: 20px 40px;
            }
            @media (max-width: $tablet) {
                padding: 10px;
            }
        }
        &.larger-text {
            font-size: 1.2em;
            @media (max-width: $tablet) {
                font-size: 1.1em;
            }
        }
        &.padding-none {
            padding 10px
        }
        &.padding-tiny {
            padding 20px
        }
        &.padding-small{
            padding 5vh 10px
        }
        &.padding-medium {
            padding 10vh 10px
        }
        &.padding-large {
            padding 15vh 10px
        }
        &.padding-huge {
            padding 26vh 10px
        }
    }
    &.padding-none {
        padding 10px
    }
    &.padding-tiny {
        padding 20px
    }
    &.padding-small{
        padding 5vh 10px
    }
    &.padding-medium {
        padding 10vh 10px
    }
    &.padding-large {
        padding 15vh 10px
    }
    &.padding-huge {
        padding 26vh 10px
    }
}
</style>

