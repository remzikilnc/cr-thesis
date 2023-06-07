<?php

namespace App\Http\Requests\Comment;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Validator;

class UpdateCommentRequest extends FormRequest
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
        return [
            'comment' => 'required|string',
            'product_id' => 'required|integer',
            'user_id' => 'required|integer',
            'status' => 'required|boolean'
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'comment.required' => 'A valid comment is required.',
            'product_id.required' => 'A valid id is required.',
            'product_id.integer' => 'You must specify a number',
            'user_id.required' => 'A valid id is required.',
            'user_id.integer' => 'You must specify a number',
            'status.required' => 'Status is required.',
            'status.boolean' => 'The status must be a boolean.'
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
