<template>
    <master>
        <template slot="title"><slot name="title"></slot></template>
        <template slot="content">
            <div class="body-flex-container">
                <header-component></header-component>
                <div class="content">
                    <slot name="content"/>
                </div>
            </div>
        </template>
        <template slot="head">
            <slot name="head"></slot>
        </template>
    </master>
</template>
<script>
import master from "vue/layouts/master.vue"
import header from "vue/layouts/includes/header.vue"

export default {
    components: {
        master,
        "header-component": header
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
