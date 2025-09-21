<?php
require_once __DIR__ . '/Component.php';

class Counter extends Component
{
    public $count = 0;

    public function increment() { $this->count++; }
    public function decrement() { $this->count--; }

    public function render(): string
    {
        return "
        <div id='{$this->id}' x-data arc:component='Counter'>
            <button arc:click='decrement'>-</button>
            <span arc:model='count'>{$this->count}</span>
            <button arc:click='increment'>+</button>
            <span x-arc-loading.delay.shortest>Shortest delay...</span>
        </div>
        ";
    }
}
