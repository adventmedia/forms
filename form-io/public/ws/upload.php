<?php
include_once ('credentials.php');

$postdata = json_decode(file_get_contents("php://input"));
$result = uploadAsset($_FILES, (object)$_POST);
echo json_encode($result);

function uploadAsset($files, $info) {
	$response = (object)array("success" => false, "message" => "server error");
	if (count($files) > 0) {
		$file = (object)$files['file'];
		$mime_types = array('jpeg', 'gif', 'png', 'pdf', 'mp3', 'mp4');
		$mime_type = explode('/', strtolower($file->type))[1];
		if (in_array($mime_type, $mime_types) === false) {
			$response->message = 'Invalid asset type: ' . $file->type;
			return $response;
		}
		//TODO: check for file size
		if ($file->size > 2000000) {
			$response->message = "File size exceeds 2 MB limit";
			return $response;
		}
		$tgt = ASSETS_PATH;
		$ok = move_uploaded_file($file->tmp_name, $tgt . $file->name);
		if (!$ok) {
			return $response;
		}

		/*$book = $info->cover === 'true' ? 1 : 0;
		$query = "INSERT INTO assets (type, caption, tag, url, cover, active) VALUES (?, ?, ?, ?, ?, ?)";
		$params = array($info->type, $info->caption, $info->tag, $file->name, $book, true);
		$result = $this->_db->query($query, $params);
		if ($result) {
			$response->success = true;
			$response->message = '';
		}*/
		return $response;
	}
}
