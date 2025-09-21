# ArcPHP

ArcPHP is a lightweight, reactive PHP component framework inspired by **Laravel Livewire** and **Alpine.js**.  
It allows you to build dynamic, reactive UIs in pure PHP — without writing JavaScript.

---

## ✨ Features

- **Reactive state** → PHP properties stay in sync with the DOM
- **Event actions** → Call PHP methods with `arc:click`, `arc:submit`, etc.
- **Two-way data binding** → `arc:model` keeps inputs and PHP properties synchronized
- **Loading states** → Show placeholders with `x-arc-loading` while updates process
- **Lifecycle hooks** (planned) → `mount`, `hydrate`, `dehydrate`
- **Simple & fast** → No build step, no frontend tooling required

---



# 🚀 Usage

Create a component by extending the Component base class:

```php
<?php
use Arcphp\Component;

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
            <span x-arc-loading.delay.shortest>Loading...</span>
        </div>
        ";
    }
}
```