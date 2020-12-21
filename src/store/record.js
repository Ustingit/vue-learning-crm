import firebase from 'firebase/app'

export default {
    actions: {
        async createRecord({commit, dispatch}, record) {
            try {
                const uid = await dispatch('getUid')
                return await firebase.database().ref(`/users/${uid}/records`).push(record)
            } catch(e) {
                commit('setError', e) //call mutation 
                throw e
            }
        },
        async fetchRecords({commit, dispatch}) {
            try {
                const uid = await dispatch('getUid')
                var response = (await firebase.database().ref(`/users/${uid}/records`).once('value')).val() || {}

                return Object.keys(response).map(key => ({...response[key], id: key}))
            } catch(e) {
                commit('setError', e)
                throw e
            }
        }
    }
}