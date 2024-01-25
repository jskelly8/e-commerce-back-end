const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint ---------

// GET all Categories
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }]
    });
    res.status(200).json(categoryData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET one Category (by id)
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });
    if (!categoryData) {
      return res.status(404).json({ message: 'Unable to find category by that id.' });
    };
    res.status(200).json(categoryData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// POST/CREATE a Category
router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// PUT/UPDATE a Category (by id)
router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updateData = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    if (!updateData) {
      return res.status(404).json({ message: 'Unable to find category by that id.' })
    };
    res.status(200).json(updateData);
  } catch (error) {
    res.status(500).json(error);
  }

});

// DELETE a Category (by id)
router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!deleteData) {
      return res.status(404).json({ message: 'Unable to find category by that id.'})
    };
    res.status(200).json(deleteData);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
