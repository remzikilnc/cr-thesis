<?php

namespace App\Http\Requests\Post;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Validator;

class StoreProductRequest extends FormRequest
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
            'title' => 'required|max:96',
            'description' => 'nullable|string|max:3000',
            'code' => 'unique:products,code',
            'price' => 'required|integer',
            'quantity' => 'required|integer',
            'poster' => 'nullable|string',
            'popularity' => 'nullable|integer',
            'status' => 'required|boolean',
            'categories' => 'array',
            'categories.*' => 'exists:categories,id',
            'images' => 'array',
            'images.*.file' => 'image',
            'images.*.type' => 'in:backdrop,poster',
        ];
    }

    public function messages()
    {
        return [
            'title.required' => 'Title is required.',
            'title.max' => 'Title may not be greater than 96 characters.',
            'description.max' => 'Description may not be greater than 2000 characters.',
            'code.unique' => 'This code is already in use.',
            'price.required' => 'Price is required.',
            'price.integer' => 'Price must be an number.',
            'quantity.required' => 'Quantity is required.',
            'quantity.integer' => 'Quantity must be an number.',
            'poster.string' => 'Poster must be a valid path.',
            'popularity.integer' => 'Popularity must be an number.',
            'status.required' => 'Status is required.',
            'status.boolean' => 'Status must be true or false.',
            'images.*.image' => 'Each image must be an image.',
            'images.*.mimes' => 'Each image must be a file of type: jpeg, png, jpg, gif, svg.',
            'images.*.max' => 'Each image may not be greater than 20420 kilobytes.'
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
