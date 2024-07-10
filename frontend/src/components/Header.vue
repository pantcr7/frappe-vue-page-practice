<template>
    <header class="flex justify-between">
        <h1 class="text-left">Logo</h1>
        
        <Dropdown
  :options="showOptions"
>   <Avatar
        :shape="'circle'"
        image="https://i.pravatar.cc/100"
        label="EY"
        size="lg"
        class="cursor-pointer"
        /></Dropdown>
    </header>
</template>
<script setup>
import {Avatar} from 'frappe-ui';
import {Dropdown} from 'frappe-ui';

const showOptions = [
    {
        label: 'Desk',
        onClick: () => {
            window.location.href = '/app';
        }
    },
    
];

</script>