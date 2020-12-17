const express = require('express');
const router = express.Router();

const Phonebook = require('../models/phonebooks');


/* GET phonebook list */

router.get('/', (req, res, next) => {
    Phonebook.find({}, (err, data) => {
        res.status(200).json(data);
    })
        .catch(err => {
            res.json({
                error: true,
                message: `something error: ${err.message}`
            })
        })
})

// ----- ADD PHONEBOOK
router.post('/', (req, res, next) => {
    const { id, name, phone } = req.body;
    const phonebook = new Phonebook({
        id: id,
        name: name,
        phone: phone
    })
    phonebook.save()
        .then(() => {
            return res.status(201).json({
                status: 'SUCCES',
                data: {
                    id: id,
                    name: name,
                    phone: phone
                }
            });
        })
        .catch(err => {
            return res.status(406).json({ message: `Can't add phonebook` });
        });
})

// ----- EDIT PHONEBOOK
router.put('/:id', (req, res, next) => {
    const { id } = req.params;
    const { name, phone } = req.body;

    Phonebook.findOneAndUpdate({
        id: id
    },
        {
            name: name,
            phone: phone
        }
    )
        .then(() => {
            return res.status(201).json({
                status: 'SUCCES',
                data: {
                    id: id,
                    name: name,
                    phone: phone
                }
            });
        })
        .catch(err => {
            return res.status(406).json({
                message: `Can't Edit Phonebook`
            });
        });
});

// ----- DELETE PHONEBOOK
router.delete('/:id', (req, res, next) => {
    const { id } = req.params;
    Phonebook.findOneAndRemove({ id: id })
        .then(data => {
            if (data) {
                const newPhonebook = {};
                newPhonebook.id = data.id;
                newPhonebook.name = data.name;
                newPhonebook.phone = data.phone;

                return res.status(200).json({
                    status: 'SUCCES',
                    data: newPhonebook
                });
            }
            error(`Phonebooks can't be deleted`);
        })
        .catch(err => {
            return res.status(406).json({ message: err });
        })
});

module.exports = router;