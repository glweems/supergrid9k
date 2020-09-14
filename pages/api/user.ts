import { NextApiHandler } from 'next';
import dbConnect from '../../lib/dbConnect';
import withPassport from '../../lib/passport/withPassport';
import UserModel, { SuperGrid9kUser } from '../../models/User';

const handler: NextApiHandler = async (req, res) => {
  const user: SuperGrid9kUser = req?.body;
  console.log('user: ', user);
  if (!user?.username) return res.status(404).json({ fag: 'hi' });
  await dbConnect();

  try {
    const dbUser = await UserModel.findOneAndUpdate({ username: user.username }, user)
      .then((found) => {
        if (found) return res.status(418).json(found);
        return found;
      })
      .catch((err) => res.status(500).json({ error: err }));

    if (!dbUser)
      return await UserModel.create(user)
        .then((created) => res.status(201).json(created))
        .catch((err) => res.status(500).json({ error: err }));
  } catch (e) {
    res.status(500).json(e);
  }
};

export default withPassport(handler);
