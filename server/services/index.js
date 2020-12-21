const firebase = require("firebase");

const getContact = () => {
    const userReference = firebase.database().ref("/Phonebooks/");
    return (new Promise((resolve, reject) => {
        userReference.on("value", function (snapshot) {
            const folders = snapshot.val();
            if (folders === null) {
                resolve([]);
            } else {
                const data = Object.keys(folders).map(o => Object.assign({ id: o }, folders[o]));
                resolve(data);
            }
            userReference.off("value");
        }, (errorObject) => {
            console.log("The read failed: " + errorObject.code);
            reject("The read failed: " + errorObject.code);
        });
    }));
}

//Create new instance
const createContact = (contact) => {
    const referencePath = `/Phonebooks/${contact.id}/`;
    const userReference = firebase.database().ref(referencePath);
    return (new Promise((resolve, reject) => {
        userReference.set({ name: contact.name, phone: contact.phone }, (error) => {
            if (error) {
                reject("Data could not be deleted." + error);
            } else {
                resolve(contact);
            }
        });
    }));
}

//Update existing instance
const updateContact = (contact) => {
    var referencePath = `/Phonebooks/${contact.id}/`;
    var userReference = firebase.database().ref(referencePath);
    return (new Promise((resolve, reject) => {
        userReference.update({ name: contact.Name, phone: contact.phone }, (error) => {
            if (error) {
                reject("Data could not be deleted." + error);
            } else {
                resolve(contact);
            }
        });
    }));
}

//Delete an instance
const deleteContact = (contact) => {
    var referencePath = `/Phonebooks/${contact.id}/`;
    var userReference = firebase.database().ref(referencePath);
    return (new Promise((resolve, reject) => {
        userReference.remove((error) => {
            if (error) {
                reject("Data could not be deleted." + error);
            } else {
                resolve(contact);
            }
        })
    }));
}

module.exports = { getContact, createContact, updateContact, deleteContact }