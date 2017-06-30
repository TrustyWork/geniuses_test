const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
	res.send('Hi. i`m root API Route')
});

module.exports = router;
