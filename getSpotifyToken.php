<?php

/* Spotify Application Client ID and Secret Key */

// !!! Make sure to keep these secret !!!
$client_id     = 'aa050857df1b4347bf4e966f4154dba8'; 
$client_secret = 'a5e045c7cab346588913fc51608f5c50';

/* Get Spotify Authorization Token */

/* Basic exec curl example
// $result = exec('curl -X "POST" -H "Authorization: Basic '.base64_encode($client_id.':'.$client_secret).'" -d grant_type=client_credentials https://accounts.spotify.com/api/token');
// $token = json_decode($result, true)['access_token'];
// echo json_encode($token);


/* PHP curl function example */
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://accounts.spotify.com/api/token');
curl_setopt($ch, CURLOPT_POST, 1 );
curl_setopt($ch, CURLOPT_FAILONERROR, true); 
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Authorization: Basic '.base64_encode($client_id.':'.$client_secret)));
curl_setopt($ch, CURLOPT_POSTFIELDS, 'grant_type=client_credentials' ); 
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

$result = curl_exec($ch);

// Return Error
if (curl_errno($ch)) {
    $error_msg = curl_error($ch);
    echo json_encode($error_msg);
    die();
}

// Return Token;
curl_close($ch);
$token = json_decode($result, true)['access_token'];
echo json_encode($token);
return;
?>