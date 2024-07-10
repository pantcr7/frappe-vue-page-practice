<template>
    <div>
      <Button variant="solid" @click="showCreateDialog=true">+ Add Ticket</Button>
    </div>
    <h2>Support Ticket</h2>
    <div v-if="ticket.data">
      <ListView :options="{
        selectable: false,
        resizeColumn: true,
        showTooltip: true,
        emptyState: {
          title: 'No Tickets found',
          description: 'Create a new record to get started',
          button: {
            label: 'New Record',
            variant: 'solid',
            onClick: () => console.log('New Record'),
          },
        },
      }"
      :columns="[
        { label: 'Title', key: 'title' },
        { label: 'Category', key: 'category' },
        { label: 'Purchase Date', key: 'purchase_date' },
        { label: 'Status', key: 'status' },
        { label: 'Description', key: 'description' },
      ]"
      :rows="processedTickets"
      />
    </div>
    <Dialog :options="{
      title: 'Add Ticket',
      description: 'Add a new ticket',
      size: 'xl',
      actions: [
        {
          label: 'Confirm',
          variant: 'solid',
          onClick: createTicket,
        },
      ],
    }" v-model="showCreateDialog">
      <template #body-content>
        <div class="p-2">
          <FormControl
            :type="'text'"
            size="sm"
            variant="subtle"
            placeholder="title"
            :disabled="false"
            label="Title"
            v-model="ticketDetails.title"
          />
          <FormControl
            :type="'select'"
            size="sm"
            variant="subtle"
            placeholder="category"
            :disabled="false"
            label="Category"
            v-model="ticketDetails.category"
            :options="[
                {
                    label: 'Delivery',
                    value: 'Delivery',
                },
                {
                    label: 'Paper Quality',
                    value: 'Paper Quality',
                },
                {
                    label: 'Other',
                    value: 'Other',
                },
                ]"
          />
          <FormControl
            :type="'date'"
            size="sm"
            variant="subtle"
            placeholder="purchase_date"
            :disabled="false"
            label="Purchase Date"
            v-model="ticketDetails.purchase_date"
          />
          <FormControl
            :type="'select'"
            size="sm"
            variant="subtle"
            placeholder="status"
            :disabled="false"
            label="Status"
            v-model="ticketDetails.status"
            :options="[
                {
                    label: 'Open',
                    value: 'Open',
                },
                {
                    label: 'Resolved',
                    value: 'Resolved',
                },
                {
                    label: 'Closed',
                    value: 'Closed',
                },
                ]"
          />
          <FormControl
            :type="'text'"
            size="sm"
            variant="subtle"
            placeholder="description"
            :disabled="false"
            label="Description"
            v-model="ticketDetails.description"
          />
        </div>
      </template>
    </Dialog>
  </template>
  
  <script setup>
  import { ref,computed,watch,watchEffect } from 'vue';
  import { Button, ListView, Dialog, FormControl } from 'frappe-ui';
  import { createListResource } from 'frappe-ui';
  import confetti from 'canvas-confetti';
  
  const showCreateDialog = ref(false);
  
  const ticketDetails = ref({
    title: "",
    category: "",
    purchase_date: "",
    status: "",
    description: "",
  });
  
  const ticket = createListResource({
    doctype: 'Support Ticket',
    fields: ['title', 'category', 'purchase_date', 'status', 'description'],
    orderBy: 'creation desc',
    auto: true,
    insert: {
        onSuccess: (d) => {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
            });
        },
    }
  });

  function stripHtml(html) {
  if (typeof html !== 'string') {
    return '';
  }
  return html.replace(/<[^>]*>/g, '');
}

const processedTickets = computed(() => {
  return ticket.data.map(t => ({
    ...t,
    description: stripHtml(t.description),
  }));
});
  
  function createTicket() {
    ticket.insert.submit({
      title: ticketDetails.value.title,
      category: ticketDetails.value.category,
      purchase_date: ticketDetails.value.purchase_date,
      status: ticketDetails.value.status,
      description: ticketDetails.value.description,
    }).then(() => {
      showCreateDialog.value = false;
      ticket.fetch(); // Refresh the list after insertion
    }).catch(error => {
      console.error('Error inserting ticket:', error);
    });
  }
  watchEffect(() => {
  ticket.fetch();
})

  </script>