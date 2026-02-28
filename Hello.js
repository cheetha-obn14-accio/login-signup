class Hello{

    a(){
        console.log("A")
        this.x = 10
    }
    b(){
        console.log("B")
    }
}

let obj = new Hello() 
obj.a()

console.log(obj)