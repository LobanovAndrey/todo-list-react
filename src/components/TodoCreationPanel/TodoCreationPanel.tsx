import { Icon28AddOutline } from "@vkontakte/icons";
import {
  Button,
  FormField,
  FormItem,
  Group,
  Header,
  Input,
  SimpleCell,
  WriteBar,
} from "@vkontakte/vkui";
import { useAppDispatch, useAppSelector } from "hooks/redux-hooks";
import { FC, useCallback, useState } from "react";

import styles from "components/TodoCreationPanel/TodoCreationPanel.module.css";
import { addTodo } from "store/actions/todo.actions";
import { useAuth } from "hooks/useAuth";

export const TodoCreationPanel: FC = () => {
  const dispatch = useAppDispatch();
  const { userId } = useAuth();
  const { loading } = useAppSelector((state) => state.todos);

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isNameValid, setIsNameValid] = useState<boolean>(true);

  const handleAddTodo = useCallback(() => {
    if (name === "") {
      setIsNameValid(false);
      return;
    }

    userId &&
      dispatch(
        addTodo({
          userUid: userId,
          name: name,
          description: description,
        })
      );

    setName("");
    setDescription("");
  }, [name, userId, dispatch, description]);

  const handleChangeName = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value.toString());
      if (!isNameValid) {
        setIsNameValid(true);
      }
    },
    [isNameValid]
  );

  const handleChangeDiscription = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setDescription(e.target.value.toString());
    },
    []
  );

  return (
    <Group
      header={<Header mode="secondary">Create your task</Header>}
      className={styles.cellContainer}
    >
      <SimpleCell disabled>
        <FormItem
          className={styles.formItem}
          status={isNameValid ? "default" : "error"}
          top="Name"
          bottom={isNameValid ? <>&nbsp;</> : "The task name cannot be empty"}
        >
          <div className={styles.fieldContainer}>
            <Input
              type="text"
              size={100}
              value={name}
              onChange={handleChangeName}
            />
            <Button
              size="l"
              mode="secondary"
              onClick={handleAddTodo}
              loading={loading}
            >
              <Icon28AddOutline />
            </Button>
          </div>
        </FormItem>

        <FormItem className={styles.formItem} top="Description">
          <FormField className={styles.descriptionField}>
            <WriteBar
              style={{ width: "100%" }}
              value={description}
              onChange={handleChangeDiscription}
            />
          </FormField>
        </FormItem>
      </SimpleCell>
    </Group>
  );
};
