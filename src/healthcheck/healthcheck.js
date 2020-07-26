const router = require('express').Router()
const fetch = require('node-fetch')
const cron = require('node-cron')

// Keep API Alive
if (process.env.KEEP_UP != 'false') {
    cron.schedule(process.env.CRON_TIME_DEFAULT , () => fetch(process.env.API_URL).then(() => console.info('ping...')))
}

// Health Check Endpoint
router.get('/', async (req, res) => { res.json({status: 'ok'}) })

module.exports = router