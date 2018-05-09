<template>
  <b-button variant="link" class="collapse-btn">
    <span class="when-opened"><icon name="minus-square"/></span>
    <span class="when-closed"><icon name="plus-square"/></span>
  </b-button>
</template>

<script>
import Icon from 'vue-awesome/components/Icon'

export default {
  components: {
    Icon
  }
}
</script>