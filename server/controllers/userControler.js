const { User } = require('../models');
const { signToken } = require('../utils/auth');

module.exports = {
    // async getUser({ body }, res) {
    //   const user = await User.findOne({username: body.username });
  
    //   if (!user) {
    //     return res.status(400).json({ message: 'no user found'});
    //   }
    //   res.json(user);
    // },
   
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
    }

}