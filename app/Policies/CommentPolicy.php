<?php

namespace App\Policies;

use App\Models\Comment;
use App\Models\User;

class CommentPolicy
{
    /**
     * Determine whether the user can view any status 1 models.
     */
    public function index(User $user): bool
    {
        return $user->hasPermissionTo('comments.view');
    }

    /**
     * Determine whether the user can view any models.
     */
    public function viewInactive(User $user): bool
    {
        return $user->hasPermissionTo('comments.view_inactive');
    }

    /**
     * Determine whether the user can view the model.
     */
    public function show(User $user, Comment $comment): bool
    {
        return $user->hasPermissionTo('comments.view') || $user->id === $comment->user_id;
    }

    /**
     * Determine whether the user can create models.
     */
    public function store(User $user): bool
    {
        return $user->hasPermissionTo('comments.create');
    }

    /**
     * Determine whether the user can update the model.
     * User can update own comment
     */
    public function update(User $user, Comment $comment): bool
    {
        return $user->hasPermissionTo('comments.update') || $user->id === $comment->user_id;
    }

    /**
     * Determine whether the user can delete the model.
     * User can delete own comment
     */
    public function destroy(User $user, Comment $comment): bool
    {
        return $user->hasPermissionTo('comments.delete') || $user->id === $comment->user_id;
    }
}
