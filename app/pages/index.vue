<template>
    <div>
        This is my landing page
        <hr />
        <nav>
            <NuxtLink v-if="user == null" to="/login">Login</NuxtLink>
            <NuxtLink v-else to="/logout">Logout</NuxtLink>
            <br />
            <NuxtLink to="/chats">Chats</NuxtLink>
        </nav>
    </div>
</template>

<script setup lang="ts">
    const user = useSupabaseUser();
</script>
