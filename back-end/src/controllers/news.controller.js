const { validateNews } = require('./news.middleware');

const createNews = async (req, res) => {
  const news = new News({
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    publicationdate: req.body.publicationdate,
    updateddate: req.body.updateddate,
    tags: req.body.tags,
    image: req.body.image,
    status: req.body.status,
  });

  try {
    const newNews = await news.save();
    res.status(201).json(newNews);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
const router = express.Router();
router.post('/news', validateNews, createNews);