<template>
    <master>
        <template slot="title"><slot name="title"/></template>
        <template slot="content">
            <div class="body-flex-container">
                <headerComponent/>
                <div class="content">
                    <slot name="content"/>
                </div>
                <footerComponent/>
            </div>
        </template>
        <template slot="head">
            <slot name="head"/>
        </template>
    </master>
</template>
<script>
import master from "vue/layouts/master.vue"
import headerComponent from "vue/layouts/includes/header.vue"
import footerComponent from "vue/layouts/includes/footer.vue"

export default {
    components: {
        master,
        headerComponent,
        footerComponent
    },
}
</script>
<style lang="stylus" scoped>

.content-container{
    flex 1 0 auto
}

.content{
    flex 1 0 auto
    display flex
    flex-direction column
}

.body-flex-container{
    display flex
    flex-direction column
    height: 100%
}
</style>
