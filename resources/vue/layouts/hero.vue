<template>
    <div class="hero" :style=heroImage>
        <slot></slot>
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
        background: #333
        color: white
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
    }
    .inner-hero{
        margin: auto 
        max-width $desktop
        width: 100%
        &.padding-none {
            padding 10px
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

