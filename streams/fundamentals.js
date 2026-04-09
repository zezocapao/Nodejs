/*Fundamentos de Streams*/ 

import { Readable, Writable, Transform } from "node:stream";

class OneToHundredStream extends Readable {
    index = 1
    _read() {
        const i = this.index++

        setTimeout(() => {
            if (i > 100) {
                this.push(null)
            } else {
                const buf = Buffer.from(String(i))

                this.push((buf + "\n"))
            }            
        }, 500); 
    }
}

class multiplyByTenStream extends Writable {
    _write(chunk, encoding, callback) {
        console.log(Number(chunk.toString() * 10));
        callback();
    }
}

class modulonegativo extends Transform {
    _transform(chunk, encoding, callback) {
        const number = Number(chunk.toString()) * -1
        callback(null, Buffer.from(String(number)))
    }
}




new OneToHundredStream().pipe(new modulonegativo()).pipe(new multiplyByTenStream())