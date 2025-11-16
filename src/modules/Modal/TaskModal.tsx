import {
  Button,
  DateInput,
  Form,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Textarea,
  useDisclosure
} from '@heroui/react'
import { ZonedDateTime, now, parseZonedDateTime } from '@internationalized/date'
import { Fragment, useEffect, useState } from 'react'
import { Controller, type SubmitHandler, useForm } from 'react-hook-form'
import { IoMdAddCircle } from 'react-icons/io'

import { VALIDATION } from '@/consts/validation'

import { useStore } from '@/store'

import { normalizeWhitespace } from '@/utils/normalize'

import type { Task } from '@/types/board'

interface FormData extends Omit<Task, 'id' | 'term'> {
  term: ZonedDateTime
}

export default function TaskModal() {
  const { editingTask, tasks, addTask, updateTask, setEditingTask } = useStore()
  const { isOpen, onOpenChange, onClose, onOpen } = useDisclosure()

  const { reset, control, handleSubmit } = useForm<FormData>({
    mode: 'all'
  })

  const onSubmit: SubmitHandler<FormData> = newTask => {
    const id = editingTask
      ? editingTask.id
      : tasks.length
        ? Math.max(...tasks.map(task => Number(task.id))) + 1
        : 1

    const term = newTask.term.toString()
    if (editingTask) updateTask({ id, ...newTask, term })
    else addTask({ id, ...newTask, term })
    onClose()
  }

  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    if (isOpen) {
      if (editingTask) {
        const { name, description, priority, term, column } = editingTask

        reset({
          name,
          description,
          priority,
          term: parseZonedDateTime(term),
          column
        })
      } else {
        const term = now('Europe/Kyiv').add({ weeks: 1 })

        reset({
          name: '',
          description: '',
          priority: 'medium',
          term,
          column: 'todo'
        })
      }
      setIsInitialized(true)
    } else setIsInitialized(false)
  }, [isOpen])

  useEffect(() => {
    if (editingTask) onOpen()
  }, [editingTask])

  useEffect(() => {
    if (!isOpen && editingTask) setEditingTask(null)
  }, [isOpen])

  return (
    <Fragment>
      <Button
        radius='lg'
        variant='faded'
        aria-label='Create task'
        className='text-primary transition-transform-opacity gap-1.5 bg-transparent font-bold shadow-sm'
        onPress={onOpen}
      >
        <IoMdAddCircle size={20} className='text-primary' />
        Створити задачу
      </Button>
      <Modal
        backdrop='blur'
        placement='center'
        classNames={{
          backdrop: 'backdrop-blur-sm'
        }}
        hideCloseButton
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className='bg-secondary select-none'
      >
        <ModalContent>
          <ModalHeader>
            {editingTask ? 'Редагувати' : 'Створити'} задачу
          </ModalHeader>
          <ModalBody>
            {isInitialized && (
              <Form id='task-form' onSubmit={handleSubmit(onSubmit)}>
                <Controller
                  name='name'
                  control={control}
                  rules={{
                    required: "Назва обов'язкова",
                    maxLength: VALIDATION.TASK_MODAL.NAME.MAX_LENGTH
                  }}
                  render={({ field, fieldState: { error } }) => (
                    <Input
                      {...field}
                      isRequired
                      type='text'
                      label='Назва'
                      isInvalid={!!error}
                      errorMessage={error?.message}
                      onChange={event =>
                        field.onChange(normalizeWhitespace(event.target.value))
                      }
                      classNames={{
                        input: 'selection:text-primary/75'
                      }}
                    />
                  )}
                />
                <Controller
                  name='description'
                  control={control}
                  rules={{
                    required: "Опис обов'язковий",
                    maxLength: VALIDATION.TASK_MODAL.DESCRIPTION.MAX_LENGTH
                  }}
                  render={({ field, fieldState: { error } }) => (
                    <Textarea
                      {...field}
                      isRequired
                      type='text'
                      label='Опис'
                      isInvalid={!!error}
                      errorMessage={error?.message}
                      onChange={event =>
                        field.onChange(normalizeWhitespace(event.target.value))
                      }
                      classNames={{
                        input: 'selection:text-primary/75'
                      }}
                    />
                  )}
                />
                <Controller
                  name='priority'
                  control={control}
                  rules={{ required: "Пріорітет обов'язковий" }}
                  render={({ field, fieldState: { error } }) => (
                    <Select
                      {...field}
                      isRequired
                      label='Пріорітет'
                      isInvalid={!!error}
                      errorMessage={error?.message}
                      selectedKeys={field.value ? [field.value] : []}
                    >
                      <SelectItem key='low'>Низький</SelectItem>
                      <SelectItem key='medium'>Середній</SelectItem>
                      <SelectItem key='high'>Високий</SelectItem>
                    </Select>
                  )}
                />
                <Controller
                  name='term'
                  control={control}
                  render={({ field }) => (
                    <DateInput
                      {...field}
                      isRequired
                      hideTimeZone
                      label='Термін'
                      hourCycle={24}
                      errorMessage={({ validationDetails }) => {
                        if (validationDetails.valueMissing)
                          return "Термін обов'язковий"
                        else if (validationDetails.rangeOverflow)
                          return 'Термін має бути раніше.'
                        else if (validationDetails.rangeUnderflow)
                          return 'Термін має бути пізніше.'
                      }}
                      classNames={{
                        input: 'selection:text-primary/75'
                      }}
                    />
                  )}
                />
              </Form>
            )}
          </ModalBody>
          <ModalFooter>
            <Button color='danger' variant='light' onPress={onClose}>
              Закрити
            </Button>
            <Button
              type='submit'
              form='task-form'
              color='primary'
              className='text-secondary font-medium'
            >
              Підтвердити
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Fragment>
  )
}
