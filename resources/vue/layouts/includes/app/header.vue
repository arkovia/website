<template>
    <header>
        <div class="logo">
            myArk
        </div>
        <div class="end control-icons">
            <div class="control-group">
                <a class="control-icon">
                    <i class="material-icons">settings</i>
                </a>
                <a class="control-icon">
                    <i class="material-icons">notifications_active</i>
                </a>
            </div>
            <div class="control-group">
                <a @click="openUserMenu()" class="user">
                    <img :src="$state.me.displayPicture" class="profile-pic">
                </a>
                <div :class="{openedMenu}" class="popout">
                    <div class="popout-area">
                        <div class="row">
                            <img :src="$state.me.displayPicture" class="profile-pic-large">
                            <div class="profile-info">
                                <div>
                                    <strong>{{ `${$state.me.firstName} ${$state.me.lastName}` }}</strong>
                                </div>
                                <div>
                                    <span class="email-info">{{ $state.me.email }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="popout-button-area">
                        <a class="popout-bottom-button disabled">Add Account</a>
                        <a class="popout-bottom-button" @click="signOut()">Sign Out</a>
                    </div>
                    
                </div>
            </div>
        </div>
    </header>
</template>
<script>
import { inputify, gqlreq, setCookie } from "utils/grapher"
import buttonSpecial from "vue/controls/button-special.vue"

export default {
    data(){
        return {
            openedMenu: false
        }
    },
    components: {
        buttonSpecial
    },
    methods: {
        openUserMenu(){
            this.openedMenu = !this.openedMenu
        },
        async signOut(){
            let token = this.$state.token

            let { data, errors } = await gqlreq(`mutation {
                signOut(input: ${inputify({token})})
            }`, token)

            if(errors) throw new Error(errors)

            if(data.signOut === false) { return }

            setCookie('token', '')
            window.location = '/'
        }
    }
}
</script>

<style lang="stylus" scoped>
.popout{
    display none
    flex-direction column
    top 45px
    right: 0
    border-radius 4px
    width 100%
    max-width 350px
    margin 10px
    position absolute
    background #ffffff
    box-shadow 0 0 4px 1px rgba(0,0,0,0.2)
    &.openedMenu{
        display flex
    }
}

.profile-info{
    padding: 8px;
    padding-left: 10px;
    flex: 1
}

.email-info{
    font-size 13px
}

.profile-pic-large{
    height 75px
    margin: 5px
}

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
        display flex
        position relative
        .profile-pic{
            height 35px
            width 35px
            border-radius: 100px
        }
        &:hover{
            background rgba(0,0,0,0.1)
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

.popout-area {
    padding: 10px;
}

.popout-button-area {
    display flex
    .popout-bottom-button {
        flex 1 0 auto
        background #eee
        color: #258
        font-weight bold
        padding 10px
        display flex
        justify-content center
        align-items center
        border: 1px solid #ddd;
        +.popout-bottom-button {
            border-left: 0;
        }
        &:last-child{
            border-bottom-right-radius: 3px
        }
        &:first-child{
            border-bottom-left-radius: 3px
        }
        &.disabled{
            cursor default
            color: #777
        }
    }
}
</style>
