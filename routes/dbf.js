const express = require('express');
const {DBFFile} = require('dbffile');
const path = require('path');
const fieldDescriptors = require('../dbf-files/fieldDescriptors');
const fs = require("fs/promises");

const router = express.Router();
let dbfFilePath = '';

const createDbf = async (templatePath, data) => {
    const {nip, orderItems} = data;

    try {console.log(templatePath)
        const records = [];
        orderItems.forEach((item, index) => {
            if (index === 0) {
                records.push({
                    G_ODB_NIP: nip,
                    G_NAB_NIP: nip,
                    P_INDEKS: item.position,
                    P_ILOSC: item.quantity
                })
            } else {
                records.push({
                    P_INDEKS: item.position,
                    P_ILOSC: item.quantity
                })
            }
            
        });
        dbfFilePath = path.join(__dirname, '..', 'dbf-files', `order-nip-${nip}.dbf`);
        let dbf = await DBFFile.create(dbfFilePath, fieldDescriptors);
        console.log('DBF file created.');
        await dbf.appendRecords(records);
        console.log(`${records.length} records added.`);        
    } catch (err) {
        console.log(err)
    }
};

router.post('/', async (req, res) => {
    const data = req.body;
    await createDbf(path.join(__dirname, '..' ,'dbf-files', 'template.dbf'), data);

    res.sendFile(dbfFilePath, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('The file have been sent')
        }
    });
    await fs.rm(dbfFilePath).then(() => console.log('plik został usunięty'));
});


module.exports = router;
