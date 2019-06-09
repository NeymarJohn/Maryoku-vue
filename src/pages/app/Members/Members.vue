<template>
  <div class="md-layout">
    <div class="md-layout-item md-size-100">
      <member-groups-list></member-groups-list>
    </div>
  </div>
</template>
<script>

  import TeamMember from '@/models/TeamMembers';
  import Team from '@/models/Teams';

  import MemberGroupsList from './MemberGroupsList';
  import MemberGroupDetails from './MemberGroupDetails';

  export default {
    components: {
      MemberGroupsList,
      MemberGroupDetails
    },
    data() {
      return {
        working: false,
        groups: []
      }
    },
    mounted() {
      this.working = false;

    }
  }
</script>
<style lang="scss" scoped>
</style>
