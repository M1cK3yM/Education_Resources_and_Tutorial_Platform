const validateNews = async (req, res, next) => {
    const { title, content, author, publicationdate, updateddate, tags, image, status } = req.body;
  
    
   if (!title || !content || !author || !publicationdate) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
  

    if (typeof title !== 'string' || title.trim().length === 0) {
      return res.status(400).json({ message: 'Title must be a non-empty string' });
    }
  
    if (typeof content !== 'string' || content.trim().length === 0) {
      return res.status(400).json({ message: 'Content must be a non-empty string' });
    }
  
    if (typeof author !== 'string' || author.trim().length === 0) {
      return res.status(400).json({ message: 'Author must be a non-empty string' });
    }
  
    
    try {
      req.body.publicationdate = new Date(publicationdate);
      req.body.updateddate = new Date(updateddate);
    } catch (err) {
      return res.status(400).json({ message: 'Invalid date format' });
    }
  
   
    next();
  };
  
  module.exports = { validateNews };