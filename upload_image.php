<?php

include './cloudinary_php-master/src/Cloudinary.php';
include './cloudinary_php-master/src/Uploader.php';
if (file_exists('./cloudinary_php-master/settings.php')) {
    include './cloudinary_php-master/settings.php';
}
$filename = $_FILES['image_upload']['name'];

foreach ($_POST['img_data'] as $key => $val) {
    if (isset($val) && $val != '') {
        $cloud_img_data = saveImageOnCloud($_FILES["image_upload"]["tmp_name"],$key,$val,$filename);
        if(is_array($cloud_img_data)){
            echo "<div><b>".  ucfirst($key)."</b></div>";
            echo "<div>".cl_image_tag($cloud_img_data['public_id'])."</div>";
        }
    }
}

function saveImageOnCloud($file,$folder,$coordinates,$filename){
    $coords = json_decode($coordinates);
    return \Cloudinary\Uploader::upload($file, array("public_id" => $folder . "/" . substr($filename, 0, strpos($filename, '.')), "width" => $coords->w, "height" => $coords->h, "x" => $coords->x, "y" => $coords->y, "crop" => "crop"));
}

/* function fileLocation($directory) {
  return "./uploads/" . $directory . "/" . basename($_FILES["image_upload"]["name"]);
  }

  function saveImgFromImgData($file, $img_data) {
  file_put_contents($file, base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $img_data)));
  } */
?>