const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// GET all Tags
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }]
    });
    res.status(200).json(tagData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET one Tag (by id)
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }]
    });
    if (!tagData) {
      return res.status(404).json({ message: 'Unable to find tag by that id.' });
    };
    res.status(200).json(tagData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// POST/CREATE a Tag
router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// PUT/UPDATE a Tag (by id)
router.put('/:id', async (req, res) => {
  try {
    const tagData = await Tag.update(req.body {
      where: {
        id: req.params.id
      }
    });
    if (!tagData) {
      return res.status(404).json({ message: 'Unable to find tag by that id.' });
    };
    res.status(200).json(tagData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE a Tag (by id)
router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!tagData) {
      return res.status(404).json({ message: 'Unable to find tag by that id.' });
    };
    res.status(200).json(tagData);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
