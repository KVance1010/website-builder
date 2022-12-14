const { User, Build } = require('../models');

module.exports = {

	async addProject({ body }, res) {
		const userUp = await User.findOneAndUpdate(
			{ _id: body.userId },
			{
				$push: {
					builds: {
						buildCode: body.buildCode,
						description: body.description,
						title: body.title,
					},
				},
			}
		);
		if (!userUp) {
			return res.status(400).json({ message: 'wrong credentials!' });
		}
		res.json({ message: 'Added Project seccessfully' });
	},

	async findAllProjects({ user = null, params }, res) {
		const userData = await User.findOne({
			$or: [
				{ _id: user ? user._id : params.id },
				{ username: params.username },
			],
		}).populate('builds');
		if (!userData) {
			return res
				.status(400)
				.json({ message: 'no user found, please try again' });
		}
		res.json(userData);
	},
	async deleteProject(req, res) {
		const user = await User.findOneAndUpdate(
			{ _id: req.params.id },
			{ $pull: { builds: { build: req.params.buildId } } }
		);
		if (!user) {
			return res
				.status(400)
				.json({ message: 'unable to delete, please try again' });
		}
		res.json(user);
	}
};
