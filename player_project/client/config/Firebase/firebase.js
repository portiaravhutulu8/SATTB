passwordReset: email => {
    return firebase.auth().sendPasswordResetEmail(email);
}