
// create a new GeoStore using Memory and an RTree Index
var store = new Terraformer.GeoStore({
    store: new Terraformer.Store.Memory(),
    index: new Terraformer.RTree()
  });


export default function handler(req, res) {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ name: 'John Doe' }))
  }