import { useState, type FormEvent, type JSX } from 'react';
import { useDispatch } from 'react-redux';
import { Box, TextField, Button, Typography } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import style from './TaskCreation.module.css';

export default function TaskCreation(): JSX.Element {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const dispatch = useDispatch();

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (title.trim() && description.trim()) {
      dispatch({
        type: 'tasks/add',
        payload: { title, description, isDone: false },
      });
      setTitle('');
      setDescription('');
    }
  }

  return (
    <Box className={style.container}>
      <Typography variant='h5' component='h2' className={style.title}>
        Новая задача
      </Typography>

      <form onSubmit={handleSubmit} className={style.form}>
        <TextField
          fullWidth
          label='Название задачи'
          variant='outlined'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={style.input}
          required
          size='small'
        />

        <TextField
          fullWidth
          label='Описание задачи'
          variant='outlined'
          multiline
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={style.input}
          required
          size='small'
        />

        <Button
          type='submit'
          variant='contained'
          color='primary'
          fullWidth
          startIcon={<AddIcon />}
          className={style.button}
          disabled={!title.trim() || !description.trim()}
        >
          Добавить задачу
        </Button>
      </form>
    </Box>
  );
}
