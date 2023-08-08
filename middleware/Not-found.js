const notFound = async (req,res) => {
    res.status(404).send('Route you are looking for does not exist')
};

module.exports = notFound;