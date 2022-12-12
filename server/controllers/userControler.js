const { User, Build } = require('../models');
const { signToken } = require('../utils/auth');

module.exports = {
  async createUser({ body }, res) {
    const user = await User.create(body);
    if (!user) {
      return res.status(400).json({ message: 'Something is wrong!' });
    }
    const token = signToken(user);
    res.json({ token, user });
  },

  async login({ body }, res) {
    const user = await User.findOne({ $or: [{ username: body.username }, { email: body.email }] });
    if (!user) {
      return res.status(400).json({ message: "user not found!" });
    }

    const correctPw = await user.isCorrectPassword(body.password);
    if (!correctPw) {
      return res.status(400).json({ message: 'wrong credentials!' });
    }
    const token = signToken(user);
    res.json({ token, user });
  },

  async addProject({ body  }, res) {
    console.log( body);
    console.log( body.userId);
    // console.log( user + " just in case" );
    // console.log( body.token );
    // const build = await Build.create([{buildCode: body.buildCode},{description: body.description},{title: body.title}]);
    // const build = await Build.create({body})
    // console.log(user._id, "frontend");
    const userUp = await User.findOneAndUpdate(
      { _id:  body.userId},
      { $push: { builds:{buildCode}  } })
    if (!userUp) {
      return res.status(400).json({ message: 'wrong credentials!' });
    }
    res.json({ message: "Added Project seccessfully" })
  }

}