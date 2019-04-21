<template>
    <header>
        <div class="logo">
            myArk
        </div>
        <div class="end control-icons">
            <div class="control-group">
                <a href="#" class="control-icon">
                    <i class="material-icons">settings</i>
                </a>
                <a href="#" class="control-icon">
                    <i class="material-icons">notifications_active</i>
                </a>
            </div>
            <div class="control-group">
                <a class="user">
                    <div class="user-inner">
                        D
                    </div>
                </a>
            </div>
        </div>
    </header>
</template>
<style lang="stylus" scoped>
header{
    background white
    box-shadow 0 0 2px 0 rgba(0,0,0,0.2)
    display flex
    height 60px
    .logo{
        font-size 2.3em;
        color #003B77
        font-weight bold
        margin-left: 20px
        display flex
        align-items center
    }

    .user{
        color: white
        font-weight bold
        font-size 1.2em
        margin 2px
        padding 3px
        .user-inner{
            display flex
            justify-content center
            align-items center
            background #db661c;
            height 35px
            width 35px
            border-radius: 100px
        }
        &:hover{
            background rgba(0,0,0,0.075)
            border-radius 50px
        }
    }

    .vertical-ruler{
        border-left 1px solid #ccc;
        margin 10px;
    }

    .control-icons {
        display flex
        justify-content center
        align-items center
    }

    .control-icon {
        font-size 1.3em
        color #444
        padding 5px
        margin 3px
        display flex
        border-radius: 50px
        &:hover{
            background rgba(0,0,0,0.075)
        }
    }

    .control-group {
        margin: 0 12px
        display flex
        align-items center
    }
}
</style>
