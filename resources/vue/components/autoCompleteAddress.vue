<template>
        <formInput 
            type="text"
            name="name"
            :vmodel.sync="inputData"
            placeholder="Full Address"
            :undertext="undertext"
            ref="autocomplete"
            :v="v"
            :error="error"
        />
</template>

<script>
import formInput from "vue/controls/input.vue"

const ADDRESS_COMPONENTS = {
    subpremise: "short_name",
    street_number: "short_name",
    route: "long_name",
    locality: "long_name",
    administrative_area_level_1: "short_name",
    administrative_area_level_2: "long_name",
    postal_code: "short_name",
    country: "long_name"
};

const CITIES_TYPE = ["locality", "administrative_area_level_3"];
const REGIONS_TYPE = [
    "locality",
    "sublocality",
    "postal_code",
    "country",
    "administrative_area_level_1",
    "administrative_area_level_2"
];

export default {
    components: {
        formInput
    },
    props: ['vmodel', 'placeholder', 'undertext', 'types', 'country', 'enableGeolocation', 'geolocationOptions', 'error', 'v'],
    data(){
        return {
            focusVal: false,
            geolocation: {
                geocoder: null,
                loc: null,
                position: null
            }
        }
    },

    mounted: function() {
        const options = {};

        options.componentRestrictions = {
            country: ['au']
        }

        this.autocomplete = new google.maps.places.Autocomplete(
            this.$refs.autocomplete.$refs.input,
            options
        );

        this.autocomplete.addListener("place_changed", this.onPlaceChanged);
    },

    methods: {
        
        toggleFocus(val){
            this.focusVal = val ? val : !this.focusVal
            if(this.focusVal === true){
                this.$refs.autocomplete.$refs.input.focus()
            }
        },
        /**
         * When a place changed
         */
        onPlaceChanged() {
            let place = this.autocomplete.getPlace()

            if (place.formatted_address) {
                this.$emit("update:vmodel", place.formatted_address)
            }
        },

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
};
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
}
</style>
