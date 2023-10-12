import { inMemoryTodos } from '@todos/todos.data';
import { NextResponse } from 'next/server';

export const GET = () => NextResponse.json(Array.from(inMemoryTodos.values()));

export const POST = async (request: Request) => {
  const todo = await request.json();
  const todoId = crypto.randomUUID();
  inMemoryTodos.set(todoId, { id: todoId, ...todo });

  return NextResponse.json(Array.from(inMemoryTodos.values()));
};
