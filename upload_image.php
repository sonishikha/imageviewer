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
    ini_set('max_execution_time', 60);
    $filename = $_FILES['image_upload']['name'];
    $basefolder = "./uploads/";
    if (!file_exists($basefolder)) {
        mkdir($basefolder);
        chmod($basefolder, 0777);
    }
//Upload on cloud
    if (isset($_POST['img_coords']) && !empty($_POST['img_coords']) && isset($_POST['img_data']) && !empty($_POST['img_data'])) {
        foreach ($_POST['img_coords'] as $key => $image_coords) {
            if (isset($image_coords) && $image_coords != '') {
                $cloud_img_data = saveImageOnCloud($_FILES["image_upload"]["tmp_name"], $key, json_decode($image_coords), $filename);
                if (is_array($cloud_img_data)) {
                    echo "<div><b>" . ucwords(str_replace('_', ' ', $key)) . "</b></div>";
                    echo "<div>" . cl_image_tag($cloud_img_data['public_id']) . "</div>";
                }
            }
            /*             * ****************Upload on local start****************** */
            if (isset($_POST['img_data'][$key]) && $_POST['img_data'][$key] != '') {
                saveImageOnLocal($filename, $basefolder . $key, $_POST['img_data'][$key]);
            }
            /*             * ***********Upload on local end***************** */
        }
    } else {
        throw new Exception('POST data was not found');
    }
} catch (Cloudinary\Error $e) {
    die('Cloudinary:' . $e->getMessage());
} catch (InvalidArgumentException $e) {
    die('Cloudinary:' . $e->getMessage());
} catch (Exception $e) {
    die($e->getMessage());
}
/* Creates folder on cloud and saves the image in that folder if not exists */

function saveImageOnCloud($file, $folder, $coords, $filename) {
    return \Cloudinary\Uploader::upload($file, array("public_id" => $folder . "/" . substr($filename, 0, strpos($filename, '.')), "width" => $coords->w, "height" => $coords->h, "x" => $coords->x, "y" => $coords->y, "crop" => "crop"));
}

/* Creates folder on local and saves the image in that folder if not exists */

function saveImageOnLocal($filename, $foldername, $img_data) {
    if (!file_exists($foldername)) {
        mkdir($foldername);
        chmod($foldername, 0777);
    }
    return file_put_contents($foldername . "/" . $filename, base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $img_data)));
}

?>