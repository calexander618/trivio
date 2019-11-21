<template>
    <div class="" id="dashboard">
        <page-header :loggedIn="true"></page-header>
        <page-nav></page-nav>
        <div id="dashboard-content">
            <router-view></router-view>
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