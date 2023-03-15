<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\StoreOrderRequest;
use App\Http\Requests\UpdateOrderRequest;
use App\Models\Order;

class OrderController extends BaseController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $orders = Order::with('items', 'items.product', 'customer')->orderBy('created_at', 'desc')->get();

        if (!$orders) {
            return $this->sendError($orders, "Não há nenhum Pedido cadastrado.");
        }

        return $this->sendResponse($orders);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOrderRequest $request)
    {
        $subtotal = Order::subtotalOrder($request->products);
        $total = Order::totalOrder($subtotal, $request->discount);

        $order = new Order();
        $order->customer_id = $request->customer_id;
        $order->status = "Aberto";
        $order->discount = $request->discount;
        $order->subtotal = $subtotal;
        $order->total = $total;
        $order->save();

        foreach ($request->products as $product) {
            $order->items()->create([
                'product_id' => $product['id'],
                'quantity' => $product['quantity'],
                'price' => $product['price'],
            ]);
        }

        return $this->sendResponse($order, 'Pedido cadastrado com sucesso.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        if (!$order) {
            return $this->sendError($order, "Pedido não encontrado");
        }

        return $this->sendResponse($order->with('items', 'customer')->where('id', $order->id)->first());
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOrderRequest $request, Order $order)
    {
        $subtotal = Order::subtotalOrder($request->products);
        $total = Order::totalOrder($subtotal, $request->discount);

        $order->customer_id = $request->customer_id;
        $order->status = $request->status;
        $order->discount = $request->discount;
        $order->subtotal = $subtotal;
        $order->total = $total;
        $order->save();

        $order->items()->delete();

        foreach ($request->products as $product) {
            $order->items()->create([
                'product_id' => $product['id'],
                'quantity' => $product['quantity'],
                'price' => $product['price'],
            ]);
        }

        return $this->sendResponse($order, 'Pedido Atualizado com sucesso.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        $order->items()->delete();
        $order->delete();
        return $this->sendResponse([], 'Pedido excluído com sucesso.');
    }
}
