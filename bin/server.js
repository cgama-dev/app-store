const app = require('../src/app')

const port =  process.env.PORT || 5001

app.listen(port, ()=> console.log('Api stoker runing'))
