<?php
define("DB_SERVER", "localhost");
define("DB_USER", "root");
define("DB_PASS", "regnaDkciN");
define("DB_NAME", "formio");

define("ASSETS_FOLDER", "/file_uploads/");
$assets = $_SERVER['DOCUMENT_ROOT'];
$index = strpos($assets, 'admin');
$assets = substr($assets, 0, $index);
define("ASSETS_PATH", $assets . "assets" . ASSETS_FOLDER);
?>
