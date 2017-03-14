function drawImg(uploadedFile, crop_type) {
//    console.log(typeof(coords));
    var coords = $('#x').data('key');
    var reader = new FileReader();
    reader.onload = function (e) {
        var img = new Image();
        var canvas = $('#'+crop_type)[0];
        var ctx = canvas.getContext("2d");
        /*var x = (1024 - height) / 2;
         var y = (1024 - width) / 2;*/
        img.onload = function () {
            canvas.width = coords.w;
            canvas.height = coords.h;
            ctx.drawImage(img, coords.x, coords.y, coords.w, coords.h, 0, 0, coords.w, coords.h);
            //$('#'+crop_type+'_img').val(canvas.toDataURL());
            $('#'+crop_type+'_img').val(JSON.stringify(coords));
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
//    $('#x').val("{x:"+c.x+",y:"+c.y+",w:"+c.w+",h:"+c.h+"}");
    $('#x').data('key',{x:c.x, y:c.y, w:c.w, h:c.h});
    /*$('#y').val(c.y);
    $('#w').val(c.w);
    $('#h').val(c.h);*/
};

function getCoords() {
    //return {x: $('#x').val(), y: $('#y').val(), width: $('#w').val(), height: $('#h').val()};
    return  $('#x').data('key');
}

$(document).ready(function () {
    var file, crop_type;
    var horizontal;
    $('#image_file').on('change', function () {
        // from an input element
        file = this.files[0];

        var reader = new FileReader();
        reader.onload = function (e) {
            $('#preview').attr('src', e.target.result);
        }
        reader.readAsDataURL(file);
    });

    $('.crop_image').on('click', function (e) {
        e.preventDefault();
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
        e.preventDefault();
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
    /*$('#upload_image').on('click', function () {
        $.ajax({
            type: "POST",
            url: "upload_image.php",
            data: {
                horizontal: horizontal
            }
        }).success(function (o) {
            console.log('saved');
            // If you want the file to be visible in the browser 
            // - please modify the callback in javascript. All you
            // need is to return the url to the file, you just saved 
            // and than put the image in your browser.
        });
    });*/
});

