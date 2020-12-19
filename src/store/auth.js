import firebase from 'firebase/app'

export default {
    actions: {
        async login({dispatch, commit}, {email, password}) {
            console.log("in login", email, password)
            try {
                await firebase.auth().signInWithEmailAndPassword(email, password)
            } catch(e) {
                console.log("error", e)
                throw e
            }
        }
    }
}