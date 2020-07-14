<style lang="scss" scoped>
    .calculator-app{
        background: $greyWhite;
        @include flex(100%, flex, center, center);
        flex-direction: column;
        height: 100vh;

        h1{
            margin-bottom: 25px;
        }
    }
</style>

<template>
    <main class="calculator-app">
        <h1>Calculator</h1>
       <calculator></calculator>
    </main>
</template>

<script>
    import "./styles/styles.scss";
    import Calculator from './components/calculator/calculator';

    export default {
        name: 'App',
        components: {
            Calculator
        }
    }
</script>
