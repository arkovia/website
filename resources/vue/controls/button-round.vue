<template>
    <a class="button-round" :class="{ locked: locked }">
        <slot></slot>
    </a>
</template>
<script>
export default {
    props: ['locked']
}
</script>

<style lang="stylus" scoped>
@import "~stylus/variables"

.button-round{
    display inline-block
    padding 8px 18px
    background $theme1
    color: white
    font-weight: 700
    border-radius 20px
    text-decoration none
    cursor pointer
    &.margin{
        margin: 4px
    }
    &.locked {
        cursor default
        background #888
    }
}

.margin-sides{
    margin: 0 4px
}

.white{
    background: white
    color: #1EB481
}

.trans-white{
    background: none
    box-shadow:inset 0 0 0 2px white
    color: white
}
.trans-color {
    background: none
    box-shadow:inset 0 0 0 2px $theme1
    color: $theme1
}
</style>

