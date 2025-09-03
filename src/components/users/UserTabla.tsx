import {
  DataGrid,
  type GridColDef,
  type GridRenderCellParams,
} from '@mui/x-data-grid';
import type { UserType } from './type';
import { Chip, IconButton, Stack, Tooltip } from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Undo as UndoIcon,
  Done as DoneIcon,
} from '@mui/icons-material';

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
  const formatDate = (date: string) =>
    new Date(date).toLocaleString('es-ES', {
      dateStyle: 'short',
      timeStyle: 'short',
    });

  const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'username', headerName: 'Usuario', flex: 1 },
  {
    field: 'status',
    headerName: 'Estado',
    width: 150,
    renderCell: (params: GridRenderCellParams) => (
      <Chip
        label={params.value === 'active' ? 'Activo' : 'Inactivo'}
        color={params.value === 'active' ? 'success' : 'warning'}
        size="small"
        variant="outlined"
      />
    ),
  },
  {
    field: 'actions',
    headerName: 'Acciones',
    sortable: false,
    filterable: false,
    width: 200,
    renderCell: (params: GridRenderCellParams) => (
      <Stack direction={'row'} spacing={1}>
        <Tooltip title="Editar">
          <IconButton
            size="small"
            onClick={() => handleOpenEditDialog(params.row)}
          >
            <EditIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip
          title={
            params.row.status === 'active'
              ? 'Marcar inactivo'
              : 'Marcar activo'
          }
        >
          <IconButton
            size="small"
            color={params.row.status === 'active' ? 'warning' : 'success'}
            onClick={() =>
              handleToggleStatus(params.row.id, params.row.status)
            }
          >
            {params.row.status === 'active' ? (
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
