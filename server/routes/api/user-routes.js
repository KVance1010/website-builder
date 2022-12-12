const router = require('express').Router();
const {
    createUser,
    login,
    addProject
  } = require('../../controllers/userControler');

  const { authMiddleware } = require('../../utils/auth');

  router.route('/').post(createUser).put(authMiddleware);

  router.route('/login').post(login);
  
  router.route('/addProject').post(addProject);


module.exports = router;