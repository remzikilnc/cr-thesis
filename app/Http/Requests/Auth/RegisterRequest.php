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
            'first_name.required' => 'First name field cannot be blank.',
            'first_name.min' => 'First name must be at least 2 characters.',
            'first_name.max' => 'First name cannot exceed 128 characters.',
            'last_name.required' => 'Last name field cannot be blank.',
            'last_name.min' => 'Last name must be at least 3 characters.',
            'last_name.max' => 'Last name cannot exceed 128 characters.',
            'email.required' => 'Email field cannot be blank.',
            'email.unique' => 'This email address is already in use.',
            'email.max' => 'Email cannot exceed 128 characters.',
            'email.email' => 'Please enter a valid email address.',
            'password.required' => 'Password field cannot be blank.',
            'password.confirmed' => 'The entered passwords do not match.',
            'password.max' => 'Password cannot exceed 64 characters.',
            'password.min' => 'Password must be at least 6 characters.',
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
