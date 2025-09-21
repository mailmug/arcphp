<?php
require_once __DIR__ . '/../src/Counter.php';

$data = json_decode(file_get_contents("php://input"), true);

$componentName = $data['component'] ?? null;
$method = $data['method'] ?? null;
$id = $data['id'] ?? '';
$state = $data['state'] ?? [];

if (!$componentName || !class_exists($componentName)) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid component"]);
    exit;
}

$component = new $componentName($id, $state);

if ($method && method_exists($component, $method)) {
    $component->$method();
}

echo json_encode([
    "id" => $data['id'],
    "html" => $component->render(),
    "state" => $component->getState()
]);
