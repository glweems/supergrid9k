import { verifyIdToken } from '@/lib/auth/firebaseAdmin';
const favoriteFoods = ['pizza', 'burger', 'chips', 'tortilla'];

const getFood = async (req, res) => {
  const token = req.headers.token;

  try {
    await verifyIdToken(token).then((s) => {
      return res.status(200).json({
        food: favoriteFoods[Math.floor(Math.random() * favoriteFoods.length)],
      });
    });
  } catch (error) {
    return res.status(401).send(error);
  }
};

export default getFood;
