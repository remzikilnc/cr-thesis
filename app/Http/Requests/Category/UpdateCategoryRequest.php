<?php

namespace App\Http\Requests\Category;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Validator;

class UpdateCategoryRequest extends FormRequest
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
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'parent_id' => 'nullable|integer|exists:categories,id',
            'name' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'status' => 'nullable|boolean',
            'images' => 'nullable|array',
            'images.*.file' => 'nullable|image',
            'images.*.type' => 'nullable|string|in:backdrop,poster',
        ];
    }

    public function messages()
    {
        return [
            'parent_id.integer' => 'The parent id must be an number.',
            'parent_id.exists' => 'The selected parent id is invalid.',
            'name.string' => 'The name must be a string.',
            'name.max' => 'The name may not be greater than 255 characters.',
            'description.string' => 'The description must be a string.',
            'status.boolean' => 'The status must be true or false.',
            'images.array' => 'The images must be an array.',
            'images.*.file.image' => 'The file must be an image.',
            'images.*.type.string' => 'The image type must be a string.',
            'images.*.type.in' => 'The image type must be either backdrop or poster.',
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
