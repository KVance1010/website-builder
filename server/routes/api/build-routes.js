const router = require('express').Router();
const {
	addProject,
	findAllProjects,
	deleteProject
} = require('../../controllers/projectController');

router.route('/').post(authMiddleware, addProject);

router.route('/').get(authMiddleware, findAllProjects);

router.route('/:id').delete(authMiddleware, deleteProject);

module.exports = router;