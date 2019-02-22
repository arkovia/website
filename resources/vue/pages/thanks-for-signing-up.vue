<template>
    <colored>
        <template slot="title">Thanks</template>
        <template slot="content">
            <div class="flex-center padding-top-desktop">
                <div style="width: 100%">
                    <div style="justify-content: center; font-size: 1.3em; padding-top: 10px; color: #fff; display: flex; font-weight: 800">
                        <div style="color: #5f5; padding-right: 5px">+ {{ signaturesPastWeek }}</div>
                        <div>this week</div>
                    </div>
                    <progressBar :current="800 + signatureCount" :max="1000"/>
                </div>

                <card class="medium padding-medium">
                    <div class="flex-column">
                        <div class="center">
                            <h1 class="light">Thanks for becoming a supporter</h1>
                            <p class="small-text">
                                We only need <strong>{{(200 - signatureCount) > 0 ? 200 - signatureCount : 0}} more signatures</strong> from enrolled voters to register our party.
                            </p>
                            <p class="small-text">
                                Share this link with one or two of your friends!
                            </p>
                            <a href="https://future.org.au/supporter-signup">https://future.org.au/supporter-signup</a>
                            <div class="margin-top-bottom align-center">
                                <buttonround :locked="copied" @click.native="copy">{{ copied ? "Copied" : "Copy Link"}}</buttonround>
                            </div>
                        </div>
                    </div>
                </card>
            </div>
        </template>
    </colored>
</template>
<script>
import colored from "vue/layouts/colored.vue"
import card from "vue/components/card.vue"
import buttonround from "vue/controls/button-round.vue"
import formInput from "vue/controls/input.vue"
import progressBar from "vue/components/progressBar.vue"

export default {
    components: {
        colored,
        card,
        formInput,
        buttonround,
        progressBar
    },
    data: () => ({
        copied: false
    }),
    methods: {
        copy(){
            this.copied = true

            var textArea = document.createElement("textarea");

            textArea.style.position = 'fixed';
            textArea.style.top = 0;
            textArea.style.left = 0;
            textArea.style.width = '2em';
            textArea.style.height = '2em';
            textArea.style.padding = 0;
            textArea.style.border = 'none';
            textArea.style.outline = 'none';
            textArea.style.boxShadow = 'none';
            textArea.style.background = 'transparent';
            textArea.value = "https://future.org.au/supporter-signup";
            document.body.appendChild(textArea);
            textArea.select();
            var successful = document.execCommand('copy');
            document.body.removeChild(textArea);
        }
    }
};
</script>
<style lang="stylus" scoped>
@import '~stylus/variables.styl'

.button {
    display: flex
    cursor: pointer
    font-weight: bold
    color: $theme1
    text-align: center
}

.top-input {
    padding: 8px
    font-size: 0.9em
    font-weight: bold
}

.padding-top-desktop {
    @media (min-width: $tablet) {
        padding-top: 50px
    }
}

.error {
    color: #a22
}

.error {
    font-size: 12px
    padding-left: 10px
    color: #d22
    padding-bottom: 5px
}
</style>