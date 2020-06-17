const yargs = require("yargs");
const contactsDbFunctions = require("./contacts")

// проверка работоспособности функций

/* contactsDbFunctions.listContacts() */
/* contactsDbFunctions.getContactById(5) */
/* contactsDbFunctions.addContact("Mango", "mango@gmail.com", "322-22-22") */
/* contactsDbFunctions.removeContact(11) */

const argv = yargs
    .string("action")
    .number("id")
    .string("name")
    .string("email")
    .string("phone")
    .argv

/* console.table(argv) */

function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case 'list':
            contactsDbFunctions.listContacts()
            break;

        case 'get':
            contactsDbFunctions.getContactById(id)
            break;

        case 'add':
            contactsDbFunctions.addContact(name, email, phone)
            break;

        case 'remove':
            contactsDbFunctions.removeContact(id)
            break;

        default:
            console.warn('\x1B[31m Unknown action type!');
    }
}

invokeAction(argv);