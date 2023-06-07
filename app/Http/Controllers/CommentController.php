<?php

namespace App\Http\Controllers;

use App\Actions\PaginateComments;
use App\Http\Requests\Comment\StoreCommentRequest;
use App\Http\Requests\Comment\UpdateCommentRequest;
use App\Jobs\ProcessComment;
use App\Models\Comment;
use App\Models\Product;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\Request;

class CommentController extends BaseController
{

    private Request $request;

    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    /**
     * @throws AuthorizationException
     */
    public function index()
    {
        $this->authorize('index', Comment::class);

        $pagination = app(PaginateComments::class)->execute(
            $this->request->all(),
        );

        return response()->ok(['pagination' => $pagination]);
    }

    /**
     * @throws AuthorizationException
     */
    public function show(Product $product, Comment $comment)
    {
        $this->authorize('show', $comment);

        return response()->ok($comment);
    }


    public function update(UpdateCommentRequest $request, Product $product, Comment $comment)
    {
        $this->authorize('update', $comment);

        $validatedData = $request->validated();
        $comment->update($validatedData);

        return response()->ok($comment);
    }


    /**
     * @throws AuthorizationException
     */
    public function store(StoreCommentRequest $request, Product $product)
    {
        $this->authorize('store', Comment::class);
        $comment = new Comment($request->all());
        $comment->user_id = auth()->id();
        $comment->product_id = $product->id;
        $comment->save();
        $this->dispatch(
            new ProcessComment($comment),
        );

        return response()->noContent();
    }

    /**
     * @throws AuthorizationException
     */
    public function destroy(Product $product, Comment $comment)
    {
        $this->authorize('destroy', $comment);

        $comment->delete();
        return response()->noContent();
    }

}
