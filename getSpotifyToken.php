<?php

/* Spotify Application Client ID and Secret Key */
$client_id     = 'aa050857df1b4347bf4e966f4154dba8'; 
$client_secret = 'a5e045c7cab346588913fc51608f5c50';

/* Get Spotify Authorization Token */
$result = exec('curl -X "POST" -H "Authorization: Basic '.base64_encode($client_id.':'.$client_secret).'" -d grant_type=client_credentials https://accounts.spotify.com/api/token');
$token = json_decode($result, true)['access_token'];
echo json_encode($token);

/* Test query */
/*
echo "<pre>"; 
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://api.spotify.com/v1/tracks/2TpxZ7JUBn3uw46aR7qd6V');
curl_setopt($ch, CURLOPT_FAILONERROR, true); // Required for HTTP error codes to be reported via our call to curl_error($ch)
curl_setopt($ch, CURLOPT_HTTPHEADER,     array('Authorization: Bearer '.$token)); 
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); // forces curl_exec() to return page as a string

$json = curl_exec($ch);
curl_close($ch);

if (curl_errno($ch)) {
    $error_msg = curl_error($ch);
    //print_r (json_decode($error_msg,true));
}
curl_close($ch);
if (isset($error_msg)) {
    // TODO - Handle cURL error accordingly
    //print_r (json_decode($error_msg,true));
}*/
//echo json_encode(json_decode($json), JSON_PRETTY_PRINT);
//echo "</pre>";
?>