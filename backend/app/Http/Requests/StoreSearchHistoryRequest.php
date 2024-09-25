<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSearchHistoryRequest extends FormRequest
{
    // Authorize the request
    public function authorize(): bool
    {
        return true; // Set to false if you want to restrict access
    }

    // Define the validation rules
    public function rules(): array
    {
        return [
            'full_name' => 'required|string|max:255',
            'email' => 'required|email',
            'question_count' => 'required|integer|max:50',
            'difficulty' => 'required|string',
            'type' => 'required|string',
        ];
    }
}
