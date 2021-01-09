import {PersonPartsM, PersonPartsF} from './PersonParts.js'

const partNames = ['body', 'face', 'eyes', 'nose', 'mouth', 'mask', 'hair']
const partHeat = [10, 40, 60, 20, -20, 20, 10]

function hash(seed, fallback) {
    if (seed === null) return fallback
    let x = seed
    for (let i = 0; i < 10; i++) {
        x = x * x % 100009
    }
    return x
}

function HSVtoRGB(h, s, v) {
    var r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}

const memo = {};

export default function personFactory(seed=null, selector={}) {
    let parts = {}
    let partIdxs = {}
    let gender = (hash(seed, null) || selector['gender']) % 2;
    let PersonParts = gender ? PersonPartsM : PersonPartsF;
    let useHeat = selector['heat']
    partIdxs['heat'] = useHeat
    for (let partIdx in partNames) {
        let partName = partNames[partIdx]
        partIdxs[partName] = ((partName in selector) ? selector[partName] : hash(seed + partIdx + 1, 0)) % PersonParts[partName].length;
        parts[partName] = PersonParts[partName][partIdxs[partName]]
    }
    let key = JSON.stringify(partIdxs);

    if (key in memo) {
        return Promise.resolve(memo[key])
    }


    if (!useHeat) {
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
                        if (partName === 'body') {
                            ctx.drawImage(img, 0, 32);
                        } else if (partName === 'mask') {
                            ctx.globalCompositeOperation = 'source-atop';
                            ctx.drawImage(img, 0, 0, 64, 64, 16, 24, 32, 32);
                            ctx.globalCompositeOperation = 'source-over';
                        } else {
                            ctx.drawImage(img, 0, 0);
                        }
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
    } else {
        return Promise.resolve().then(() => {
            return Promise.all(partNames.map((partName) => {
                let canvas = document.createElement("canvas")
                canvas.width = 32
                canvas.height = 48
                let ctx = canvas.getContext('2d')
                let img = new Image()
                let worker = new Promise((resolve) => {
                    img.onload = function() {
                        ctx.imageSmoothingEnabled = false;
                        ctx.drawImage(img, 0, partName === 'body' ? 16 : 0, 32, 32);
                        resolve(ctx.getImageData(0, 0, 32, 48))
                    }
                })
                img.src = parts[partName]
                return worker
            }))
        }).then((imageDatas) => {
            for (let i = 0; i < imageDatas.length; i++) {
                let imageData = imageDatas[i];
                let imageStrength = partHeat[i];
                for (let j = 0; j < imageData.data.length; j += 4) {
                    if (imageData.data[j + 3] !== 0) {
                        imageData.data[j] = imageStrength
                    } else {
                        imageData.data[j] = 0
                    }
                }
                if (i !== 0) {
                    let baseImageData = imageDatas[0];
                    for (let j = 0; j < imageData.data.length; j += 4) {
                        baseImageData.data[j] += imageData.data[j]
                    }
                } else {
                    for (let j = 0; j < imageData.data.length; j += 4) {
                        imageData.data[j + 1] = 0
                        imageData.data[j + 2] = 0
                        imageData.data[j + 3] = 255
                    }
                }
            }
            const canvas = document.createElement("canvas")
            canvas.width = 32
            canvas.height = 48
            const ctx = canvas.getContext('2d');
            ctx.putImageData(imageDatas[0], 0, 0);

            const canvas2 = document.createElement("canvas")
            canvas2.width = 32
            canvas2.height = 48
            const ctx2 = canvas2.getContext('2d');
            ctx2.filter = 'blur(3px)';
            ctx2.drawImage(canvas, 0, 0);

            const finalData = ctx2.getImageData(0, 0, 32, 48)
            for (let i = 0; i < finalData.data.length; i += 4) {
                let pxData = HSVtoRGB(0.75 - useHeat * useHeat * useHeat - finalData.data[i] / 120, 1, 1)
                console.log(pxData)
                finalData.data[i] = pxData.r
                finalData.data[i + 1] = pxData.g
                finalData.data[i + 2] = pxData.b
                finalData.data[i + 3] = 255
            }
            ctx2.putImageData(finalData, 0, 0);

            let data = canvas2.toDataURL("image/png");
            memo[key] = data;
            return data;
        })
    }
}