const indexNav = {
    namespaced: true,
    state: () => ({
        activeIndex: 1,
        backIndex: localStorage.getItem("backIndex") || 0,
    }),
    getters: {

    },
    mutations: {
        setIndexNav(state, index) {
            state.activeIndex = index;
        },
        setBackIndex(state, index) {
            state.backIndex = index;
        }
    },
    actions: {
        setIndexNav({ commit }, index) {
            commit("setIndexNav", index);
        },
        setBackIndex({ commit }, index) {
            localStorage.setItem("backIndex", index);
            commit("setBackIndex", index);
        }
    }
}

export default indexNav;