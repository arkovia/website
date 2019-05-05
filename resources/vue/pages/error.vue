<template>
    <parent>
        <template slot="title">Error {{code}}</template>
        <template slot="content">
            <hero class="colored padding-medium align-center">
                <div class="inner-hero">
                    <h1 class="code">{{ code }}</h1>
                    <div class="description">{{ getDescription }}</div>
                </div>
            </hero>
            <hero v-if="error" class="light padding-none">
                <div class="inner-hero">
                    <div class="flex-center">
                        <card class="padding-medium">
                            <div>
                                <h2>Message</h2>
                                <pre class="errorTrace">
                                    {{ error.message }}
                                </pre>
                            </div>
                            <div v-if="error.stack">
                                <h2>Stack Trace</h2>
                                <pre class="errorTrace">
                                    {{ error.stack.join('\n') }}
                                </pre>
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
.errorTrace{
    background #080a18;
    color: rgba(255,255,255,0.8)
    padding: 8px
    border-radius: 4px
    overflow overlay
}
.description {
    font-size: 2em
    font-weight: 200
}
</style>