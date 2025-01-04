const contactapp = require('../model/contactmodel');

// Create Contact
exports.Create = async (req, res) => {
    try {
        if(!req.file){
            res.status(404).json({message: 'image not uploaded'});
        }
        const imageURL = `http://localhost:2000/uploads/${req.file.filename}`;
        const newdata = new contactapp({
            ...req.body,
            image: imageURL
        });
        const savedata = await newdata.save();
        res.status(201).json(savedata);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: 'Error in creating data.' });
    }
};

// Fetch All Contacts
exports.FetchAll = async (req, res) => {
    try {
        const fetchdata = await contactapp.find();
        if (!fetchdata || fetchdata.length === 0) {
            return res.status(404).json({ message: 'No contacts found' });
        }
        res.status(200).json(fetchdata);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: 'Error in fetching data.' });
    }
};

// Fetch Contact by ID
exports.FetchId = async (req, res) => {
    try {
        const { id } = req.params;
        const findId = await contactapp.findById(id);
        if (!findId) {
            return res.status(404).json({ message: 'Contact ID not found' });
        }
        res.status(200).json(findId);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: 'Error in fetching data by ID.' });
    }
};

// Delete All Contacts
exports.Delete = async (req, res) => {
    try {
        const confirmation = req.query.confirm;  // Optional query to confirm deletion
        if (confirmation !== 'yes') {
            return res.status(400).json({ message: 'Please confirm deletion by adding ?confirm=yes to the request.' });
        }
        const deldata = await contactapp.deleteMany({});
        res.status(200).json({ message: 'All contacts deleted successfully.', deldata });
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: 'Error in deleting data.' });
    }
};

// Delete Contact by ID
exports.DeleteId = async (req, res) => {
    try {
        const { id } = req.params;
        const deldataId = await contactapp.findByIdAndDelete(id);
        if (!deldataId) {
            return res.status(404).json({ message: 'Contact ID not found' });
        }
        res.status(200).json({ message: 'Contact deleted successfully.', data: deldataId });
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: 'Error in deleting data by ID.' });
    }
};

// Update Contact by ID
exports.Update = async (req, res) => {
    try {
        const { id } = req.params;
        let image = req.file?`http://localhost:2000/uploads/${req.file.filename}`:undefined;
        const updatedata = await contactapp.findByIdAndUpdate(id, {
            ...req.body,
            image: image
        }, { new: true });
        if (!updatedata) {
            return res.status(404).json({ message: 'Contact ID not found' });
        }
        res.status(200).json(updatedata);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: 'Error in updating data.' });
    }
};
