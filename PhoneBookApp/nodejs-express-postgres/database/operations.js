const connection = require('./connection')

// Get all contacts
const getContacts = async (request, response) => {
    try {
        const contacts = await connection.manyOrNone('SELECT * FROM contacts');
        return await response.status(200).json(contacts)
    }  catch(error) {
        return await response.status(400).send({ status: 'error', message: error.message });
    }
}

// Get contact by id
const getContactById = async (request, response, next) => {
    const id = parseInt(request.params.id)
    try {
        const contact = await connection.oneOrNone(`SELECT * FROM contacts WHERE id = ${id}`)
        return contact !== null ? await response.status(200).json(contact) : await next(error)
    }  catch(e) {
        return await response.status(400).send({ status: 'error', message: 'User not found!' });
    }
}

const createContact = async (request, response, next) => {
    const { full_name, phone_number, email, profile_image } = request.body

    try {
        const contact = await connection.one('INSERT INTO contacts (full_name, phone_number, email, profile_image) VALUES ($1, $2, $3, $4) RETURNING *', [full_name, phone_number, email, profile_image]);
        return contact !== null ? await response.status(201).json(
            { 
                status: 'success',
                message: `${ contact.full_name } added successfully`
            }
        ) : await next(error)
    }  catch(e) {
        console.log(e);
        return await response.status(400).send({ status: 'error', error: e });
    }
}

const updateContact = async (request, response, next) => {
    const id = parseInt(request.params.id)
    const { full_name, phone_number, email, profile_image } = request.body

    try {
        const contact = await connection.oneOrNone(`SELECT * FROM contacts WHERE id = ${id}`)
        try {
            const update_contact = await connection.one(`UPDATE contacts SET full_name = $1, phone_number = $2, email = $3, profile_image = $4 WHERE id = $5 RETURNING *`, [full_name || contact.full_name, phone_number || contact.phone_number, email || contact.email, profile_image || contact.profile_image, id]);
            return update_contact !== null ? await response.status(201).json(
                { 
                    status: 'success',
                    message: `${ update_contact.full_name } updated successfully`
                }
            ) : await next(error)
        }  catch(e) {
            console.log(e);
            return await response.status(400).send({ status: 'error', error: e });
        }
    }  catch(e) {
        return await response.status(400).send({ status: 'error', message: 'User not found!' });
    }
}

const deleteContact = async (request, response) => {
    const id = parseInt(request.params.id)

    try {
        const contact = await connection.one('DELETE FROM contacts WHERE id = $1 RETURNING *', [id])
        return contact !== null ? await response.status(201).json(
            { 
                status: 'success',
                message: `${ contact.full_name } deleted successfully`
            }
        ) : await next(error)
    } catch (e) {
        console.log(e);
        return await response.status(400).send({ status: 'error', message: 'User not found!' });
    }
}

module.exports = {
	getContacts,
	getContactById,
	createContact,
	updateContact,
	deleteContact,
}