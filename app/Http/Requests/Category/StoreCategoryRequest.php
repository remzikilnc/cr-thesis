<?php

namespace App\Http\Requests\Category;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Validator;

class StoreCategoryRequest extends FormRequest
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
            'name' => 'required|string|max:255|unique:categories,name',
            'description' => 'nullable|string',
            'status' => 'required|boolean',
            'images' => 'nullable|array',
            'images.*.file' => 'image',
            'images.*.type' => 'string|in:backdrop,poster',
        ];
    }

    public function messages()
    {
        return [
            'parent_id.integer' => 'The parent id must be an number.',
            'parent_id.exists' => 'The selected parent id is invalid.',
            'name.required' => 'The name field is required.',
            'name.string' => 'The name must be a string.',
            'name.max' => 'The name may not be greater than 255 characters.',
            'name.unique' => 'This name is already in use.',
            'description.string' => 'The description must be a string.',
            'status.required' => 'The status field is required.',
            'status.boolean' => 'The status must be true or false.',
            'images.array' => 'The images must be an array.',
            'images.*.file.required' => 'The image file is required.',
            'images.*.file.image' => 'The file must be an image.',
            'images.*.type.required' => 'The image type is required.',
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
