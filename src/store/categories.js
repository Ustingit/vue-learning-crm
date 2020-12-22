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
        },
        async fetchCategories({commit, dispatch}) {
            try {
                const uid = await dispatch('getUid')
                var response = (await firebase.database().ref(`/users/${uid}/categories`).once('value')).val() || {}

                return Object.keys(response).map(key => ({...response[key], id: key}))
            } catch(e) {
                commit('setError', e)
                throw e
            }
        },
        async fetchCategoryById({commit, dispatch}, id) {
            try {
                const uid = await dispatch('getUid')
                var category = (await firebase.database().ref(`/users/${uid}/categories`).child(id).once('value')).val() || {}

                return { ...category, id }
            } catch(e) {
                commit('setError', e)
                throw e
            }
        },
        async updateCategory({commit, dispatch}, {title, limit, id}) {
            try {
                const uid = await dispatch('getUid')
                await firebase.database().ref(`/users/${uid}/categories`).child(id).update({
                    title, limit
                })
            } catch(e) {
                commit('setError', e)
                throw e
            }
        }
    }
}
