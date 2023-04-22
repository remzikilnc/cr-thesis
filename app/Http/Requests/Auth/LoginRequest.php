<?php

namespace App\Http\Requests\Auth;


use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Validator;

class LoginRequest extends FormRequest
{
    protected $errorBag = 'UserLoginErrorBag';

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
     * @return array<string, mixed>
     */
    public function rules()
    {

        return [
            'email' => 'required|string|max:128|email:rfc|email_verified',
            'password' => 'required|max:32|string|min:6',
            'remember' => 'boolean'
        ];
    }

    public function messages()
    {

        return [
            'email.required' => 'Email alanı boş bırakılamaz.',
            'email.max' => 'Email en fazla 128 karakter olabilir.',
            'email.email' => 'Lütfen geçerli bir email adresi giriniz.',
            'password.required' => 'Parola alanı boş bırakılamaz.',
            'password.max' => 'Parola en fazla 32 karakter olabilir.',
            'password.min' => 'Parola en az 6 karakter olmalıdır.',
        ];
    }

    public function failedValidation(Validator|\Illuminate\Contracts\Validation\Validator $validator)

    {

        throw new HttpResponseException(response()->json([

            'success'   => false,
            'message'   => 'Validation errors',
            'errors'=> $validator->errors()

        ],406));

    }
}
