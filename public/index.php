<?php
require_once __DIR__ . '/../src/Counter.php';

$counter = new Counter();
?>
<!DOCTYPE html>
<html>
<head>
    <title>Livewire-like with Alpine</title>
   
</head>
<body>
    <?= $counter->render(); ?>

    <link rel="stylesheet" href="dist/style.css">
    <script src="dist/bundle.js" defer></script>



</body>
</html>
