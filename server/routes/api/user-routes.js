const router = require('express').Router();
const {
    createUser,
    login,
    addProject,
    findAllProjects
  } = require('../../controllers/userControler');

  const { authMiddleware } = require('../../utils/auth');

  router.route('/').post(createUser).put(authMiddleware);

  router.route('/login').post(login);
  
  router.route('/addProject').post(addProject, authMiddleware);

  router.route('/findAllProjects/:id').get(findAllProjects);


module.exports = router;