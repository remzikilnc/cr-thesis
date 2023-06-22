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
            'gender' => 'nullable|in:male,female',
            'email' => 'required|email|max:128|unique:users,email,' . $userId,
            'permissions' => 'array',
            'roles' => 'array',
            'old_password' => 'required_with:new_password,new_password_confirmation|current_password',
            'new_password' => 'nullable|required_with:old_password,new_password_confirmation|min:6|max:64',
            'new_password_confirmation' => 'nullable|required_with:old_password,new_password|same:new_password',

        ];
    }

    public function messages()
    {
        return [
            'first_name.min' => 'Ad alanı en az 2 karakter olmalıdır.',
            'first_name.max' => 'Ad alanı en fazla 128 karakter olmalıdır.',
            'last_name.min' => 'Soyad alanı en az 3 karakter olmalıdır.',
            'last_name.max' => 'Soyad alanı en fazla 128 karakter olmalıdır.',
            'gender.in' => 'The gender must be either male or female.',
            'email.unique' => 'Bu e-posta adresi zaten kullanımda.',
            'email.max' => 'E-posta en fazla 128 karakter olabilir.',
            'email.email' => 'Lütfen geçerli bir e-posta adresi giriniz.',
            'old_password.required_with' => 'The old password field is required when new password or password confirmation is present.',
            'old_password.current_password' => 'The old password is incorrect.',
            'new_password.required_with' => 'The new password field is required when old password or password confirmation is present.',
            'new_password.min' => 'The new password must be at least 6 characters.',
            'new_password.max' => 'The new password field must be no more than 64 characters.',
            'new_password_confirmation.required_with' => 'The password confirmation field is required when old password or new password is present.',
            'new_password_confirmation.same' => 'The password confirmation does not match the new password.',
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
