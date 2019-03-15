<template>
    <parent>
        <template slot="title">Error {{code}}</template>
        <template slot="description">Test</template>
        <template slot="content">
            <hero class="colored padding-medium align-center">
                <h2 class="code">{{ code }}</h2>
                <div class="description">
                    {{ getDescription }}
                </div>
            </hero>
            <hero v-if="error" class="light padding-none">
                <div class='flex-center'>
                    <card class="padding-medium">
                        <h4>{{ `${error.name}: ${error.message }`}}</h4>
                        <div v-for="err in error.stack" :key="err">
                            <p>{{ err }}</p>
                        </div>
                    </card>
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
    data:() => ({
        error: undefined,
        status: 500
    }),
    components: {
        hero,
        parent,
        card
    },
    computed:{
        getDescription(){
            if(this.code === 404) return "Oops, this page was not found."
            return "An Server Error Occured"
        }
    }
}
</script>
<style lang="stylus" scoped>

.description{
    font-size 2em;
    font-weight 200;
}

</style>