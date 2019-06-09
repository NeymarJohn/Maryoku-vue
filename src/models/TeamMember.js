import Model from './Model'

export default class TeamMember extends Model {
  resource() {
    return 'members'
  }

    static fetch(ctx, force){
        return new Promise ((resolve, reject)=> {
            if (force) {
                ctx.$ls.remove("teams.allMembers");
            }
            let teams = ctx.$ls.get("teams.allMembers");
            if (!teams) {
                new TeamMember().get().then(res => {
                    ctx.$ls.set("teams.allMembers",res, Model.DEFAULT_EXPIRATION_MILLIS);
                    resolve(res);
                });
            } else {
                resolve(teams);
            }
        });
    }
}
