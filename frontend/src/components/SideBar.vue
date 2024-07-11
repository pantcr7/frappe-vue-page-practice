<template>
    <div class="lg:block bg-green-500 w-64 h-screen fixed rounded-none border-none" id="sideNav">
      <!-- Items -->
      <div class="p-4 space-y-4">
        <!-- Inicio -->
        <a href="#" aria-label="dashboard" class="relative px-4 py-3 flex items-center space-x-4 rounded-lg text-gray-500 bg-gradient-to-r from-sky-600 to-cyan-400">
          <i class="fas fa-home text-gray-500"></i>
          <span v-if="isOpen" class="-mr-1 font-medium">Inicio</span>
        </a>
        <a href="#" class="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group">
          <i class="fas fa-wallet"></i>
          <span v-if="isOpen">Billetera</span>
        </a>
        <a href="#" class="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group">
          <i class="fas fa-exchange-alt"></i>
          <span v-if="isOpen">Transacciones</span>
        </a>
        <a href="#" class="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group">
          <i class="fas fa-user"></i>
          <span v-if="isOpen">Mi cuenta</span>
        </a>
        <a href="#" class="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group">
          <i class="fas fa-sign-out-alt"></i>
          <span v-if="isOpen">Cerrar sesión</span>
        </a>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  import { sidebarState } from '../state/sidebarState.js'; // import the sidebar state
  
  const isOpen = computed(() => sidebarState.isOpen); // create a computed property for sidebar state
  </script>
  
  