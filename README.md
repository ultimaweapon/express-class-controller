# Express Class Controller

This is a Node.js module to supports defining requests handler for Express on the class.
Its fully support TypeScript and dependency injection.

## Installation

```sh
npm install express-class-controller
```

## ES6 Example

```js
// index.js
const express = require('express')
const router = require('./router')

const app = express()

app.use('/', router)
app.listen(8080)
```

```js
// router.js
const express = require('express')
const ControllerFactory = require('./controllers')
const ValuesController = require('./controllers/values-controller')

const router = express.Router()
const factory = new ControllerFactory()

router.get('/', factory.requestHandler(ValuesController, c => c.get))

module.exports = router
```

```js
// controllers/index.js
const ExpressController = require('express-class-controller')

class ControllerFactory extends ExpressController.Factory {
  createController(id) {
    if (typeof id === 'function') {
      return new id()
    } else {
      throw new Error('not implemented')
    }
  }
}

module.exports = ControllerFactory
```

```js
// controllers/values-controller/index.js
class ValuesController {
  constructor() {
    this.value = 'foo'
  }

  get(req, res) {
    res.send(this.value)
  }
}

module.exports = ValuesController
```
