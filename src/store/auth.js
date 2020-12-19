import firebase from 'firebase/app'

export default {
    actions: {
        // мы забираем из контекста метод dispatch и commit (provides opportunity to change state)
        async login({dispatch, commit}, {email, password}) {
            try {
                await firebase.auth().signInWithEmailAndPassword(email, password)
            } catch(e) {
                commit('setError', e) //first parameter is mutation name
                throw e
            }
        },
        async register({dispatch, commit}, {email, password, name}) {
            try {
                await firebase.auth().createUserWithEmailAndPassword(email, password)
                const uid = await dispatch('getUid')
                
                //ref - method that updates some field in db
                await firebase.database().ref(`/users/${uid}/info`).set({
                    bill: 100000,
                    name
                })
            } catch(e) {
                commit('setError', e)
                throw e
            }
        },
        getUid() {
          var user = firebase.auth().currentUser;  
          return user ? user.uid : null;
        },
        async logout() {
            await firebase.auth().signOut()
        }
    }
}