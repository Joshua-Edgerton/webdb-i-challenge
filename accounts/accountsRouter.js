const router = require("express").Router();

const db = require("./accountsDb");
const {
    validateAccount,
    validateAccountId
} = require("./accountsMiddleware");

router.get("/", (req, res) => {
    db.get()
        .then(accounts => res.status(200).json(accounts))
        .catch(err => res.status(500).json({ error: "Failed to get accounts." }))
});

router.get("/:id", validateAccountId, (req, res) => res.status(200).json(req.account));

router.post("/", validateAccount, (req, res) => {
    db.insert(req.body)
        .then(account => res.status(201).json(account))
        .catch(err => res.status(500).json({ error: "Failed to add new account." }))
});

router.put("/:id", validateAccountId, validateAccount, (req, res) => {
    db.update(req.params.id, req.body)
        .then(updated => res.status(201).json(updated))
        .catch(err => res.status(500).json({ error: "Failed to update account." }))
});

router.delete("/:id", validateAccountId, (req, res) => {
    db.remove(req.params.id)
        .then(deleted => res.json(deleted))
        .catch(err => res.status(500).json({ error: "Failed to delete account." }))
})

module.exports = router;