<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCustomerRequest extends FormRequest
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
            'name' => 'required|string',
            'email' => 'required|string|email|unique:customers,email,' . request()->segment(3),
            'phone' => 'required|string|min:13',
            'cpf' => 'required|string|min:14|unique:customers,cpf,' . request()->segment(3),
            'zipcode' => 'required|string|min:9',
            'address' => 'required|string',
            'number' => 'required|string',
            'complement' => 'required|string',
            'neighbourhood' => 'required|string',
            'city' => 'required|string',
            'state' => 'required|string',
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
            'name.required' => 'O campo "Nome" é obrigatório',
            'email.required' => 'O campo "E-mail" é obrigatório',
            'email.email' => 'O campo "E-mail" deve ser um endereço de e-mail válido.',
            'email.unique' => 'O campo "E-mail" já está sendo utilizado.',
            'phone.required' => 'O campo "Telefone" é obrigatório',
            'phone.min' => 'O campo "Telefone" não pode ser inferior a :min caracteres',
            'cpf.required' => 'O campo "CPF" é obrigatório',
            'cpf.min' => 'O campo "CPF" não pode ser inferior a :min caracteres',
            'cpf.unique' => 'O campo "CPF" já está sendo utilizado.',
            'zipcode.required' => 'O campo "CEP" é obrigatório',
            'zipcode.min' => 'O campo "CEP" não pode ser inferior a :min caracteres',
            'address' => 'O campo "Endereço" é obrigatório',
            'number' => 'O campo "Número" é obrigatório',
            'complement' => 'O campo "Complemento" é obrigatório',
            'neighbourhood' => 'O campo "Bairro" é obrigatório',
            'city' => 'O campo "Cidade" é obrigatório',
            'state' => 'O campo "Estado" é obrigatório',
        ];
    }
}
