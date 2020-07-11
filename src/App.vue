<style lang="scss" scoped>
    .calculator-app{

    }
</style>

<template>
    <main class="calculator-app">
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
