import {PersonPartsM, PersonPartsF} from './PersonParts.js'

const partNames = ['body', 'face', 'eyes', 'nose', 'mouth', 'hair']

function hash(seed, fallback) {
    if (seed === null) return fallback
    let x = seed
    for (let i = 0; i < 10; i++) {
        x = x * x % 100009
    }
    return x
}

const memo = {};

export default function personFactory(seed=null, selector={}) {
    let parts = {}
    let partIdxs = {}
    let gender = (hash(seed, null) || selector['gender']) % 2;
    let PersonParts = gender ? PersonPartsM : PersonPartsF;
    for (let partIdx in partNames) {
        let partName = partNames[partIdx]
        partIdxs[partName] = hash(seed + partIdx + 1, selector[partName] || 0) % PersonParts[partName].length;
        parts[partName] = PersonParts[partName][hash(seed + partIdx + 1, selector[partName] || 0) % PersonParts[partName].length]
    }
    let key = JSON.stringify(partIdxs);

    if (key in memo) {
        return Promise.resolve(memo[key])
    }

    let canvas = document.createElement("canvas")
    canvas.width = 64
    canvas.height = 96
    let ctx = canvas.getContext("2d")
    
    let worker = Promise.resolve()

    for (let partName of partNames) {
        let img = new Image()
        worker = worker.then(() => {
            return new Promise((resolve) => {
                img.onload = function() {
                    ctx.imageSmoothingEnabled = false;
                    ctx.drawImage(img, 0, partName === 'body' ? 32 : 0);
                    resolve()
                }
            })
        })
        img.src = parts[partName]
    }

    worker = worker.then(() => {
        let data = canvas.toDataURL("image/png");
        memo[key] = data;
        return data;
    })

    return worker;
}