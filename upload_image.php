<?php

//chmod($target_dir, 0777);
$main_file = "./uploads/main/" . basename($_FILES["image_file"]["name"]);
$horizontal_file = "./uploads/horizontal/" . basename($_FILES["image_file"]["name"]);

/* if (file_exists($target_file)) {
  echo "Sorry, file already exists.";
  $uploadOk = 0;
  }

  // Check if $uploadOk is set to 0 by an error
  if ($uploadOk == 0) {
  echo "Sorry, your file was not uploaded.";
  // if everything is ok, try to upload file
  } else { */
if (move_uploaded_file($_FILES["image_file"]["tmp_name"], $main_file)) {
    echo "The file " . basename($_FILES["image_file"]["name"]) . " has been uploaded.";
} else {
    echo "Sorry, there was an error uploading your file.";
}

$im = imagecreatefrompng($main_file);
//$size = min(imagesx($im), imagesy($im));
$im2 = imagecrop($im, ['x' => 0, 'y' => 0, 'width' => 755, 'height' => 450]);
if ($im2 !== FALSE) {
    $img = imagepng($im2, $horizontal_file);
    if(move_uploaded_file($img, $horizontal_file)){
        echo "shikha";
    }else{
        echo "bye";
    }
}else{
    echo "hiii";
}
/* } */
?>