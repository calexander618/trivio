<template>
    <div id="page-not-found">
        <page-header></page-header>
        <page-nav></page-nav>
        <h1>404</h1>
        <h2>Page Not Found...</h2>
        <button @click="redirectPage()">Return to Dashboard/Login</button>
    </div>
</template>

<script>
import PageHeader from '../components/PageHeader.vue';
import PageNav from '../components/PageNav';
export default {
    name: 'pagenotfound', 
    components: {
        PageNav, 
        PageHeader
    }, 
    methods: {
        redirectPage() {
            this.$router.push('/dashboard/lobbyentry');
        }
    }
}
</script>

<style scoped>
#page-not-found {
    font-family: 'Roboto';
    display: flex;
    flex-direction: column;
}

h1, h2 {
    color: #11111166;
}

h1 {
    font-size: 6rem;
    text-align: center;
    margin-top: 4rem;
}

h2 {
    margin-top: 1rem;
    font-size: 3rem;
    text-align: center;
}

button {
    padding: 10px 20px;
    background-color: white;
    border: none;
    border-radius: 1px;
    box-shadow: 2px 2px 5px 0 #11111155;
    margin: auto;
    transition: background-color .2s ease;
}

button:hover {
    background-color: #e5e5e5;
    cursor: pointer;
}
</style>
