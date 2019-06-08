<template>
  <div class="md-layout event-invitees">
    <vue-element-loading :active="working" spinner="ring" is-full-screen color="#FF547C" isFullScreen/>
    <div class="md-layout-item md-size-100">
      <md-card style="height: 83vmin;">
        <md-card-header class="md-card-header-text md-card-header-warning">
          <div class="card-text">
            <h4 class="title" style="color: white;">
              Event invitees
            </h4>
          </div>
          <md-button class="md-info md-sm pull-right" style="margin: 16px 6px;"  :disabled="working || noActions">Invite more participants</md-button>
        </md-card-header>
        <md-card-content>
          <vue-element-loading :active="working" spinner="ring" color="#FF547C" />
          <div class="md-layout md-gutter" style="margin: 0;">

            <div class="md-layout-item md-size-100">
              <md-field style="border: none;">
                <multiselect :group-values="availableTeams" group-label="name" :group-select="true" :reset-after="true" @select="selectMember" :close-on-select="false" :preserve-search="true" placeholder="Search participants" label="emailAddress" track-by="id" :searchable="true" :options="availableMembers" :multiple="true" >
                  <template slot="option" slot-scope="{option}">
                    <div v-if="option.type === 'group'">
                      <div class="md-menu-item">
                        {{option.name}}
                      </div>
                    </div>
                    <div v-if="option.type === 'person'">
                      <div class="md-menu-item" v-if="option.firstName || option.lastName">
                        {{ option.firstName }} {{ option.lastName }} <span class="text-gray">&nbsp;({{ option.emailAddress }})</span>
                      </div>
                      <div class="md-menu-item" v-else>
                        {{ option.emailAddress }}
                      </div>
                    </div>
                  </template>
                  <template slot="tag" slot-scope="{option}">
                    <span style="display: none;"></span>
                  </template>
                  <template slot="noOptions">
                    All the available members are selected.
                  </template>
                </multiselect>
              </md-field>
            </div>

          </div>
        </md-card-content>
      </md-card>
    </div>
  </div>
</template>
<script>

  import TeamMember from '@/models/TeamMembers';
  import Team from '@/models/Teams';
  import VueElementLoading from 'vue-element-loading';

  export default {
    name: 'event-invitees',
    components: {
      VueElementLoading
    },
    props: {
      eventData: Object
    },
    data: () => ({

      working: false,
      noActions: false,
      availableTeams: [],
      availableMembers: []
    }),
    methods: {
      refreshList(force){
        this.working = true;
        this.loadTeams();
        this.loadAllMembers();
      },
      loadTeams(){
        let teams = this.$ls.get("teams");
        if (!teams){
          new Team().get().then(res=>{
            this.availableTeams = res;
            this.$ls.set("teams", this.availableTeams, 1000 * 60 * 10);
          });
        } else {
          this.availableTeams = teams;
        }
      },
      loadAllMembers(){
        let allMembers = this.$ls.get("teams.allMembers");
        if (!allMembers){
          new TeamMember().get().then(res => {
            this.$ls.set("teams.allMembers", res, 1000 * 60 * 10);
            allMembers = res;
            this.availableMembers = [...this.availableMembers, ...allMembers];
            this.working = false;
          });
        } else {
          this.availableMembers = [...this.availableMembers, ...allMembers];
          this.working = false;
        }
      },
      selectMember(item){

      }
    },
    created() {
    },
    mounted() {

      this.$auth.currentUser(this, true, ()=>{
        this.refreshList(false);
      });

    },
    computed: {},
    watch: {
    }
  }
</script>
