const router = require('express').Router();
const userRoutes = require('./userRoutes');
const templateRoutes = require('./templateRoutes');

router.use('/users', userRoutes);
router.use('/templates', templateRoutes);

module.exports = router;