const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// finds all tags
router.get('/', async(req, res) => {
  try{
    const tagData= await Tag.findAll({
      include: {
        model: Product,
        attributes:['id', 'product_name', 'price', 'stock', 'category_id']
      },
    });
    if (!tagData){
      res.status(404).json("No Tags Found");
      return;
    }
    res.status(200).json(tagData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

// finds single tags by id 
router.get('/:id', async(req, res) => {
  try{
    const tagData = await Tag.findByPk(req.params.id, {
      include: {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      },
    });
    if(!tagData){
      res.status(404).json("No Tag found with this ID!");
      return;
    }
    res.status(200).json(tagData);
    }catch(err){
      res.status(500).json(err)
    }
});

// Creates new tag
router.post('/', async(req, res) => {
  try{
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  }catch (err){
    res.status(400).json(err)
  }
  });

  // Updates tag name by id 
router.put('/:id', async(req, res) => {
  try{
    const tagData = await Tag.update(req.body,{
      where : {
        id: req.params.id
      },
    });
    if (!tagData){
      res.status(404).json('Tag not updated');
      return;
    }
    res.status(200).json(tagData);
  }catch (err){
    res.status (500).json(err);
  }
});

// Deletes a tag by its `id` value
router.delete('/:id', async(req, res) => {
  try{
    const tagData=await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    if(!tagData){
      res.status(404).json('That tag does not exist!');
      return;
  }
  res.status(200).json(tagData);
  } catch (err){
    res.status(500).json(err);
  }
});

module.exports = router;