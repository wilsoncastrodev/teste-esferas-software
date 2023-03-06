<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\StoreCustomerRequest;
use App\Http\Requests\UpdateCustomerRequest;
use App\Models\Customer;

class CustomerController extends BaseController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $customers = Customer::all();

        if ($customers) {
            return $this->sendError($customers, "Não há nenhum Cliente cadastrado.");
        }

        return $this->sendResponse($customers);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCustomerRequest $request)
    {
        $customer = Customer::create($request->all());
        return $this->sendResponse($customer, 'Cliente cadastrado com sucesso.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Customer $customer)
    {
        if (!$customer) {
            return $this->sendError($customer, "Cliente não encontrado");
        }

        return $this->sendResponse($customer);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCustomerRequest $request, Customer $customer)
    {
        $customer->update($request->except(['_method']));
        return $this->sendResponse($customer, 'Cliente atualizado com sucesso.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Customer $customer)
    {
        $customer->delete();
        return $this->sendResponse([], 'Cliente excluído com sucesso.');
    }
}
