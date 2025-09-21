<?php

abstract class Component
{
    public $id;      
    public $state = [];

    public function __construct($id = null, $state = [])
    { 
        $this->id = $id ?? uniqid('cmp_', true);
        foreach ($state as $key => $value) {
            if (property_exists($this, $key)) {
                $this->$key = $value;
            }
        }
    }

    public function getState(): array
    {
        $vars = get_object_vars($this);
        unset($vars['id'], $vars['state']);
        return $vars;
    }

    abstract public function render(): string;
}
