$(document).ready(function () {
    $('#image_file').on('change', function () {
        // from an input element
        var file = this.files[0];
        drawImg(this.files[0], 755, 450, $('#horizontal'));
        drawImg(this.files[0], 365, 450, $('#vertical'));
        drawImg(this.files[0], 365, 212, $('#small_horizontal'));
        drawImg(this.files[0], 380, 380, $('#gallery'));
    });
});

function drawImg(uploadedFile, width, height, canvs) {
    var reader = new FileReader();
    reader.onload = function (e) {
        var img = new Image();
        var canvas = canvs[0];
        var ctx = canvas.getContext("2d");
        var x = (1024 - height) / 2;
        var y = (1024 - width) / 2;
        img.onload = function () {
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, x, y, width, height,0,0,width,height);
        }
        img.src = e.target.result;
    }
    reader.readAsDataURL(uploadedFile);

}