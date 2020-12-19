import firebase from 'firebase/app'

export default {
    actions: {
        async createCategory({commit, dispatch}, {title, limit}) {
            try {
                const uid = await dispatch('getUid')
                const category = await firebase.database().ref(`/users/${uid}/categories`).push({
                    title, limit
                })
                
                //title and limit are the same that we passed into this method, but key in from db
                return {title, limit, id: category.key}
            } catch(e) {
                commit('setError', e)
                throw e
            }
        }
    }
}
