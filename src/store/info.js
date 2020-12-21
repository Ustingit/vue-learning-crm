import firebase from 'firebase/app'

export default {
    state: {
        info: {}
    },
    actions: {
        async fetchInfo({dispatch, commit}) {
            try {
                const uid = await dispatch('getUid')
                const info = (await (firebase.database().ref(`/users/${uid}/info`).once('value'))).val()
                commit('setInfo', info)
            } catch(e) {
                commit('setError', e)
                throw e
            }
        },
        async updateInfo({commit, dispatch, getters}, toUpdate) {
            try {
                const uid = await dispatch('getUid')
                const updateData = {...getters.info, ...toUpdate}
                await firebase.database().ref(`/users/${uid}/info`).update(updateData)
                commit('setInfo', updateData)
            } catch(e) {
                commit('setError', e)
                throw e
            }
        }
    },
    mutations: {
        setInfo(state, info) {
            state.info = info
        },
        // to avoid caching after logout
        clearInfo(state) {
            state.info = {}
        }
    },
    //get parts of this state
    getters: {
        info: s => s.info
    }
}
