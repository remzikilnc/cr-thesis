<?php

namespace App\Jobs;

use App\Models\Comment;
use App\Services\OpenAIService;
use Exception;
use GuzzleHttp\Exception\GuzzleException;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ProcessComment implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private $comment;

    /**
     * Create a new job instance.
     */
    public function __construct(Comment $comment)
    {
        $this->comment = $comment;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        try {
            $openaiService = new OpenAIService();
            $response = $openaiService->commentFilter($this->comment->comment);

            if (!is_array($response)) {
                Log::error("Invalid response from OpenAIService. Response is not an array.");
                return;
            }
            if (!array_key_exists('success', $response)) {
                Log::error("Invalid response from OpenAIService. 'success' key is missing.");
            }
            if ($response['success'] == 'true' || $response['success']) {
                var_dump($response['success']);
                $this->comment->status = true;
            } else {
                $this->comment->status = false;
                if (array_key_exists('message', $response)) {
                    $this->comment->banReason = $response['message'];
                }
            }
            $this->comment->save();
        } catch (Exception $e) {
            Log::error('Error in ProcessComment job: ' . $e->getMessage(), ['exception' => $e]);
        }
    }
}
