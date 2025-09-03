import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
} from '@mui/material';
import type { UserType } from './type';
import { useActionState } from 'react';
import type { ActionState } from '../../interfaces';
import type { UserFormValues } from '../../models';
import { createInitialState } from '../../helpers';

export type UserActionState = ActionState<UserFormValues>;

interface Props {
  open: boolean;
  user?: UserType | null;
  onClose: () => void;
  handleCreateEdit: (
    _: UserActionState | undefined,
    formData: FormData
  ) => Promise<UserActionState | undefined>;
}

export const UserDialog = ({ onClose, open, user, handleCreateEdit }: Props) => {
  const initialState = createInitialState<UserFormValues>();
  const [state, submitAction, isPending] = useActionState(
    handleCreateEdit,
    initialState
  );

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{user ? 'Editar usuario' : 'Nuevo usuario'}</DialogTitle>
      <Box key={user?.id ?? 'new'} component="form" action={submitAction}>
        <DialogContent>
          {/* Campo username */}
<TextField
  name="username"
  autoFocus
  margin="dense"
  label="Usuario"
  fullWidth
  required
  disabled={isPending}
  defaultValue={state?.formData?.username || user?.username || ''}
  error={!!state?.errors?.username}
  helperText={state?.errors?.username}
  sx={{ mb: 2 }}
/>

<TextField
  name="password"
  margin="dense"
  label="Contraseña"
  type="password"
  fullWidth
  required
  disabled={isPending}
  defaultValue={state?.formData?.password || ''}
  error={!!state?.errors?.password}
  helperText={state?.errors?.password}
  sx={{ mb: 2 }}
/>

<TextField
  name="confirmPassword"
  margin="dense"
  label="Confirmar contraseña"
  type="password"
  fullWidth
  required
  disabled={isPending}
  defaultValue={state?.formData?.confirmPassword || ''}
/>
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button onClick={onClose} color="inherit" disabled={isPending}>
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isPending}
            startIcon={isPending ? <CircularProgress size={18} /> : null}
          >
            {user ? 'Actualizar' : 'Crear'}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};
