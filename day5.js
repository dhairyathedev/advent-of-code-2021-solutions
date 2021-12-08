const fs = require('fs');
const read = fs.readFileSync("input.txt");
let data= read.toString().split("\n").map(row => {
  return row.split(' -> ').map(pos => pos.split(',').map(Number))
});

function day05(part){
    let positions = {}

    for(const [[startX, startY], [endX, endY]] of data) {
        let arrX = [Math.min(startX, endX),Math.max(startX, endX)]
        let arrY = [Math.min(startY, endY),Math.max(startY, endY)] 
            if(startX==endX || startY==endY){
                for(let x=arrX[0]; x<=arrX[1]; x++){
                    for(let y=arrY[0]; y<=arrY[1]; y++){
                        let pos = `${x}-${y}`
                        positions[pos] = positions[pos] ? positions[pos]+=1 : 1
                    }
                }
            }else if(part=='two'){
                let xdown = startX > endX
                let ydown = startY > endY
                let pos
                y = startY
                if(xdown){
                    for(let x=startX; x>=endX; x--){   
                        pos = `${x}-${y}`
                        positions[pos] = positions[pos] ? positions[pos]+=1 : 1
                        ydown ? y-- : y++
                    }
                }else{
                    for(let x=startX; x<=endX; x++){   
                        pos = `${x}-${y}`
                        positions[pos] = positions[pos] ? positions[pos]+=1 : 1
                        ydown ? y-- : y++
                    }    
                }
            }  
    }
    
    Object.filter = (obj, predicate) => 
        Object.keys(obj)
              .filter( key => predicate(obj[key]) )
              .reduce( (res, key) => (res[key] = obj[key], res), {} );
              
    let filtered = Object.filter(positions, qty => qty > 1); 
    console.log(`Part ${part} = ${Object.keys(filtered).length}`)
}

day05('one')
day05('two')
