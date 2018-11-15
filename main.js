(() => {
    const init = () => {
        // alert('OK');
        const inputImg = document.getElementById('fl');
        const groupName = document.getElementById('nm');

        const canvas = document.getElementById('cv');
        const ctx = canvas.getContext('2d');

        const height = 500;
        const width = 400;

        canvas.height = height;
        canvas.width = width;

        document.getElementById('gn').addEventListener('click', () => {
            // alert('OK');
            let img = new Image();
            let imgData = inputImg.files[0];
            let imgUrl = URL.createObjectURL(imgData);

            img.onload = () => {
                // alert('OK');
                ctx.clearRect(0, 0, width, height);

                let raito = height / img.height;
                let w = img.width * raito;
                ctx.drawImage(img, 0, 0, w, height);

                let ctxImg = ctx.getImageData(0, 0, width, height);
                let ctxImgData = ctxImg.data;

                for (let i = 0; i < ctxImgData.length; i += 4) {
                    let level = 100;

                    ctxImgData[i + 0] -= level;
                    ctxImgData[i + 1] -= level;
                    ctxImgData[i + 2] -= level;
                }

                ctx.putImageData(ctxImg, 0, 0);

                let size = 100;
                let fixYpos = 40;
                let x = width / 2 - size / 2;
                let y = height / 2 - size / 2;

                let fontSize = 28;
                let padding = 24;

                ctx.beginPath();
                ctx.fillStyle = '#FFF';
                ctx.textAlign = 'center';
                ctx.font = `${fontSize}px Hiragino Kaku Gothic Pro`;
                ctx.fillText(groupName.value, width / 2, y + fixYpos + size + fontSize / 2 + padding);
                
                // ctx.beginPath();
                // ctx.fillStyle = '#F2F2F2';
                // ctx.moveTo(0, height - 70);
                // ctx.lineTo(width, height - 70);
                // ctx.lineTo(width, height);
                // ctx.lineTo(0, height);
                // ctx.fill();

                ctx.beginPath();
                ctx.arc(width / 2, height / 2 + fixYpos, size / 2, 0, Math.PI * 2, false);
                ctx.clip();

                ctx.drawImage(img, x, y + fixYpos, size, size);

                ctxImg = ctx.getImageData(0, 0, width, height);
                ctxImgData = ctxImg.data;

                for (let i = 0; i < ctxImgData.length; i += 4) {
                    let level = (ctxImgData[i + 0] + ctxImgData[i + 1] + ctxImgData[i + 2]) / 3;

                    ctxImgData[i + 0] = level;
                    ctxImgData[i + 1] = level;
                    ctxImgData[i + 2] = level;
                }

                ctx.putImageData(ctxImg, 0, 0);
            };

            img.src = imgUrl;
        });
    };

    onload = init;
})();