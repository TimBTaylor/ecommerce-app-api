const express = require("express");
const router = express.Router();
const User = require("../models/users");
const cardSchema = require("../models/card");

//add card request
router.post("/:id/add-card", getUser, async (req, res) => {
  try {
    //creates new card schema
    const newCard = new cardSchema({
      name: req.body.name,
      cardNumber: req.body.cardNumber,
      ccv: req.body.ccv,
      expiration: req.body.expiration,
    });
    // add new card to card info list
    res.user.cardInfo.push(newCard);
    await res.user.save();
    return res.status(200).json(res.user.cardInfo);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

//delete card request
router.delete("/:id/delete-card", getUser, async (req, res) => {
  const cardId = req.body.cardId;
  const usersCards = res.user.cardInfo;
  // filters out requested deleted card
  const updatedCard = usersCards.filter((card) => {
    return card._id != cardId;
  });
  res.user.cardInfo = updatedCard;
  try {
    await res.user.save();
    return res.status(200).json(res.user.cardInfo);
  } catch (error) {
    res.status(400).json(error);
  }
});

// update card request
router.put("/:id/update-card", getUser, async (req, res) => {
  const cardId = req.body.cardId;
  const usersCards = res.user.cardInfo;
  // filters out requested updated card
  const newCardList = usersCards.filter((card) => {
    return card._id != cardId;
  });
  const updatedCard = new cardSchema({
    name: req.body.name,
    cardNumber: req.body.cardNumber,
    ccv: req.body.ccv,
    expiration: req.body.expiration,
  });
  res.user.cardInfo = newCardList;
  res.user.cardInfo.unshift(updatedCard);
  try {
    await res.user.save();
    return res.status(200).json(res.user.cardInfo);
  } catch (error) {
    res.status(400).json(error);
  }
});

//get user middleware
async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);

    if (user == null) {
      return res.status(404).json({ message: "Cannot find user" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.user = user;
  next();
}

module.exports = router;