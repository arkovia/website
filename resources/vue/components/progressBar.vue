<template>
    <div class="progress-bar-container">
        <div class="maximum">
            <div :style="{ width: `${current < max ? current / max * 100 : 100}%` }" class="current">
                <div class="text-content">{{ Math.round(current / max * 100) + "%" }}</div>
            </div>
        </div>
    </div>    
</template>
<script>
export default {
    props: ['max', 'current']
    
}
</script>
<style lang="stylus" scoped>
    .progress-bar-container{
        width: 100%
        padding 10px
        padding-bottom 0
        color: #222
        display flex
        flex 1 0 auto
        justify-content center
    }
    .maximum{
        background rgba(0,0,0,0.6)
        flex: 1 0 auto
        max-width 500px
        height 28px
        border-radius 20px
        position relative
        box-shadow 0 2px 4px 0px rgba(0,0,0,0.2)
        .current {
            left: 0
            position relative
            border-radius 20px
            height 28px
            background #eee
            display flex
        }
    }

    .text-content{
        display flex
        right: 10px
        font-size 1.3em
        font-weight 800
        position absolute
        align-items center
        height: 100%
    }

</style>
