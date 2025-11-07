import { type JSX } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Typography,
  List,
  ListItem,
  IconButton,
  Chip,
  Paper,
  Divider,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  CheckBox as CheckBoxIcon,
  CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon,
} from '@mui/icons-material';
import type { RootState } from '../../store';
import style from './Tasks.module.css';

export default function Tasks(): JSX.Element {
  const tasks = useSelector((state: RootState) => state.tasks);
  const dispatch = useDispatch();

  function handleChangeStatus(id: string): void {
    dispatch({ type: 'tasks/changeStatus', payload: id });
  }

  function handleRemove(id: string): void {
    dispatch({ type: 'tasks/remove', payload: id });
  }

  const completedTasks = tasks.filter((task) => task.isDone).length;
  const totalTasks = tasks.length;

  return (
    <Box className={style.container}>
      <Box className={style.header}>
        <Typography variant='h5' component='h2' className={style.title}>
          Список задач
        </Typography>
        <Chip
          label={`${completedTasks}/${totalTasks} выполнено`}
          color='primary'
          variant={
            completedTasks === totalTasks && totalTasks > 0
              ? 'filled'
              : 'outlined'
          }
          className={style.chip}
        />
      </Box>

      <Divider className={style.divider} />

      {tasks.length === 0 ? (
        <Paper className={style.emptyState}>
          <Typography variant='h6' color='textSecondary' align='center'>
            Пока нет задач. Создайте первую задачу!
          </Typography>
        </Paper>
      ) : (
        <List className={style.list}>
          {tasks.map((task) => (
            <ListItem
              key={task.id}
              className={`${style.listItem} ${
                task.isDone ? style.completed : ''
              }`}
            >
              <IconButton
                onClick={() => handleChangeStatus(task.id)}
                color={task.isDone ? 'success' : 'default'}
                className={style.statusButton}
                size='small'
              >
                {task.isDone ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
              </IconButton>

              <Box className={style.taskContent}>
                <Typography variant='body1' className={style.taskTitle}>
                  {task.title}
                </Typography>
                <Typography
                  variant='body2'
                  color='textSecondary'
                  className={style.taskDescription}
                >
                  {task.description}
                </Typography>
              </Box>

              <IconButton
                onClick={() => handleRemove(task.id)}
                color='error'
                className={style.deleteButton}
                size='small'
              >
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}
