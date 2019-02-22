<template>
    <div class="card">
        <slot>

        </slot>
    </div>
</template>
<style lang="stylus" scoped>
.card{
    background: white;
    padding: 10px;
    margin: 10px
    max-width $desktop
    border-radius 4px;
    box-shadow 0 0 5px 0 rgba(0,0,0,0.2), 0 3px 5px 0 rgba(0,0,0,0.2)
    width: calc(100% - 20px)
    &.padding-medium{
        padding: 15px;
    }
    &.medium {
        max-width 500px;
    }

    + .card {
        margin-top 0
    }
}
</style>

