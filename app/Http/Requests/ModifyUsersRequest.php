<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Validator;

class ModifyUsersRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $userId = $this->route('user') ? $this->route('user')->id : null;
        return [
            'first_name' => 'string|max:128|min:2',
            'last_name' => 'string|max:128|min:3',
            'password' => 'nullable|min:6|max:64',
            'email' => 'required|email|max:128|unique:users,email,' . $userId,
            'permissions' => 'array',
            'roles' => 'array',
        ];
    }

    public function messages()
    {
        return [
            'first_name.min' => 'Ad alanı en az 2 karakter olmalıdır.',
            'first_name.max' => 'Ad alanı en fazla 128 karakter olmalıdır.',
            'last_name.min' => 'Soyad alanı en az 3 karakter olmalıdır.',
            'last_name.max' => 'Soyad alanı en fazla 128 karakter olmalıdır.',
            'email.unique' => 'Bu e-posta adresi zaten kullanımda.',
            'email.max' => 'E-posta en fazla 128 karakter olabilir.',
            'email.email' => 'Lütfen geçerli bir e-posta adresi giriniz.',
            'password.max' => 'Parola en fazla 64 karakter olabilir.',
            'password.min' => 'Parola en az 6 karakter olmalıdır.',
        ];
    }

    public function failedValidation(Validator|\Illuminate\Contracts\Validation\Validator $validator)
    {

        throw new HttpResponseException(response()->json([
            'success'   => false,
            'message'   => 'form-validation-errors',
            'errors'=> $validator->errors()
        ],406));

    }
}
