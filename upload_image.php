<?php

/*
 * Adding required files to upload image on cloud Cloudinary
 * http://cloudinary.com/
 * Username: shikha.soni08@outlook.com
 * Password: shikha@123
 */

require_once './cloudinary_php-master/src/Cloudinary.php';
require_once './cloudinary_php-master/src/Uploader.php';
if (file_exists('./cloudinary_php-master/settings.php')) {
    require_once './cloudinary_php-master/settings.php';
}
try {
    $filename = $_FILES['image_upload']['name'];

//Upload on cloud
    foreach ($_POST['img_coords'] as $key => $image_coords) {
        if (isset($image_coords) && $image_coords != '') {
            $cloud_img_data = saveImageOnCloud($_FILES["image_upload"]["tmp_name"], $key, $image_coords, $filename);
            if (is_array($cloud_img_data)) {
                echo "<div><b>" . ucwords(str_replace('_', ' ', $key)) . "</b></div>";
                echo "<div>" . cl_image_tag($cloud_img_data['public_id']) . "</div>";
            }
        }
        /*         * ****************Upload on local start****************** */
        if (isset($_POST['img_data'][$key]) && $_POST['img_data'][$key] != '') {
            saveImageOnLocal($filename, "./uploads/" . $key, $_POST['img_data'][$key]);
        }
        /*         * ***********Upload on local end***************** */
    }
} catch (Cloudinary\Error $e) {
    die('Cloudinary:' . $e->getMessage());
} catch (InvalidArgumentException $e) {
    die('Cloudinary:' . $e->getMessage());
} catch (Exception $e) {
    die($e->getMessage());
}
/* Creates folder on cloud and saves the image in that folder if not exists */

function saveImageOnCloud($file, $folder, $coordinates, $filename) {
    $coords = json_decode($coordinates);
    return \Cloudinary\Uploader::upload($file, array("public_id" => $folder . "/" . substr($filename, 0, strpos($filename, '.')), "width" => $coords->w, "height" => $coords->h, "x" => $coords->x, "y" => $coords->y, "crop" => "crop"));
}

/* Creates folder on local and saves the image in that folder if not exists */

function saveImageOnLocal($filename, $foldername, $img_data) {
    if (!file_exists($foldername)) {
        mkdir($foldername);
        chmod($foldername, 0777);
    }
    $file = $foldername . "/" . $filename;
    return file_put_contents($file, base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $img_data)));
}

?>