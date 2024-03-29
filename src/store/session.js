import axios from 'axios';

const path = process.env.VUE_APP_API_URL;

export default {
  state: {
    session: null,
  },
  getters: {
    getSession(state) {
      return state.session;
    },
  },
  mutations: {
    setSession(state, payload) {
      state.session = payload;
    },
  },
  actions: {
    async createSession(context, payload) {
      try {
        const { server, username } = payload;
        const url = `${path}/new-session`;
        const session = await axios.post(url, { server, username });
        context.commit('setSession', session.data);
        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async retrieveSession(context, payload) {
      try {
        const url = `${path}/retrieve-session/${payload}`;
        const session = await axios.get(url);
        context.commit('setSession', session.data);
        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async newGame(context, payload) {
      try {
        const { sessionId, isBlueSideWinning } = payload;
        const url = `${path}/new-game`;
        const response = await axios.post(url, { sessionId, isBlueSideWinning });
        context.commit('setSession', response.data.session);
        return Promise.resolve(response.data.winner);
      } catch (error) {
        return Promise.reject(error);
      }
    },
  },
};
