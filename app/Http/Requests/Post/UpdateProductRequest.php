<?php

namespace App\Http\Requests\Post;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Validator;

class UpdateProductRequest extends FormRequest
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
        $productId = $this->route('product');

        return [
            'title' => 'max:96',
            'description' => 'nullable|string|max:3000',
            'code' => 'sometimes|unique:products,code,' . $productId,
            'price' => 'sometimes|integer',
            'quantity' => 'sometimes|integer',
            'poster' => 'nullable|string',
            'popularity' => 'nullable|integer',
            'status' => 'sometimes|boolean',
            'categories' => 'array',
            'categories.*' => 'exists:categories,id',
            'images' => 'nullable|array',
            'images.*.file' => 'image',
            'images.*.type' => 'string|in:backdrop,poster',
        ];
    }

    public function messages()
    {
        return [
            'title.max' => 'Title may not be greater than 96 characters.',
            'description.max' => 'Description may not be greater than 2000 characters.',
            'code.unique' => 'This code is already in use.',
            'price.integer' => 'Price must be an number.',
            'quantity.integer' => 'Quantity must be an number.',
            'poster.string' => 'Poster must be a valid path.',
            'popularity.integer' => 'Popularity must be an number.',
            'status.boolean' => 'Status must be true or false.',
            'images.*.image' => 'Each image must be an image.',
            'images.*.type' => 'Image type must be either: backdrop, poster.',
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
