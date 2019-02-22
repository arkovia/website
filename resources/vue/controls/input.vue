<template>
    <div>
        <div @click="toggleFocus(true)" class="input" :class="{ 
            'focus': focus,
            'content': !['', undefined].includes(this.vmodel),
            'error': !!error}">
            <template v-if="type === 'select'">
                <select
                    @blur="toggleFocus(false)"
                    @focus="toggleFocus(true)"
                    :type="type"
                    :name="name"
                    ref="input"
                    v-model="inputData">
                    <slot/>
                </select>
            </template>
            <template v-else>
                <input
                    @blur="toggleFocus(false)"
                    @focus="toggleFocus(true)"
                    :type="type"
                    :name="name"
                    ref="input"
                    v-model="inputData"
                    placeholder="">
            </template>
            <div class="label">{{ placeholder }}</div> 
            <div class="border"></div>
        </div>
        <template v-if="undertext !== undefined || error">
            <div class='under-text' :class="{ 'error': !!error }">{{ error ? error : undertext }}</div>
        </template>
    </div>
</template>
<script>
export default {
    props: ['type', 'name', 'vmodel', 'placeholder', 'undertext', 'error', 'v'],
    data: () => ({
        focus: false
    }),
    methods:{
        toggleFocus(val){
            if(val === false && this.v){
                this.v.$touch()
            }
            this.focus = val ? val : !this.focus
            if(this.focus === true){
                this.$refs.input.focus()
            }
        }
    },
    computed:{
        inputData:{
            get(){
                return this.vmodel
            },
            set(value){
                this.$emit("update:vmodel", value)
            }
        }
    }
}
</script>
<style lang="stylus" scoped>
@import "~stylus/variables.styl"

.input{
    margin-top: 5px;
    margin-bottom 5px;
    caret-color: darken($theme1, 10%)
    position relative
    input, select{
            outline 0
            border: 0
            width: 100%
            font-size 16px
            background: #eee
            border-top-left-radius: 4px
            border-top-right-radius: 4px
            padding-left 12px
            padding-right 12px
            padding-top 22px
            padding-bottom 6px
            appearance: none;
    }
    .label{
        font-size 16px
        padding-bottom 4px;
        position: absolute
        top: 14px
        color: #777
        padding-left 12px
        transition:top 0.1s ease;
        transition:font-size 0.1s linear;
    }
    .border{
        border-top 1px solid #bbb
        border-bottom 1px solid rgba(0,0,0,0)
    }
    &.content{
        .label{
            font-size 13px
            top: 6px
        }
    }
    &.focus{
        .label{
            color: darken($theme1, 10%)
            font-size 13px
            top: 6px
        }
        .border{
            border-top: 1px solid $theme1
            border-bottom 1px solid $theme1
        }
    }
    &.error{
        .label{
            color: #bb2222
        }
        .border{
            border-top: 1px solid #bb2222
            border-bottom 1px solid #bb2222
        }
    }
}

.under-text{
    font-size 12px
    padding-left 10px
    color: #777
    padding-bottom 5px;
    &.error {
        color: #bb2222
    }
}
</style>
