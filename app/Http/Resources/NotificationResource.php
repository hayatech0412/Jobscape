<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class NotificationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'source' => $this->when($this->user, fn() => new UserResource($this->user)),
            'target' => $this->when($this->user, fn() => new UserResource($this->user)),
            'product' => $this->when($this->product, fn() => new ProductResource($this->product)),
            'source_id' => $this->source_id,
            'target_id' => $this->target_id,
            'product_id' => $this->product_id,
            'title' => $this->title,
            'content' => $this->content,
            'is_read' => $this->is_read,
            'read_ids' => $this->read_ids,
            'is_read_by_auth' => $this->is_read_by_auth,
            'created_at' => $this->created_at,
            'created_at_jp' => $this->created_at->format('Y年m月d日 H:i'),
        ];
    }
}
