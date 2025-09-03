import { Box, Button, Typography } from '@mui/material';
import { PersonAdd as PersonAddIcon } from '@mui/icons-material';

interface Props {
  handleOpenCreateDialog: () => void;
}

export const UserHeader = ({ handleOpenCreateDialog }: Props) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
      <Typography variant="h5" fontWeight="bold">
        Gestión de usuarios
      </Typography>
      <Button
        variant="contained"
        startIcon={<PersonAddIcon />}
        onClick={handleOpenCreateDialog}
        sx={{ borderRadius: 3 }}
      >
        Nuevo usuario
      </Button>
    </Box>
  );
};
