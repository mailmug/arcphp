<?php
require_once __DIR__ . '/../src/UserForm.php';

$userForm = new UserForm();
?>
<!DOCTYPE html>
<html>
<head>
    <title>Livewire-like with Alpine</title>
   
</head>
<body>
    <?= $userForm->render(); ?>

    <link rel="stylesheet" href="dist/style.css">
    <script src="dist/bundle.js" defer></script>



</body>
</html>
