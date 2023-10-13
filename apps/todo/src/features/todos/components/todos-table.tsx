'use client';

import { useReadTodos } from '@todos/hooks/use-read-todos';
import { Todo } from '@todos/todos.types';
import { FormEventHandler, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';
import { cn } from '@common/common.helpers';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import tableStyle from '@todos/components/todos-table.module.css';
import { Toggle } from '@common/components/ui/toggle';
import { Input } from '@common/components/ui/input';
import { useLocalStorage } from '@uidotdev/usehooks';
import { TODOS_GRID_PAGINATION_SIZE, TODOS_LOCAL_STORAGE_GRID_PREFERENCES } from '@todos/todos.constants';

export const TodosTable = () => {
  const { data: todos = [] } = useReadTodos();
  const secretTodos = todos?.filter(({ isSecret }) => isSecret);

  const gridRef = useRef<AgGridReact<Todo>>(null);

  const [columnDefs, setColumnDefs] = useLocalStorage<ColDef<Todo>[]>(TODOS_LOCAL_STORAGE_GRID_PREFERENCES, [
    { field: 'id', hide: true },
    { field: 'task' },
    { field: 'isCompleted' },
    { field: 'isSecret', hide: true },
  ]);

  const handleColumnDefChange = (column: ColDef<Todo>): void => {
    setColumnDefs((columnDefs) =>
      columnDefs.map((columnDef) =>
        columnDef.field === column.field
          ? {
              ...columnDef,
              hide: !columnDef.hide,
            }
          : columnDef,
      ),
    );
  };

  const handleSearch: FormEventHandler<HTMLInputElement> = ({ currentTarget }) =>
    gridRef.current?.api.setQuickFilter(currentTarget.value);

  const saveGridPreference = () =>
    localStorage.setItem(TODOS_LOCAL_STORAGE_GRID_PREFERENCES, JSON.stringify(gridRef.current?.api.getColumnDefs()));

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex justify-between gap-8">
        <div className="flex gap-2">
          {columnDefs.map((column) => (
            <Toggle key={column.field} pressed={!column.hide} onPressedChange={() => handleColumnDefChange(column)}>
              {column.field}
            </Toggle>
          ))}
        </div>
        <Input placeholder="Search..." onInput={handleSearch} />
      </div>
      <AgGridReact<Todo>
        rowData={secretTodos}
        columnDefs={columnDefs}
        sideBar={true}
        defaultColDef={{
          editable: true,
          sortable: true,
          filter: true,
          resizable: true,
        }}
        ref={gridRef}
        pagination={true}
        paginationPageSize={TODOS_GRID_PAGINATION_SIZE}
        className={cn('ag-theme-alpine', tableStyle.custom, tableStyle['ag-header'])}
        onColumnEverythingChanged={saveGridPreference}
        onSortChanged={saveGridPreference}
        onColumnResized={saveGridPreference}
      />
    </div>
  );
};
