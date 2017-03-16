/* Reads the content of uploaded file and draw cropped image on canvas using crop co-ordinates */
function drawImg(uploadedFile, crop_type) {
    var coords = $('#coords').data('coords');
    var reader = new FileReader();
    reader.onload = function (e) {
        var img = new Image();
        var canvas = $('#' + crop_type)[0];
        var ctx = canvas.getContext("2d");
        /*var x = (1024 - height) / 2;
         var y = (1024 - width) / 2;*/
        img.onload = function () {
            canvas.width = coords.w;
            canvas.height = coords.h;
            /*
             * ctx.drawImage(img object, image start x, image start y, image end x, image end y,
             * canvas start x, canvas start y, canvas end x, canvas end y);
             *
             */
            ctx.drawImage(img, coords.x, coords.y, coords.w, coords.h, 0, 0, coords.w, coords.h);
            $('#' + crop_type + '_img').val(canvas.toDataURL(uploadedFile.type));
            $('#' + crop_type + '_coords').val(JSON.stringify(coords));
            $('#' + crop_type).parent().show();
            $('#upload_image').show();
        }
        img.src = e.target.result;
    }
    reader.readAsDataURL(uploadedFile);
}
/* Using Javascript library Jcrop to allow the user to select the area to crop */
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
/* Saves the final co-ordinates selected on preview image in a hidden variable which is later used in drawImg function */
function updateCoords(c) {
    $('#coords').data('coords', {x: c.x, y: c.y, w: c.w, h: c.h});
}

$(document).ready(function () {
    var file, crop_type;
    var min_width = 1024;
    var min_height = 1024;
    $('#preview_class, #upload_image').hide();
    /* Validate if image is of 1024x1024 dimension and less than or equal to 2Mb. Preview selected image */
    $('#image_upload').on('change', function () {
        $('#preview').attr('src', '').hide();
        file = this.files[0];
        var reader = new FileReader();
        reader.onload = function (e) {
            if (file.size <= 2000000) {
                var img = new Image();
                img.src = e.target.result;
                img.onload = function () {
                    if (this.width == min_width && this.height == min_height) {
                        $('#preview_class').show();
                        $('#preview').attr('src', e.target.result).show();
                    } else {
                        alert('Please select image file of 1024 X 1024 dimension.');
                    }
                }
            } else {
                alert('Please select image file of size less than 2MB.');
            }

        }
        reader.readAsDataURL(file);
    });
    /* Allow user to select area they want to crop on preview image according to the button clicked */
    $('.crop_image').on('click', function () {
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

    /* Crops the image according to the area selected on preview image */
    $('#crop').on('click', function () {
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

