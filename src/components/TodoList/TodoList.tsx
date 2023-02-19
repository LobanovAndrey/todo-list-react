import { Group, Header, List, Spacing } from "@vkontakte/vkui";
import { useAppSelector } from "hooks/redux-hooks";
import { FC } from "react";
import { TodoItem } from "components/TodoItem/TodoItem";
import styles from "components/TodoList/TodoList.module.css";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./index.css";
import { useActiveTodos } from "./TodoList.hooks";

export const TodoList: FC = () => {
  const { data } = useAppSelector((state) => state.todos);
  const { todos, activeTodosCount } = useActiveTodos(data);

  return (
    <Group
      className={styles.container}
      header={
        <Header
          style={{ display: "flex", justifyContent: "center" }}
          mode="secondary"
        >{`Your have ${activeTodosCount} active todo`}</Header>
      }
      mode="plain"
    >
      <List>
        <TransitionGroup appear={true}>
          {todos.map((todo) => (
            <CSSTransition
              appear={true}
              classNames="todo-item"
              timeout={1000}
              key={todo.id}
              nodeRef={todo.node}
            >
              <div className={styles.animateItem} ref={todo.node}>
                <Spacing size={8} />
                <TodoItem {...todo} />
              </div>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </List>
    </Group>
  );
};
