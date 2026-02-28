
let map = new Map()

function hello(req, res, next){
     
     console.log("I am a middlewear")
    map.set(req.path, map.get(req.path)+1 || 1)
    console.log(map)


     next()

}

export default hello