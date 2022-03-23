import { postReq, getReq } from "@/utils/token";

export default {
  data() {
    return {};
  },
  methods: {
    async share(args) {
      let res;
      if (args.page === "event") {
        res = await postReq("/1/eventShare", {
          ...args
        });
      } else if (args.page === "proposal") {
        let { proposalId, emails, cb } = args;
        res = await postReq(`/1/proposals/${proposalId}/sendEmail`, {
          proposalId: proposalId,
          emails: emails,
          type: "share"
        });
        cb({ success: true });
      }
    }
  },
};
