const router = require('express').Router();
const {
	createUser,
	login,
	addProject,
	findAllProjects,
	deleteProject
} = require('../../controllers/userController');

const { authMiddleware } = require('../../utils/auth');

router.route('/').post(createUser).put(authMiddleware);

router.route('/login').post(login);

router.route('/addProject').post(addProject); //authMiddleware,

router.route('/findAllProjects').get(authMiddleware, findAllProjects);

router.route('/deleteProject/:id').post(authMiddleware, deleteProject);

module.exports = router;
