const fs = require('fs')
fs.writeFileSync('./.env', `NUXT_PUBLIC_PAYMENT_TOKEN = ${process.env.NUXT_PUBLIC_PAYMENT_TOKEN}`)