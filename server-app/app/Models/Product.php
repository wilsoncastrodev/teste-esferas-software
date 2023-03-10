<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        "code",
        "name",
        "description",
        "price",
    ];

    protected $casts = ['price' => 'float'];

    public static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $id = Product::all()->max('id') + 1;
            $model->code = 'ESFERAS' . str_pad($id, 6, '0', STR_PAD_LEFT);
        });
    }

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }
}
