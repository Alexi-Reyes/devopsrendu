<?php
$env = parse_ini_file('.env');

$adminer['default_db'] = $env['DEFAULT_DB'];
$adminer['default_user'] = $env['DEFAULT_USER'];
?>