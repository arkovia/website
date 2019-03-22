<template>
    <div class="card">
        <slot>
            
        </slot>
    </div>
</template>
<style lang="stylus" scoped>
@import "~stylus/variables"

.card{
    background: white;
    padding: 10px;
    margin: 10px
    max-width $desktop
    border 0
    border-top $theme1 4px solid
    box-shadow 0 0 5px 0 rgba(0,0,0,0.2), 0 3px 5px 0 rgba(0,0,0,0.2)
    width: calc(100% - 20px)
    &.padding-medium{
        padding: 15px;
    }
    &.medium {
        max-width 500px;
    }
    &.padding-large {
        padding 20px
    }
    &.padding-none {
        padding 0
    }

    > .inner-card {
        padding 20px
    }

    + .card {
        margin-top 0
    }
}

.gradient-top{
    background linear-gradient(90deg, #04899f, #1eb481)
    display flex
    justify-content center
    align-items center
    color white
    font-size 2em
    font-weight 700
    width 100%
    border-top-left-radius 4px
    border-top-right-radius 4px
    img{
        width 48px
        padding 6px
    }
}
</style>

