<template>
    <parent>
        <template slot="title">Learn About Arkovia</template>
        <template slot="description">Learn about Arkovia, our government, vision and purpose</template>
        <template slot="content">
            <hero class="colored padding-medium align-center">
                <div class="inner-hero">
                    <h1>Learn About Arkovia</h1>
                </div>
            </hero>
            <hero class="padding-none">
                <div class="inner-hero">
                    <div class='flex flex-center-all wrap row'>
                        <boxcard href="/learn/vision">
                            <h2 class="bold">Our Vision</h2>
                        </boxcard>
                        <boxcard href="/learn/vision">
                            <h2 class="bold">Our Vision</h2>
                        </boxcard>
                        <boxcard href="/learn/vision">
                            <h2 class="bold">Our Vision</h2>
                        </boxcard>
                        <boxcard href="/learn/vision">
                            <h2 class="bold">Our Vision</h2>
                        </boxcard>
                        <boxcard href="/learn/vision">
                            <h2 class="bold">Our Vision</h2>
                        </boxcard>
                    </div>
                </div>
            </hero>
        </template>
    </parent>
</template>
<script>
import parent from "vue/layouts/parent.vue"
import hero from "vue/layouts/hero.vue"
import boxcard from "vue/components/box-card.vue"

export default {
    components: {
        hero,
        parent,
        boxcard
    },
}
</script>
<style lang="stylus" scoped>

</style>