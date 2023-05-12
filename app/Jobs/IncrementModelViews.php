<?php namespace App\Jobs;

use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Bus\Queueable;
use Illuminate\Session\Store;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class IncrementModelViews implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private int $modelId;
    private string $type;

    /**
     * @param 'person'|'title' $type
     * @param int $modelId
     */
    public function __construct($type, int $modelId)
    {
        $this->type = $type;
        $this->modelId = $modelId;
    }

    /**
     * Execute the console command.
     * @return void
     */
    public function handle(): void
    {
        $this->incrementViews();
    }

    /**
     * Increment views or plays of specified model.
     */
    private function incrementViews()
    {
        $table = $this->type === 'product' ? 'products' : 'products';
        DB::table($table)->where('id', $this->modelId)->increment('views');
    }
}
