<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\TaskResource;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TasksController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $tasks = Task::where('user_id', $user->id)
            ->orderBy('id', 'desc')
            ->paginate(5);

        return response()->json(['tasks' => $tasks]);
    }

    public function store(StoreTaskRequest $request)
    {
        $user_id = $request->user()->id;

        $data = $request->validated();
        $task = Task::create($data);
        $task->user_id = $user_id;
        $task->save();

        return response(new TaskResource($task), 201);
    }

    public function show(Task $task)
    {
        if (!$task || $task->user_id !== Auth::id()) {
            abort(403, 'Unauthorized action.');
        }

        return new TaskResource($task);
    }

    public function update(UpdateTaskRequest $request, Task $task)
    {
        $data = $request->validated();
        $task->update($data);

        return new TaskResource($task);
    }

    public function destroy(Task $task)
    {
        $task->delete();

        return response("", 204);
    }
}