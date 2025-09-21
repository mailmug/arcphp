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

     <!-- Alpine.js -->
   <!-- Alpine Plugins -->

       <script src="dist/bundle.js" defer></script>

        <script defer src="https://cdn.jsdelivr.net/npm/@alpinejs/morph@3.x.x/dist/cdn.min.js" defer></script>
        
        <!-- Alpine Core -->
        <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js" defer></script>


     
    <script>
        document.addEventListener("alpine:init", () => {
            console.log("alpine:init triggered");
        });
        document.addEventListener("alpine:initialized", () => {
            console.log("alpine:initialized triggered");
        });
    </script>

</body>
</html>
