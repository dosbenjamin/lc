import { inMemoryTodos } from '@todos/todos.data';
import { getAllTodos } from '@todos/todos.helpers';
import { NextResponse } from 'next/server';

export const GET = (request: Request) => {
  console.info(request);
  return NextResponse.json(getAllTodos());
};

export const POST = async (request: Request) => {
  const todo = await request.json();
  const todoId = crypto.randomUUID();
  inMemoryTodos.set(todoId, { id: todoId, ...todo });

  return NextResponse.json(getAllTodos());
};
