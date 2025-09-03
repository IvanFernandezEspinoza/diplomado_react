
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import type { UserType } from './type';
import { IconButton, Stack, Tooltip } from '@mui/material';
import { Edit as EditIcon, Undo as UndoIcon, Done as DoneIcon,Delete as DeleteIcon, } from '@mui/icons-material';

interface Props {
  users: UserType[];
  rowCount: number;
  paginationModel: any;
  setPaginationModel: (model: any) => void;
  sortModel: any;
  setSortModel: (model: any) => void;
  handleDelete: (id: number) => void;
  handleToggleStatus: (id: number, status: 'active' | 'inactive') => void;
  handleOpenEditDialog: (user: UserType) => void;
}

export const UserTabla = ({
  users,
  rowCount,
  paginationModel,
  setPaginationModel,
  sortModel,
  setSortModel,
  handleDelete,
  handleToggleStatus,
  handleOpenEditDialog,
}: Props) => {
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 80 },
    { field: 'username', headerName: 'Usuario', flex: 1 },
    { field: 'status', headerName: 'Estado', width: 150 },
    { field: 'createdAt', headerName: 'Creado', flex: 1 },
    { field: 'updatedAt', headerName: 'Actualizado', flex: 1 },
    { field: 'actions',headerName: 'Acciones',
      sortable: false,
      renderCell: (params) => (
        <Stack direction = {'row'} spacing={1}>
          <Tooltip title="Editar">
            <IconButton size="small" onClick={() => handleOpenEditDialog(params.row)}>
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip
            title={
              params.row.done === true ? 'Marcar activo' : 'Marcar inactivo'
            }
          >
            <IconButton
              size="small"
              color={params.row.done === true ? 'warning' : 'success'}
              onClick={() => handleToggleStatus(params.row.id, params.row.done)}
            >
              {params.row.done === true ? (
                <UndoIcon fontSize="small" />
              ) : (
                <DoneIcon fontSize="small" />
              )}
            </IconButton>
          </Tooltip>
                    
          <Tooltip title="Eliminar">
            <IconButton
              size="small"
              color="error"
              onClick={() => handleDelete(params.row.id)}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>

      ),
    },
  ];

  return (
    <DataGrid
      rows={users}
      columns={columns}
      rowCount={rowCount}
      paginationMode="server"
      sortingMode="server"
      paginationModel={paginationModel}
      onPaginationModelChange={setPaginationModel}
      sortModel={sortModel}
      onSortModelChange={setSortModel}
      pageSizeOptions={[5, 10, 20]}
      disableColumnFilter
      
    />
  );
};
