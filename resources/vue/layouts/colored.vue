<template>
    <master>
        <template slot="title"><slot name="title"/></template>
        <template slot="head">
            <slot name="head"/>
        </template>
        <template slot="content">
            <div class="colored">
                <slot name="content"/>
            </div>
        </template>
    </master>
</template>
<script>
import master from "vue/layouts/master.vue"

export default {
    components: {
        master,
    }
}
</script>
<style lang="stylus" scoped>
@import "~stylus/variables.styl"

.colored {
    background linear-gradient(35deg, #0E6F88, #1A8F54)
    flex 1 0 auto
}
</style>