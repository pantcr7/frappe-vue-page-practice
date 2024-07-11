<template>
    <div class="bg-gray-200">
      <NavBar />
      <SideBar :class="{ collapsed: !sidebarState.isOpen }"/>
    </div>
  </template>
  
  <script setup>
  import Header from './components/Header.vue';
  import SideBar from './components/SideBar.vue';
  import TicketList from './components/TicketList.vue';
  import NavBar from './components/NavBar.vue';
  
  import { sidebarState } from './state/sidebarState.js'; // import the sidebar state
  
  // You can use the sidebar state here if needed
  </script>
  