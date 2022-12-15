const { User, Build } = require('../models');
const { signToken } = require('../utils/auth');

module.exports = {
	async createUser({ body }, res) {
		const user = await User.create(body);
		if (!user) {
			return res.status(400).json({ message: 'Wrong credentials!' });
		}
		const token = signToken(user);
		res.json({ token, user });
	},

	async login({ body }, res) {
		const user = await User.findOne({
			username: body.username 
		});
		if (!user) {
			return res.status(400).json({ message: 'user not found!' });
		}

		const correctPw = await user.isCorrectPassword(body.password);
		if (!correctPw) {
			return res.status(400).json({ message: 'Wrong credentials!' });
		}
		const token = signToken(user);
		res.json({ token, user });
	},

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
	async findProject({ body }, res) {
		const userData = await User.aggregate([
			{$match: {_id: body.userId}},
			{$eq:{builds: body.build}}
		])
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
