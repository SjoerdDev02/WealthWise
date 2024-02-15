<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSnapshotRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'id' => 'required|integer',
            'year' => 'required|string',
            'month' => 'required|string',
            'income' => 'required|numeric',
            'expenses' => 'required|numeric',
            'total_investments' => 'required|numeric',
            'total_liabilities' => 'required|numeric',
            'investments' => 'nullable|array',
            'investments.*.id' => 'required|integer',
            'investments.*.source' => 'required|string',
            'investments.*.amount' => 'required|numeric',
            'liabilities' => 'nullable|array',
            'liabilities.*.id' => 'required|integer',
            'liabilities.*.source' => 'required|string',
            'liabilities.*.amount' => 'required|numeric',
        ];
    }
}
