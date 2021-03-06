<?php
/* Get Spotify Authorization Token */
/*
   PHP is necessary to request the Auth Token
   due to Spotify's CORS policy. This script
   utilizes CURL to request the token and send
   it back to the frontend.
*/

    /* Spotify Application Client ID and Secret Key */
    $client_id     = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'; 
    $client_secret = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';

/* Set options for a cURL transfer */
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, 'https://accounts.spotify.com/api/token');
    curl_setopt($ch, CURLOPT_POST, 1 ); // set as POST
    curl_setopt($ch, CURLOPT_FAILONERROR, true); // fail on error
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Authorization: Basic '.base64_encode($client_id.':'.$client_secret))); // send headers
    curl_setopt($ch, CURLOPT_POSTFIELDS, 'grant_type=client_credentials' ); // send expected parameters
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); // return output

    // Perform a curl session
    $result = curl_exec($ch);

/* If error, return error message */
    if (curl_errno($ch)) {
        $error_msg = curl_error($ch);
        echo json_encode($error_msg);
        // close curl session
        curl_close($ch); 
        die();
    }

/* Return token provided by api */
    // close curl session
    curl_close($ch); 
    $token = json_decode($result, true)['access_token'];
    echo json_encode($token);
    return;
?>
