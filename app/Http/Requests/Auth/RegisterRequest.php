<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Validator;

class RegisterRequest extends FormRequest
{
    protected $errorBag = "UserRegisterErrorBag";
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
        $lettersAndSpace = '/^[\pL\s]+$/u';
        return [
            'first_name' => 'required|string|max:128|min:2',
            'last_name' => 'required|string|max:128|min:3',
            'email' => 'required|unique:users|max:128|email:rfc',
            'password' => 'required|confirmed|max:64|string|min:6',
            'remember' => 'boolean'
        ];
    }

    public function messages()
    {
        return [
            'first_name.required' => 'Ad alanı boş bırakılamaz.',
            'first_name.min' => 'Ad alanı en az 2 karakter olmalıdır..',
            'first_name.max' => 'Ad alanı en fazla 128 karakter olmalıdır..',
            'last_name.required' => 'Soyad alanı alanı boş bırakılamaz.',
            'last_name.min' => 'Soyad alanı en az 3 karakter olmalıdır..',
            'last_name.max' => 'Soyad alanı alanı en fazla 128 karakter olmalıdır..',
            'email.required' => 'E-posta alanı boş bırakılamaz.',
            'email.unique' => 'Bu e-posta adresi zaten kullanımda.',
            'email.max' => 'E-posta en fazla 128 karakter olabilir.',
            'email.email' => 'Lütfen geçerli bir E-posta adresi giriniz.',
            'password.required' => 'Parola alanı boş bırakılamaz.',
            'password.confirmed' => 'Girdiğiniz parolalar birbirleriyle eşleşmiyor.',
            'password.max' => 'Parola en fazla 64 karakter olabilir.',
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
