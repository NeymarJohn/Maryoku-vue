import EventComment from "@/models/EventComment";
import EventCommentComponent from "@/models/EventCommentComponent";
import { reject } from "promise-polyfill";
import Proposal from "@/models/Proposal";
import ProposalVersion from "@/models/ProposalVersion";

const state = {
  commentComponents: [],
  commentsProposals: [],
  selectedProposal: null,
  guestName: null,
  customer: null,
  error: null,
  currentVersion: -1
};

const getters = {
  getComponentComponents: (state) => {
    return state.commentComponents;
  }
};

const mutations = {
  setError(state, message) {
    state.error = message;
  },
  setGuestName(state, name) {
    state.guestName = name;
  },
  setCustomer(state, customer) {
    state.customer = customer;
  },
  setCommentComponents(state, commentComponents) {
    state.commentComponents = commentComponents;
  },
  setCommentsProposals(state, commentsProposals) {
    state.commentsProposals = commentsProposals;
  },
  setSelectedProposal(state, commentsProposal) {
    state.selectedProposal = commentsProposal;
    state.currentVersion = -1;
  },
  addCommentComponent(state, commentComponent) {
    state.commentComponents.push(commentComponent);
  },
  setCommentsToComponent(state, { commentComponent, comments }) {
    const index = state.commentComponents.findIndex((item) => item.id === commentComponent.id);
    state.commentComponents[index].comments = comments;
  },

  removeCommentComponent(state, commentComponent) {
    const index = state.commentComponents.findIndex((item) => item.id === commentComponent.id);
    state.commentComponents.splice(index, 1);
  },

  updateCommentComponent(state, commentComponent) {
    const index = state.commentComponents.findIndex((item) => item.id === commentComponent.id);
    state.commentComponents.splice(index, 1, commentComponent);
  },

  addChlidComment(state, { commentComponent, comment }) {
    const index = state.commentComponents.findIndex((item) => item.id === commentComponent.id);
    state.commentComponents[index].comments = comments;
    state.commentComponent.push(commentComponent);
  },
  setComments(state, { commentComponentId, comments }) {
    const index = state.commentComponents.findIndex((item) => item.id == commentComponentId);
    state.commentComponents[index].comments = comments;
  },

  addComment(state, { commentComponentId, comment }) {
    const index = state.commentComponents.findIndex((item) => item.id == commentComponentId);
    if (!state.commentComponents[index].comments) state.commentComponents[index].comments = [];
    state.commentComponents[index].comments.push(comment);
  },
  updateComment(state, comment) {},
  setVersions: (state, versions) => {
    state.selectedProposal.versions = versions;
  }
};

const actions = {
  addCommentComponent({ commit, state }, commentComponent) {
    return new Promise((resolve, reject) => {
      if (state.guestName) commentComponent = { ...commentComponent, name: state.guestName };
      new EventCommentComponent(commentComponent).save().then((res) => {
        commit("addCommentComponent", res.data);
        // save customer when user comment as guest
        if (res.customer) commit("setCustomer", res.customer);
        resolve(res.data);
      });
    });
  },
  getCommentComponents({ commit, state }, url) {
    return new Promise(async (resolve, reject) => {
      let query = new EventCommentComponent();
      const res = await query.params({ url }).get();
      if (res.success) {
        commit("setCommentComponents", res.data);
        // save customer when user comment as guest
        if (res.customer) commit("setCustomer", res.customer);
        resolve(res.data);
      } else {
        commit("setError", res.message);
        resolve([]);
      }
    });
  },

  getCommentsProposalsByVendor({ commit, state }, vendor_id) {
    return new Promise(async (resolve, reject) => {
      let query = new EventCommentComponent();
      const res = await query.params({ vendorId: vendor_id }).get();
      if (res.success) {
        commit("setCommentsProposals", res.data);
        // save customer when user comment as guest
        resolve(res.data);
      } else {
        commit("setError", res.message);
        resolve([]);
      }
    });
  },

  getProposalById({ commit, state }, proposalId) {
    return new Promise(async (resolve, reject) => {
      let query = new Proposal();
      await query.find(proposalId)
        .then((res) => {
          const foundCommentsProposal = state.commentsProposals.find((proposal) => proposal.id === res.id);
          commit("setSelectedProposal", { ...foundCommentsProposal, ...res });
          // save customer when user comment as guest
          resolve(res);
        })
        .catch((res) => {
          commit("setError", res.message);
          resolve([]);
        });
    });
  },

  /****Event comments  */
  getCommentsAction({ commit, state }, commentComponentId) {
    const eventComponent = new EventCommentComponent({ id: commentComponentId });
    return new Promise((resolve, reject) => {
      new EventComment()
        .for(eventComponent)
        .get()
        .then((comments) => {
          commit("setComments", { commentComponentId, comments });
          resolve(comments);
        });
    });
  },

  addComment({ commit, state }, comment) {
    let commentComponent = null;
    if(comment.eventCommentComponent) {
      commentComponent = new EventCommentComponent({ id: comment.eventCommentComponent.id });
    } else {
      commentComponent = new EventCommentComponent({ id: comment.commentComponent.id });
    }
    if (state.guestName) comment = { ...comment, name: state.guestName };
    return new Promise((resolve, reject) => {
      new EventComment(comment)
        .for(commentComponent)
        .save()
        .then((res) => {
          if (res.success) {
            // save customer when user comment as guest
            if (res.customer) commit("setCustomer", res.customer);
            resolve(res.data);
          } else {
            commit("setError", res.message);
          }
        });
    });
  },

  deleteCommentComponent({ commit, state }, commentComponent) {
    if (state.guestName) commentComponent = { ...commentComponent, name: state.guestName };
    return new Promise((resolve, reject) => {
      new EventCommentComponent(commentComponent).delete().then((res) => {
        commit("removeCommentComponent", commentComponent);
        resolve(res);
      });
    });
  },

  updateProposal({ commit, state }, proposal) {
    return new Promise((resolve, reject) => {
      new Proposal({ ...proposal }).save()
        .then((res) => {
          const proposals = state.commentsProposals.map(
            (proposal) => proposal.id === res.id ? { ...proposal, viewed: res.viewed } : proposal
          );
          commit("setCommentsProposals", proposals);
          commit("setSelectedProposal", {
            ...proposal,
            ...res
          });
          resolve(res);
        })
        .catch((res) => {
          commit("setError", res.message);
          reject(res.message);
        });
    });
  },

  updateCommentComponent({ commit, state }, commentComponent) {
    return new Promise((resolve, reject) => {
      if (state.guestName) commentComponent = { ...commentComponent, name: state.guestName };
      new EventCommentComponent(commentComponent).save().then((res) => {
        if (res.success) {
          commit("updateCommentComponent", res.data);
          // save customer when user comment as guest
          if (res.customer) commit("setCustomer", res.customer);
          resolve(res.data);
        } else {
          commit("setError", res.message);
          resolve(null);
        }
      });
    });
  },

  updateCommentAction({ commit, state }, comment) {
    return new Promise((resolve, reject) => {
      const commentComponent = new EventCommentComponent({ id: comment.eventCommentComponent.id });
      if (state.guestName) comment = { ...comment, name: state.guestName };
      new EventComment(comment)
        .for(commentComponent)
        .save()
        .then((res) => {
          if (res.success) {
            const commentComponent = state.selectedProposal.commentComponent.map((commentComponent) => {
              const foundCommentIndex = commentComponent.comments.findIndex((comment) => comment.id === res.data.id);
              if (foundCommentIndex > -1) {
                return {
                  ...commentComponent,
                  comments: [
                    ...commentComponent.comments.slice(0, foundCommentIndex),
                    { ...commentComponent.comments[foundCommentIndex], viewed: res.data.viewed },
                    ...commentComponent.comments.slice(foundCommentIndex + 1)
                  ]
                };
              }
              return commentComponent;
            });
            commit("setSelectedProposal", { ...state.selectedProposal, commentComponent });
            commit(
              "setCommentsProposals",
              state.commentsProposals
                .map((proposal) => proposal.id === state.selectedProposal.id ? { ...proposal, commentComponent } : proposal)
            );
            // save customer when user comment as guest
            if (res.data.customer) commit("setCustomer", res.data.customer);
            resolve(res);
          } else {
            commit("setError", res.message);
            resolve(null);
          }
        });
    });
  },

  deleteCommentAction({ commit, state }, comment) {
    return new Promise(async (resolve, reject) => {
      const eventCommentComponent = new EventCommentComponent({ id: comment.id });
      if (state.guestName) comment = { ...comment, name: state.guestName };
      let query = new EventComment(comment);
      let res = await query.for(eventCommentComponent).delete();
      if (res.data.success) {
        // save customer when user comment as guest
        if (res.data.customer) commit("setCustomer", res.data.customer);
        resolve(res.data.data);
      } else {
        commit("setError", res.data.message);
      }
    });
  },

  markAsRead({ commit, state }, { proposal, commentComponent }) {
    for (let comment of commentComponent.comments) {
      if (!comment.viewed) {
        comment.viewed = true;
      }
    }

    let commentComponentObj = new EventCommentComponent({
      id: commentComponent.id,
      comments: commentComponent.comments
    });
    commentComponentObj.save();

    let proposals = state.commentsProposals;

    for (let p of proposals) {
      if (p.id != proposal.id) {
        continue;
      }
      for (let index in p.commentComponent) {
        if (p.commentComponent[index].id == commentComponent.id) {
          p.commentComponent[index] = commentComponent;
          break;
        }
      }
      break;
    }

    commit("setCommentsProposals", JSON.parse(JSON.stringify(proposals)));
  },

  saveVersion({ commit, state }, data) {
    return new Promise(async (resolve, reject) => {
      const query = new ProposalVersion({ ...data, proposal: new Proposal({ id: state.selectedProposal.id }) }).for(
        new Proposal({ id: state.selectedProposal.id })
      );
      let res = await query.save();

      if (!state.selectedProposal.versions) {
        commit("setVersions", [res]);
        return;
      }

      let idx = state.selectedProposal.versions.findIndex((v) => v.id === res.id);
      if (idx === -1) {
        commit("setVersions", [...state.selectedProposal.versions, res]);
      } else {
        Vue.set(state.selectedProposal.versions, idx, res);
        commit("setVersions", state.selectedProposal.versions);
      }
    });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
