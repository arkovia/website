<template>
    <div :style='{ width: this.width }' class="container">
        <div class="label" :class="{ 'error': hasError() }">Signature</div>
        <a @click="clearSignature()" class="clear">Clear</a>
        <div :class="{ visible: visibleWatermark }" class="pencil"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABHNCSVQICAgIfAhkiAAAAqhJREFUaIHd2L2LE0EYx/Hv5IXLwYIQUE4RvOIKG7urAhcvssuF09LWyhfQysb/QAQrOwUFO5vDQpQ7cmwxkuBLccWBCGdnr0QQRchMdmwux5oXN7vZJLP3K2efZ3Y+zAwLK7A0jUbjdD6ff2iMuSKE+CqEeOC67stR9WKWixs3UsolrfVH4Fzfo1ue5z0b1pOb/rLipdlsnlRKtRhEADz1ff/msD6rdqTRaJRzudw7IcT5iNKBnbEG4vv+CaAFXBiz5R+MFUdLSukAkvER0HfMrIAcRifoOcJYc7SklI5SalcIUUnQfnVuO3J4J45Sq9V+OY7jGmPex53LGHN/LhAp5Qpw4Pv+3fB4pVL54ziOC7yNOeWZmUOklCta6xawBDwahlFK1YmHeT3TO9KHCOeO53lPwgM7OzsLhULhjRDCi5j2SxAE1ZlBpJTLWusPDCJ6GcDs7e0V2+329iiMMeZzsVhcr9Vq32cCkVIuK6VaQoizEaVjY4wx+4uLi5fW1tZ+wAy+IzEQAI99378dHlhdXVXlcvkysN0bM8bsa60v9hAw5e9ITEQ41z3Pe943V0Fr/Qo4pZRyNzc3f4afTw0yAQLAADeGYTqdzsLGxsbv/oapQCZE9DIUMyqpQ1JC9GKEENdc130RVZjqZU8ZASCCILi3tbWVjyxM6YXTQAB86na76/V6vR1VmApk3ghIAWIDAiaE2IKACSA2ISAhxDYEJIDYiICYEFsREANiMwLGhNiOgDEgWUBABCQrCPgPJEsIGAHJGgKGQLKIgD5IVhEQgmQZAYeQrCMAxHFAAOSOAwIgdxwQkO5flLkhAAppTGKMOQiCYG4ISAFijDkolUrVarU6NwRMeLRCiG9pLShpEkNsQkBCiG0ISACxEQExIbYiIAbEZgTAX6flEY7QMTLkAAAAAElFTkSuQmCC" alt=""></div>
        <div :style='{ height: this.height, width: this.width }' class="input-signature">
            <canvas class="canvas" ref="signaturePadCanvas"></canvas>
        </div>
        <div class="border" :class="{ 'error': hasError() }"></div>
        <div class="under-text" :class="{ 'error': hasError() }">{{ error ? error : undertext }} </div>
    </div>
</template>
<script>
import SignaturePad from "signature_pad";

const DEFAULT_OPTIONS = {
    dotSize: (0.5 + 2.5) / 2,
    minWidth: 0.7,
    maxWidth: 2.5,
    backgroundColor: "rgba(0,0,0,0)",
    penColor: "#222",
};

const convert2NonReactive = observerValue =>
    JSON.parse(JSON.stringify(observerValue));


export default {
    name: "VueSignaturePad",
    props: ["vmodel", "undertext", "height", "width", "v", "error"],
    data: () => ({
        signaturePad: {},
        cacheImages: [],
        visibleWatermark: true,
        onResizeHandler: null,
    }),
    mounted() {
        const canvas = this.$refs.signaturePadCanvas
        const signaturePad = new SignaturePad(canvas, {
            ...DEFAULT_OPTIONS,
            onBegin: this.onStart,
            onEnd: this.onEnd
        });

        this.signaturePad = signaturePad

        this.onResizeHandler = this.resizeCanvas.bind(this)

        window.addEventListener("resize", this.onResizeHandler, false)

        this.resizeCanvas();
    },
    beforeDestroy() {
        if (this.onResizeHandler) {
            window.removeEventListener("resize", this.onResizeHandler, false);
        }
    },
    methods: {
        hasError(){
            if(!this.signaturePad.isEmpty) return false

            return this.v ? this.signaturePad.isEmpty() ? this.v.$error : false : false
        },
        modified(){
            let empty = this.signaturePad.isEmpty()

            if(empty === true && this.v){
                this.v.$touch()
            }
            
            empty ? this.visibleWatermark = true : this.visibleWatermark = false

            let value = this.signaturePad.isEmpty() ? undefined : this.signaturePad.toDataURL()
            this.$emit('update:vmodel', value)
        },
        onEnd(){
            this.modified()
        },
        onStart(){
            this.modified()
        },
        resizeCanvas() {
            const canvas = this.$refs.signaturePadCanvas;
            canvas.style.width ='100%';
            canvas.style.height='100%';
            canvas.width  = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        },
        undoSignature() {
            const { signaturePad } = this;
            const record = signaturePad.toData();

            if (record) {
                signaturePad.fromData(record.slice(0, -1));
            }

            this.modified()
        },
        fromDataURL(data) {
            return this.signaturePad.fromDataURL(data);
        },
        lockSignaturePad() {
            return this.signaturePad.off();
        },
        openSignaturePad() {
            return this.signaturePad.on();
        },
        getPropImagesAndCacheImages() {
            return this.propsImagesAndCustomImages;
        },
        clearCacheImages() {
            this.cacheImages = [];

            return this.cacheImages;
        },
        clearSignature() {
            this.signaturePad.clear();
            
            this.modified()
        }
    },
    computed: {
        propsImagesAndCustomImages() {
            const nonReactiveProrpImages = convert2NonReactive(this.images);
            const nonReactiveCachImages = convert2NonReactive(this.cacheImages);

            return [...nonReactiveProrpImages, ...nonReactiveCachImages];
        }
    }
};
</script>
<style lang="stylus" scoped>
@import "~stylus/variables"

canvas{
    z-index 4
    position relative
}
.input-signature{
    background #eeeeee
    border-top-left-radius 4px
    border-top-right-radius 4px
}

.label{
    padding-bottom 4px;
    position: absolute
    font-size 13px
    top: 6px
    color: #777
    padding-left 12px
    &.error{
        color: #b22
    }
}

.clear{
    z-index 5
    padding-bottom 4px;
    position: absolute
    font-size 13px
    top: 6px
    right: 0
    color: $theme2
    padding-right 12px
}

.border{
    border-bottom 1px solid transparent
    border-top 1px solid #ccc
    &.error{
        border-top 1px solid #b22
        border-bottom 1px solid #b22
    }
}

.under-text{
    font-size 12px
    margin-top: 5px
    padding-left 10px
    color: #777
    &.error {
        color: #bb2222
    }
}

.container{
    position relative
    margin-top: 5px;
    z-index 3
}

.pencil{
    position: absolute;
    height: 100%;
    width: 100%;
    top: -10px;
    display: none;
    align-items: center;
    justify-content: center;
    &.visible{
        display: flex;
    }
}

</style>
