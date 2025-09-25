<?php
require_once __DIR__ . '/Component.php';

class Counter extends Component
{
    public $count = 0;

    public function increment() { $this->count++; }
    public function decrement() { $this->count--; }

    public function render(): string
    {
        return <<<HTML
            <div id='{$this->id}' arc:component='Counter'>
                <h1>Count: {$this->count}</h1>

                <input type='number' x-arc-model='count' />

                <button x-arc-click='increment'>+ Add Step</button>
            </div>
        HTML;
    }
}
