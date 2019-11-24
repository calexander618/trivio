<template>
    <div class="" id="dashboard">
        <page-header :loggedIn="true"></page-header>
        <page-nav></page-nav>
        <div id="dashboard-content">
            <transition name="slide" mode="out-in">
            <router-view></router-view>

            </transition>
        </div>
    </div>
</template>

<script>
import PageHeader from '../components/PageHeader.vue';
import PageNav from '../components/PageNav.vue';

export default {
    name: 'dashboard', 
    components: {
        PageHeader, 
        PageNav
    }
}
</script>

<style scoped>
    .slide-enter-active, .slide-leave-active {
        transition: transform .25s ease, opacity .2s ease;
    }

    .slide-enter-to, .slide-leave {
        transform: translateY(0);
        opacity: 1;
    }

    .slide-enter, .slide-leave-to {
        opacity: 0;
        transform: translateY(-100px);
    }
</style>