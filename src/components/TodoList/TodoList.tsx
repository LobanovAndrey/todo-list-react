import { Group, Header, List, SimpleCell, Spacing } from "@vkontakte/vkui";
import { useAppSelector } from "hooks/redux-hooks";
import { createRef, FC, useMemo } from "react";
import { TodoItem } from "components/TodoItem/TodoItem";
import styles from "components/TodoList/TodoList.module.css";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./index.css";

export const TodoList: FC = () => {
  const { data: todos } = useAppSelector((state) => state.todos);
  const { animatedTodos, activeTodos } = useMemo(() => {
    let activeTodos = 0;
    const animatedTodos = todos.map((todo) => {
      if (!todo.completed) {
        activeTodos++;
      }
      return {
        ...todo,
        node: createRef<HTMLDivElement>(),
      };
    });

    return {
      animatedTodos,
      activeTodos,
    };
  }, [todos]);

  return (
    <Group
      className={styles.container}
      header={
        <Header mode="secondary">{`Your have ${activeTodos} active todo`}</Header>
      }
    >
      <List>
        <TransitionGroup>
          {animatedTodos.map((todo) => (
            <CSSTransition
              classNames="todo-item"
              timeout={1000}
              key={todo.id}
              nodeRef={todo.node}
            >
              <div className={styles.animateItem} ref={todo.node}>
                <TodoItem {...todo} />
                <Spacing size={10} />
              </div>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </List>
    </Group>
  );
};
