const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

//finds all categories
router.get('/', async (req, res) => {
  try {
    const categotyData = await Category.findAll({
      include: {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      },
    });

    if (!categotyData) {
      res.status(404).json({ message: 'No category found' });
      return;
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// finds category by id
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      },
    });
    if (!categoryData) {
      res.status(404).json({ message: 'Category not Found' });
      return;
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// creates new category
router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// updates an existing category according to 'id'
router.put('/:id', async (req, res) => {
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!categoryData) {
      res.status(404).json({message:'no category with that ID'});
      return;
    }
    res,statys(200).json(categoryData);
    } catch (err){
      res.status(500).json(err)}
});

// deletes a category according to 'id'
router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No such category found!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;