const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  try {
    Category.findAll({
      include: [Product]
    });
    (categories) => {
      res.json(categories)
    }
  }
  catch (err) {
    res.status(500).json(err)
  }
  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  try {
    Category.findOne({
      where: {
        id: req.params.id,
      },
      include: [Product],
    })
  }
  catch (err) {
    res.status(500).json(err)
  }
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  // create a new category
  try {
    Category.create(req.body);
    (category) => {res.status(200).json(category)};
  }
  catch (err) {
    res.status(500).json(err)
  }
});

router.put('/:id', (req, res) => {
  try {
    Category.update(req.body, {
    where: {
      id: req.params.id
      }
    });
    (category) => {res.status(200).json(category)}
  }
  catch (err){
    res.status(500).json(err)
  }
});

router.delete('/:id', (req, res) => {
  try {
    Category.destroy(req.body, {
    where: {
      id: req.params.id
    }
  });
    (category) => res.status(200).json(category)
  }
  catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
