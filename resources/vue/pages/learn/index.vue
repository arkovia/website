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
            <hero v-if="error" class="light padding-none">
                <div class="inner-hero">
                    <div class='flex-center'>
                        
                    </div>
                </div>
            </hero>
        </template>
    </parent>
</template>
<script>
import parent from "vue/layouts/parent.vue"
import hero from "vue/layouts/hero.vue"
import card from "vue/components/card.vue"

export default {
    components: {
        hero,
        parent,
        card
    },
}
</script>
<style lang="stylus" scoped>

</style>