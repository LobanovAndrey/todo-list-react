import { Icon28DeleteOutline, Icon28EditOutline  } from '@vkontakte/icons';
import { ButtonGroup, Card, Cell, Checkbox, FormField, FormItem, IconButton, Input, WriteBar } from '@vkontakte/vkui';
import { FC, useRef, useState } from 'react'
import { ITodo } from 'entities/ITodo';
import { useCallback } from 'react';
import { useAppDispatch } from 'hooks/redux-hooks';
import { removeTodo, updateTodo } from 'store/actions/todo.actions';
import { useAuth } from 'hooks/useAuth';

import styles from 'components/TodoItem/TodoItem.module.css'
import classNames from 'classnames';

interface TodoItemProps extends ITodo {};

export const TodoItem: FC<TodoItemProps> = ({
  id,
  name,
  description,
  completed,
}) => {
  const dispatch = useAppDispatch();
  const { userId } = useAuth();

  const inputNameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const [isOnEditing, setIsOnEditing] = useState<boolean>(false);

  const handleEdit = useCallback(() => {
    if (isOnEditing) {
      if (inputNameRef.current && inputNameRef.current.value !== '' ) {
        const needUpdate =
          name !== inputNameRef.current.value
          || (description && description !== descriptionRef?.current?.value);

        userId && needUpdate && dispatch(updateTodo({
          userUid: userId,
          id,
          name: inputNameRef.current.value,
          description: descriptionRef?.current?.value ?? description,
          completed,
        }));
      }
      
      setIsOnEditing(false);
      return;
    }

    setIsOnEditing(true);
  }, [completed, description, dispatch, id, isOnEditing, name, userId])

  const handleDelete = useCallback(() => {
    userId && dispatch(removeTodo({
      userUid: userId,
      todoId: id,
    }));
  }, [dispatch, id, userId]);

  const handleToogleComplete = useCallback(() => {
    userId && dispatch(updateTodo({
      userUid: userId,
      id,
      name,
      description,
      completed: !completed,
    }))
  }, [completed, description, dispatch, id, name, userId])

  return (
    <Card
      style={{opacity: completed ? 0.5 : 1, margin: '0 16px'}}
    >
      <Cell
        disabled
        style={{width: '100%'}}
        badgeBeforeTitle={
          <Checkbox
            checked={completed}
            onChange={handleToogleComplete} 
          />
        }
        badgeAfterTitle={
          <ButtonGroup gap='none' >
            <IconButton onClick={handleEdit}> 
              <Icon28EditOutline width={24} />
            </IconButton>
            <IconButton onClick={handleDelete}>
              <Icon28DeleteOutline 
                width={24}
                color='red'
              />
            </IconButton>
          </ButtonGroup>
        }

        subtitle={
          description &&
            <>
              <div style={{width: '100vw'}} />
              <FormField 
                mode={isOnEditing ? 'default' : 'plain'}
              >
                <WriteBar
                  className={
                    classNames(
                      styles.description,
                      isOnEditing && styles.activeBackground,
                    )
                  }
                  disabled={!isOnEditing}
                  defaultValue={description}
                  getRef={descriptionRef}
                />
              </FormField>
            </>
        }
      >
        <div style={{width: '100vw'}} />
        {
          isOnEditing ? (
            <Input
              className={
                classNames(
                  isOnEditing && styles.activeBackground,
                )
              }
              getRef={inputNameRef}
              defaultValue={name}
            />
          ) : (
            <span className={styles.title}>{name}</span>
          )
        }
      </Cell>
    </Card>
  )
};
