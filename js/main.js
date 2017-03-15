function drawImg(uploadedFile, crop_type) {
    var coords = $('#coords').data('key');
    var reader = new FileReader();
    reader.onload = function (e) {
        var img = new Image();

        //$('#crop_preview').append('<div> <canvas id='+crop_type+'></canvas></div>');
        var canvas = $('#' + crop_type)[0];
        var ctx = canvas.getContext("2d");
        /*var x = (1024 - height) / 2;
         var y = (1024 - width) / 2;*/
        img.onload = function () {
            canvas.width = coords.w;
            canvas.height = coords.h;
            ctx.drawImage(img, coords.x, coords.y, coords.w, coords.h, 0, 0, coords.w, coords.h);
            //$('#'+crop_type+'_img').val(canvas.toDataURL());
            $('#' + crop_type + '_img').val(JSON.stringify(coords));
            $('#' + crop_type).parent().show();
            $('#upload_image').show();
        }
        img.src = e.target.result;
    }
    reader.readAsDataURL(uploadedFile);
}
function cropImg(dimensions, allowResize, allowSelect) {
    $('#preview').Jcrop({
        onChange: updateCoords,
        onSelect: updateCoords,
        setSelect: dimensions,
        allowResize: allowResize,
        allowSelect: allowSelect,
        allowMove: true
    });
}
function updateCoords(c) {
    $('#coords').data('key', {x: c.x, y: c.y, w: c.w, h: c.h});
}
;
function getCoords() {
    return  $('#coords').data('key');
}

$(document).ready(function () {
    var file, crop_type;
    $('#preview_class, #upload_image').hide();
    $('#image_upload').on('change', function () {
        $('#preview').attr('src', '').hide();
        file = this.files[0];
        var reader = new FileReader();
        reader.onload = function (e) {
            if (file.size < 2000000) {
                var img = new Image();
                img.src = e.target.result;
                //img.onload = function () {
                if (img.width == $('#min_width').val() && img.height == $('#min_height').val()) {
                    $('#preview_class').show();
                    $('#preview').attr('src', e.target.result).show();
                } else {
                    alert('Please select image file of 1024 X 1024 dimention.');
                }
                //}
            } else {
                alert('Please select image file of size less than 2MB.');
            }

        }
        reader.readAsDataURL(file);
    });
    $('.crop_image').on('click', function (e) {
        //e.preventDefault();
        crop_type = $(this).text().replace(' ', '_').toLowerCase();
        switch (crop_type) {
            case "horizontal":
                cropImg([0, 0, 755, 450], false, false);
                break;
            case "vertical":
                cropImg([0, 0, 365, 450], false, false);
                break;
            case "small_horizontal":
                cropImg([0, 0, 365, 212], false, false);
                break;
            case "gallery":
                cropImg([0, 0, 380, 380], false, false);
                break;
            case "user_choice":
                cropImg([0, 0, 0, 0], true, true);
                break;
        }
    });
    $('#crop').on('click', function (e) {
        //e.preventDefault();
        switch (crop_type) {
            case 'horizontal':
                drawImg(file, crop_type);
                break;
            case 'vertical':
                drawImg(file, crop_type);
                break;
            case 'small_horizontal':
                drawImg(file, crop_type);
                break;
            case 'gallery':
                drawImg(file, crop_type);
                break;
            case 'user_choice':
                drawImg(file, crop_type);
                break;
        }
    });
});

