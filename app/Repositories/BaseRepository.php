<?php

namespace App\Repositories;

use Illuminate\Database\Eloquent\ModelNotFoundException;

abstract class BaseRepository implements BaseRepositoryInterface
{
    public $model;

    public function __construct()
    {
        $this->makeModel();
    }

    abstract public function model();

    public function makeModel()
    {
        $this->model = app()->make($this->model());
    }

    public function allPaginated($perPage = 10)
    {
        return $this->model::paginate($perPage);
    }

    /**
     * Get first.
     *
     * @return mixed
     */
    public function existsBy(array $where)
    {
        return $this->model->where($where)->exists();
    }

    /**
     * Get by id.
     *
     * @return mixed
     */
    public function find($id)
    {
        return $this->model->find($id);
    }

    /**
     * Create.
     *
     * @return mixed
     */
    public function create(array $params)
    {
        return $this->model->create($params);
    }

    /**
     * Insert.
     *
     * @return mixed
     */
    public function insert(array $params)
    {
        return $this->model->insert($params);
    }

    /**
     * All.
     *
     * @return mixed
     */
    public function all()
    {
        return $this->model->all();
    }

    /**
     * Delete by id
     *
     * @return mixed
     */
    public function delete($id)
    {
        return $this->model->find($id)->delete();
    }

    /**
     * Get one
     *
     * @return mixed
     */
    public function findOrFail($id)
    {
        try {
            $result = $this->model->findOrFail($id);
        } catch (\Exception $e) {
            throw new ModelNotFoundException($e->getMessage(), 0);
        }

        return $result;
    }

    public function updateOrCreate(array $arrayFind, $arrayCreate = ['*'])
    {
        return $this->model->updateOrCreate($arrayFind, $arrayCreate);
    }

    public function update($id, array $params)
    {
        return $this->model->find($id)->update($params);
    }
}
