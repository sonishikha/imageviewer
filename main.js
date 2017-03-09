function drawImg(uploadedFile, coordinates, canvs) {
    //alert(typeof(coordinates.width));
    var reader = new FileReader();
    reader.onload = function (e) {
        var img = new Image();
        var canvas = canvs[0];
        var ctx = canvas.getContext("2d");
        /*var x = (1024 - height) / 2;
        var y = (1024 - width) / 2;*/
        img.onload = function () {
            canvas.width = coordinates.width;
            canvas.height = coordinates.height;
            ctx.drawImage(img, coordinates.x, coordinates.y, coordinates.width, coordinates.height, 0, 0, coordinates.width, coordinates.height);
        }
        img.src = e.target.result;
    }
    reader.readAsDataURL(uploadedFile);

}

function cropImg(dimensions,allowResize,allowSelect) {
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
    $('#x').val(c.x);
    $('#y').val(c.y);
    $('#w').val(c.w);
    $('#h').val(c.h);
};

function getCoords(){
    return {x:$('#x').val(), y:$('#y').val(), width:$('#w').val(), height:$('#h').val()};
}

$(document).ready(function () {
    var file, crop_type;
    $('#image_file').on('change', function () {
        // from an input element
        file = this.files[0];

        var reader = new FileReader();
        reader.onload = function (e) {
            $('#preview').attr('src', e.target.result);
        }
        reader.readAsDataURL(file);

        /*drawImg(file, 755, 450, $('#horizontal'));
         drawImg(file, 365, 450, $('#vertical'));
         drawImg(file, 365, 212, $('#small_horizontal'));
         drawImg(file, 380, 380, $('#gallery'));*/
    });

    $('.crop_image').on('click', function (e) {
        e.preventDefault();
        crop_type = $(this).text().replace(' ','_').toLowerCase();
        switch (crop_type) {
            case "horizontal":
                cropImg([0,0,755,450],false,false);
                //drawImg(file, 755, 450, $('#horizontal'));
                break;
            case "vertical":
                //drawImg(file, 365, 450, $('#vertical'));
                cropImg([0,0,365,450],false,false);
                break;
            case "small_horizontal":
                cropImg([0,0,365,212],false,false);
                //drawImg(file, 365, 212, $('#small_horizontal'));
                break;
            case "gallery":
                cropImg([0,0,380,380],false,false);
                //drawImg(file, 380, 380, $('#gallery'));
                break;
            case "user_choice": 
                cropImg([0,0,0,0],true,true);
                break;
        }
    });

    $('#crop').on('click',function(e){
        e.preventDefault();
        switch(crop_type){
            case 'horizontal':
                drawImg(file, getCoords(), $('#'+crop_type+''));
                break;
            case 'vertical':
                drawImg(file, getCoords(), $('#'+crop_type+''));
                break;
            case 'small_horizontal':
                drawImg(file, getCoords(), $('#'+crop_type+''));
                break;
            case 'gallery':
                drawImg(file, getCoords(), $('#'+crop_type+''));
                break;
            case 'user_choice':
                drawImg(file, getCoords(), $('#'+crop_type+''));
                break;
        }
    });
});

