$(document).ready(function () {
    //$('#upload_image').hide();
    $('#image_file').on('change',function () {
        var file = this.files[0];
        if ($.inArray(file['type'],  ['image/gif','image/png','image/jpg','image/jpeg']) < 0) {
            var type_error = "Please upload an image.";
        }
        
        img = new Image();
        img.onload = function() {
            alert(this.width + " " + this.height);
        };
        
    });
});