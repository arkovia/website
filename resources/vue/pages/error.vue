<template>
    <parent>
        <template slot="title">Error {{code}}</template>
        <template slot="content">
            <hero class="colored padding-medium align-center">
                <div class="inner-hero">
                    <h2 class="code">{{ code }}</h2>
                    <div class="description">{{ getDescription }}</div>
                </div>
            </hero>
            <hero v-if="error" class="light padding-none">
                <div class="inner-hero">
                    <div class="flex-center">
                        <card class="padding-medium">
                            <h4>{{ `${error.name}: ${error.message }`}}</h4>
                            <div v-for="err in error.stack" :key="err">
                                <p>{{ err }}</p>
                            </div>
                        </card>
                    </div>
                </div>
            </hero>
        </template>
    </parent>
</template>
<script>
import parent from "vue/layouts/parent.vue"
import buttonspecial from "vue/controls/button-special.vue"
import hero from "vue/layouts/hero.vue"
import card from "vue/components/card.vue"

export default {
    data: () => ({
        error: undefined,
        code: 500
    }),
    components: {
        hero,
        parent,
        card
    },
    computed: {
        getDescription() {
            if (this.code === 404) return "Oops, this page was not found."
            return "A Server Error Occured"
        }
    }
}
</script>
<style lang="stylus" scoped>
.description {
    font-size: 2em
    font-weight: 200
}
</style>