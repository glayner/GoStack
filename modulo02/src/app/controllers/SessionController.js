import jwt from 'jsonwebtoken';

import User from '../models/user';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    if (!(await user.checkPassord(password))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, '141137bc6b7efc3cc10bf4b6ccce8dcd', {
        expiresIn: '7d',
      }),
    });
  }
}

export default new SessionController();
