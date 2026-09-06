<?php

namespace App\Helpers;

class FileUploadHelper
{
    /**
     * Save base64 data URL to public/uploads folder and return public URL path
     *
     * @param string|null $dataUrl
     * @param string $folder (e.g. 'documents', 'images')
     * @param string $prefix (e.g. 'doc', 'reg', 'policy')
     * @return string|null
     */
    public static function saveBase64File(?string $dataUrl, string $folder = 'documents', string $prefix = 'file'): ?string
    {
        if (empty($dataUrl)) {
            return null;
        }

        // If it's already a regular URL (not base64 data URL), keep it as is
        if (!str_starts_with($dataUrl, 'data:')) {
            return $dataUrl;
        }

        try {
            // Extract mime type and base64 payload
            if (preg_match('#^data:([^;]+);base64,(.+)$#s', $dataUrl, $matches)) {
                $mimeType = trim($matches[1]);
                $base64Data = trim($matches[2]);
                $decoded = base64_decode($base64Data);

                if ($decoded === false) {
                    return $dataUrl;
                }

                // Determine file extension
                $extension = 'pdf';
                if (str_contains($mimeType, 'png')) {
                    $extension = 'png';
                } elseif (str_contains($mimeType, 'jpeg') || str_contains($mimeType, 'jpg')) {
                    $extension = 'jpg';
                } elseif (str_contains($mimeType, 'webp')) {
                    $extension = 'webp';
                } elseif (str_contains($mimeType, 'svg')) {
                    $extension = 'svg';
                }

                // Ensure backend target directory exists
                $targetDir = public_path('uploads/' . $folder);
                if (!file_exists($targetDir)) {
                    mkdir($targetDir, 0755, true);
                }

                $cleanPrefix = preg_replace('/[^a-zA-Z0-9_-]/', '_', $prefix);
                $filename = $cleanPrefix . '-' . time() . '-' . uniqid() . '.' . $extension;
                $filePath = $targetDir . DIRECTORY_SEPARATOR . $filename;

                file_put_contents($filePath, $decoded);

                // Also sync to frontend public/uploads folder for Vite dev server
                $frontendUploadsDir = base_path('../tawania/public/uploads/' . $folder);
                if (file_exists(base_path('../tawania/public'))) {
                    if (!file_exists($frontendUploadsDir)) {
                        mkdir($frontendUploadsDir, 0755, true);
                    }
                    @copy($filePath, $frontendUploadsDir . DIRECTORY_SEPARATOR . $filename);
                }

                // Return clean relative web path
                return '/uploads/' . $folder . '/' . $filename;
            }
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error('FileUploadHelper Error: ' . $e->getMessage());
        }

        return $dataUrl;
    }
}
