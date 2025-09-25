<?php
require_once __DIR__ . '/Component.php';

class Counter extends Component
{
    public $count = 0;
    public $step = 5;

    public function increment() { $this->count = $this->count + $this->step; }
    public function decrement() { $this->count--; }

    public function render(): string
    {
        return <<<HTML
            <div id='{$this->id}' arc:component='Counter'>
                <h1>Count: {$this->count}</h1>

                <input type='number' arc-model='count' value="{$this->count}" />

                <button arc-click='increment'>+ Add Step</button>
                <span arc-loading.delay.shortest>Shortest delay...</span>

            </div>
        HTML;
    }
}
