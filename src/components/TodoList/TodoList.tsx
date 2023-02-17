import { Group, Header, List, PanelSpinner, Separator, SimpleCell, Spacing, Spinner } from '@vkontakte/vkui';
import { useAppSelector } from 'hooks/redux-hooks';
import { FC, Fragment, useMemo } from 'react'
import { TodoItem } from 'components/TodoItem/TodoItem';
import styles from 'components/TodoList/TodoList.module.css'

export const TodoList: FC = () => {
  const {data: todos, loading } = useAppSelector(state => state.todos);
  console.log('TODOS IN TODO LIST', todos);

  const activeTodosCount = useMemo(() => (
    todos?.filter(todo => !todo.completed).length
  ), [todos]);

  return (
      <Group
        className={styles.container}
        header={
          <Header mode="secondary">
            {`YOU HAVE ${activeTodosCount} Active TASK`}
          </Header>
        }
      >
        {loading && 
          <PanelSpinner size="large" style={{ margin: '20px 0' }} />
        }

        <List>
          {!loading && todos && todos.length > 0 && todos.map((todo) => (
            <Fragment key={todo.id}>
              <Spacing size={15} />
              <TodoItem {...todo} />
            </Fragment>
          ))}
        </List>
      </Group>
    )
};
