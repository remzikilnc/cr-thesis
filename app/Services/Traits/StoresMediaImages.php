<?php

namespace App\Services\Traits;

use App\Models\Image;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Intervention\Image\Facades\Image as ImageIntervention;
use InvalidArgumentException;
use function PHPUnit\Framework\isEmpty;

trait StoresMediaImages
{
    /**
     * Different image dimensions for resizing
     */
    private array $imageSizes = [
        'original' => null,
        'large' => 500,
        'medium' => 300,
        'small' => 92,
    ];

    /**
     *
     * @param array $filesData
     * @param $model
     * @return Collection
     */
    public function storeImages(array $filesData, $model): Collection
    {
        $imageModels = [];

        foreach ($filesData as $fileData) {
            $file = $fileData['file'];
            $type = $fileData['type'];
            // Check if the file is an image
            if (!$file->isValid() || !in_array($file->getMimeType(), ['image/jpeg', 'image/png', 'image/gif'])) {
                throw new InvalidArgumentException("The provided file is not a valid image.");
            }

            $hash =  Str::random(30);
            $extension = $file->extension() ?? 'jpeg';
            $type = $type ?? 'backdrop';

            foreach ($this->imageSizes as $sizeName => $dimensions) {
                $this->writeImgVariantsToDisk($file,$type, $hash, $extension, $sizeName, $dimensions);
            }

            $imageModel = new Image([
                'url' => "storage/media-images/$type/$hash/original.$extension",
                'type' => $type,
                'model_type' => get_class($model),
                'model_id' => $model->id
            ]);

            $imageModel->save();

            $imageModels[] = $imageModel;
        }

        return collect($imageModels);
    }

    /**
     *
     * @param UploadedFile $file
     * @param string $type
     * @param string $hash
     * @param string $extension
     * @param string $sizeName
     * @param int|null $dimensions
     */
    private function writeImgVariantsToDisk(UploadedFile $file,string $type, string $hash, string $extension, string $sizeName, ?int $dimensions): void
    {
        $image = ImageIntervention::make($file);

        if ($dimensions) {
            $image->resize($dimensions, null, function ($constraint) {
                $constraint->aspectRatio();
            });
        }

        $path = "media-images/$type/$hash/$sizeName.$extension";
        Storage::disk('public')->put($path, (string) $image->encode($extension));
    }
}
