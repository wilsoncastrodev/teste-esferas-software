<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateOrderRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'customer_id' => 'required',
            'products.*.id' => 'required',
            'products.*.quantity' => 'required',
            'products.*.price' => 'required',
            'discount' => 'required',
            'status' => 'required',
        ];
    }

    /**
     * Get the validation messages that apply to the request.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'customer_id.required' => 'O Id do Cliente é obrigatório',
            'products.*.id.required' => 'O Id do Produto é obrigatório',
            'products.*.quantity.required' => 'A Quantidade do Produto é obrigatória',
            'products.*.price.required' => 'O Preço do Produto é obrigatório',
            'discount.required' => 'O Desconto é obrigatório',
            'status.required' => 'O Status é obrigatório',
        ];
    }
}
