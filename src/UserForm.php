<?php
require_once __DIR__ . '/Component.php';

class UserForm extends Component
{
    public $name;
    public $email;

    public function save() { 
        $this->name = "sdfsdf";
    }

    public function render(): string
    {
        return <<<HTML
            <div arc:component="UserForm" id="cmp_2">
                <form arc-submit.prevent="save">
                    <input type="text"   arc-model="name" />
                    <input type="email"  arc-model="email" />
                    <button type="submit">Save</button>
                </form>
            </div>
        HTML;
    }
}
