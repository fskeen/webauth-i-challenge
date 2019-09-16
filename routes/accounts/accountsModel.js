const db = require('../../data/dbConfig');

module.exports = {
    createAccount,
    signIn,
    getProtectedResource
}

function findAccount(id) {
    return db('accounts')
        .where('id', id)
        .first();
}

function createAccount(account) {
    return db('accounts')
        .insert(account)
        .then(ids => findAccount(ids[0]))
}

function signIn () {

}

function getProtectedResource () {

}