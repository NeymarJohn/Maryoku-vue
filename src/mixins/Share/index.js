import {mapActions} from "vuex";
import { postReq, getReq } from "@/utils/token";

export default {
    data(){
        return {
        }
    },
    methods:{
        async share(args){
            console.log('share.mixins', args);
            let res;
            if (args.page === 'event'){
                res = await postReq("/1/eventShare", {
                    ...args
                })
            } else if(args.page === 'proposal'){
                res = await postReq(`/1/proposals/${args.proposalId}/sendEmail`, {
                    proposalId: args.proposalId,
                    emails: args.emails,
                    type: 'share'
                })
            }
            console.log('res', res);

        }
    },
    computed: {
    },
    async created(){
        console.log('share.mixin.created');
    }
}
