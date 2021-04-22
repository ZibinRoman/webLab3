<?ob_end_clean();?>
<?include "conn.php";?>
<?
header('content-type: application/json;charset=utf-8');
$inputJsonData = file_get_contents("php://input");
$inputJson = json_decode($inputJsonData);
$name = $inputJson->name;
$mail = $inputJson->mail;
$text = $inputJson->text;
$mysqli = new mysqli($host, $user, $password, $database);
$query = "INSERT INTO $database.$queryTabOrder (id, name, mail, text) VALUES (NULL, '$name', '$mail', '$text')";
$mysqli->query($query);
$mysqli->close();
include "loadOrder";
?>