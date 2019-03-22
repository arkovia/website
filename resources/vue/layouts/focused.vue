<template>
    <master>
        <template slot="title"><slot name="title"></slot></template>
        <template slot="content">
            <div class="body-flex-container">
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

export default {
    components: {
        master,
    },
}
</script>
<style lang="stylus" scoped>
.content{
    flex 1 0 0
    display flex
    flex-direction column
}

.body-flex-container{
    display flex
    flex-direction column
    height: 100%
}
</style>
