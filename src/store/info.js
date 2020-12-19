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
                console.log('error while fetching user info', e)
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
