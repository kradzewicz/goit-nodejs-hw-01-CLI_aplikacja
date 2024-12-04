const fs = require("fs").promises
const path = require('path')
const { nanoid } = require('nanoid')

const contactsPath = path.join(__dirname, "/db/contacts.json")

// TODO: udokumentuj każdą funkcję
async function listContacts() {
    try {
        const contactsData = await fs.readFile(contactsPath)
        const contactsList = JSON.parse(contactsData)
        return contactsList
        
    } catch (err) {
        console.log(err.message)
    }
}

async function getContactById(contactId) {
    try {
        const contactsList = await listContacts()
        const contact = contactsList.filter((contact) => contact.id === contactId)
        if (contact.length > 0) {
            console.log(contact[0])
        } else {
            console.log(`Contact with id ${contactId} doesn't exist` )
        }
    } catch (err) {
        console.log(err.message)
    }
}

async function removeContact(contactId) {
    try {
        const contactsList = await listContacts()
        const newContactList = contactsList.filter((contact) => contact.id !== contactId)
        await fs.writeFile(contactsPath, JSON.stringify(newContactList, null, 2))
        console.log("Contact has been deleted!")
    } catch (err) {
        console.log(err.message)
    }
}

async function addContact(name, email, phone) {
    try {
        const contactsList = await listContacts()
        const newContact = {id: nanoid(),name: name,email: email,phone: phone}
        contactsList.push(newContact)

        await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2))
        console.log(`name: ${name} \nemail: ${email} \nphone ${phone}\nContact has been added`)
        
    } catch (err) {
        console.log(err.message)
    }
}
  
module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}