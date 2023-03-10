<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'customer_id',
        'status',
        'discount',
        'subtotal',
        'total'
    ];

    protected $casts = [
        'discount' => 'float',
        'subtotal' => 'float',
        'total' => 'float',
    ];

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public static function totalOrder($subtotal, $discount)
    {
        return $subtotal - $discount;
    }

    public static function subtotalOrder($products)
    {
        return collect($products)->reduce(fn ($carry, $item) => $carry + $item['quantity'] * $item['price']);
    }
}
