const router = require('express').Router();
const userRoutes = require('./user-routes');
// const buildRoutes = require('./build-routes');

router.use('/users', userRoutes);
// router.use('/builds', buildRoutes);

module.exports = router;