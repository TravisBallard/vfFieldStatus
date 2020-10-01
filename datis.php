<?php

  /**
   * Proxy for https://datis.clowd.io/api/ that has CORS headers
   */

  if (empty($_REQUEST['iata'])) {
    http_response_code(400);
    die();
  }

  $iata = filter_var($_REQUEST['iata'], FILTER_VALIDATE_REGEXP, array('options' => array(
    'regexp' => '/^([A-z]+)$/'
  )));

  if (!$iata) {
    http_response_code(400);
  } else  {
    $ch = curl_init(sprintf('https://datis.clowd.io/api/%s?c=%d', $iata , time()));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $result = curl_exec($ch);

    header('Content-Type: application/json');
    header('Cache-Control: no-store');
    print $result;
  }
