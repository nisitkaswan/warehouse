const express = require('express');
const router = express.Router();
const Container = require('../models/Container');
const Inventory = require('../models/Inventory');

/* GET users listing. */
router.post('/', async function (req, res, next) {

  const { type } = req.body;


  try {

    const container = await Container.create({ type, container: null, inventory: null });

    res.status(200).send({ message: 'Success', data: container });
  } catch (error) {
    console.log(error)
    return res.status(500).send(error);
  }


});

router.get('/', async function (req, res, next) {

  try {
    const containers = await Container.find({}).populate({ path: 'inventory', select: 'items' })
      .populate({ path: 'container' });
    res.status(200).send(containers);
  } catch (error) {
    console.log(error);
    res.send(error).status(500);
  }
});

router.put('/:id', async function (req, res, next) {

  const { inventoryId, containerId } = req.body;


  try {

      const container = await Container.findOne({ _id: req.params.id, container: null });

      if (!container) {
        return res.status(404).send({message: 'Cant find empty container with the given id ' + req.params.id});
      }

      if (container.type === 'rack' && inventoryId)
        return res.status(400).send({message: 'You cant store inventory in Container of rack type' });

      if (container.type === 'paperbag' && containerId)
        return res.status(400).send({message: 'You cant store container inside paperbag'});


    await container.update({ container: containerId, inventory: inventoryId }, { runValidators: true, new: true });

    res.status(200).send({ message: "Succes" });

  } catch (error) {
    console.log(error);
    res.status(500).send(error)
  }



});

router.delete('/:id', async (req, res, next) => {
  try {

    const container = await Container.findOne({ _id: req.params.id })
    if (!container)
    {
      return res.status(404).send({ message: 'Container Not Found' });
    }
    container.remove();
    res.status(200).send({ message: "Deleted successfully!" });
  } catch (error) {
    res.status(500).send(error);
  }
 });


module.exports = router;