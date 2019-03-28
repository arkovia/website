<template>
    <a class="box-card">
        <slot>
            
        </slot>
    </a>
</template>

<style lang="stylus" scoped>
@import "~stylus/variables"

.box-card{
    background: white;
    padding: 15px;
    margin: 10px
    border 0
    border-top #077CA8 6px solid
    box-shadow 0 2px 5px 0 rgba(0,0,0,0.2)
    max-width: 350px
    flex: 1 0 100%
    color: #222
    h2{
        overflow-wrap: break-word
        color: #077CA8
        margin 5px 0
        font-size 20px
    }
}
</style>

