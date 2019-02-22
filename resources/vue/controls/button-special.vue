<template>
    <a class="button-special">
        <slot></slot>
    </a>
</template>
<style lang="stylus" scoped>
@import "~stylus/variables"

.button-special{
    display flex
    padding 10px 20px
    background linear-gradient(90deg, #00C186, #008CCB)
    font-size 1em
    cursor pointer
    color: white
    font-weight: 600
    border-radius 4px
    text-decoration none
    &.margin{
        margin: 4px
    }
}
</style>