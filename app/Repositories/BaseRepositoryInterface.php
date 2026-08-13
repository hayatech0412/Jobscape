<?php

namespace App\Repositories;

interface BaseRepositoryInterface
{
    public function existsBy(array $whereIn);
    public function find($id);
    public function create(array $params);
    public function insert(array $params);
    public function all();
    public function delete($id);
    public function findOrFail($id);
    public function updateOrCreate(array $arrayFind, $arrayCreate = ['*']);
}
