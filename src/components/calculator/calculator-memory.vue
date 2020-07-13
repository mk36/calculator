<style lang="scss">
.calculator-memory{
    width: $calculator-width;
    height: 300px;
    @include positioningOffset(absolute, 130px, unset, unset, 0);
    color: white;
    background-color: rgba(0,0,0,0.8);
    z-index: $z-index-modal;
    transition: transform ease 0.3s;
    transform: translateX(-105%);
    text-align: right;
    overflow-y: auto;

    &.open{
        transform: translateX(0);
    }

    &__row{
        @include paddingBorderBox(15px);
        border-bottom: solid 1px white;
        cursor: pointer;

        &:hover{
            color: $blue;
        }
    }
}
</style>

<template>
    <ul class="calculator-memory" :class="{'open': open}">
        <li class="calculator-memory__row" @click="$emit('addMemoryToEquation', item)" v-for="(item, index) in memory" :key="index">{{item}}</li>
    </ul>
</template>

<script>
    export default {
        components: {},
        props: {
            memory: Array,
            open: Boolean
        },
        data: function(){
            return{
                test: ''
            }
        },
        mounted: function () {
            this.setUp();
        },
        methods: {
            setUp: function () {

            }
        }
    }
</script>
