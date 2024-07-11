import { reactive } from 'vue';

export const sidebarState = reactive({
  isOpen: false,
  toggle() {
    this.isOpen = !this.isOpen;
  }
});
