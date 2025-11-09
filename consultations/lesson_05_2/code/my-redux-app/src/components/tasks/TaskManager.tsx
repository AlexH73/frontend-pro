import { type JSX } from 'react';
import { Paper, Typography, Container, Box } from '@mui/material';
import TaskCreation from './TaskCreation';
import Tasks from './Tasks';
import style from './TaskManager.module.css';

export default function TaskManager(): JSX.Element {
  return (
    <Container maxWidth='lg' className={style.container}>
      <Paper elevation={3} className={style.headerPaper}>
        <Typography variant='h3' component='h1' className={style.mainTitle}>
          Менеджер задач
        </Typography>
        <Typography variant='h6' className={style.subtitle}>
          Организуйте свои задачи эффективно
        </Typography>
      </Paper>

      <Box className={style.contentWrapper}>
        <Box className={style.sidebarContainer}>
          <Paper elevation={2} className={style.sidebar}>
            <TaskCreation />
          </Paper>
        </Box>

        <Box className={style.mainContent}>
          <Paper elevation={2} className={style.content}>
            <Tasks />
          </Paper>
        </Box>
      </Box>
    </Container>
  );
}
