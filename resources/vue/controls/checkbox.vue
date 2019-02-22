<template>
    <div class="container">
        <div 
            @click="toggleCheck();"
            class="checkbox"
            :class="checked ? 'checked' : ''">
            <div class="inner"></div>
        </div>
        <div class="label">{{ placeholder }}</div> 
    </div>
</template>
<script>
export default {
    props: ["checked", "placeholder"],
    methods: {
        toggleCheck() {
            this.$emit("update:checked", !this.checked)
        }
    }
}
</script>
<style lang="stylus" scoped>
    .inner {
        height 16px
        width 16px
        background #fff
        border-radius: 20px;
        transition margin-left 0.2s
    }

    .label{
        padding-left 5px
        font-size 0.9em
        font-weight: 500
    }

    .checkbox {
        padding: 2px;
        cursor pointer
        width 38px
        height 20px
        background #555
        border-radius: 20px;
        cursor: pointer;
        margin: 4px 0
        &.checked{
            background #3b3
            .inner{
                margin-left: 18px;
            }
        }
    }

    .container{
        margin: 10px 0
        display flex
        align-items center
    }
</style>


