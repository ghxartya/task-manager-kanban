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
import { useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { Fragment, useEffect, useState } from 'react'
import {
  Controller,
  type SubmitHandler,
  useForm,
  useWatch
} from 'react-hook-form'
import { IoMdAddCircle } from 'react-icons/io'
import { LuTrash } from 'react-icons/lu'

import { CloudinaryService } from '@/services/cloudinary'

import { PRIORITY } from '@/consts/priority'
import { VALIDATION } from '@/consts/validation'

import { useStore } from '@/store'

import { normalizeWhitespace } from '@/utils/normalize'

import type { Task } from '@/types/board'

import File from '@/ui/file/File'
import Text from '@/ui/text/Text'

import ExecutorModal from './Executor'

type FormTask = Omit<Task, 'id'>

interface FormData extends Omit<FormTask, 'term' | 'file'> {
  term: ZonedDateTime
  file?: File
}

export default function TaskModal() {
  const { editingTask, tasks, addTask, updateTask, setEditingTask } = useStore()
  const { isOpen, onOpenChange, onClose, onOpen } = useDisclosure()

  const { reset, watch, control, setValue, handleSubmit } = useForm<FormData>({
    mode: 'all'
  })

  const [serverErrors, setServerErrors] = useState({ file: '' })
  const [removeExistingFile, setRemoveExistingFile] = useState(false)

  const { mutate: submit, isPending } = useMutation<
    FormTask,
    AxiosError,
    FormData
  >({
    mutationFn: async newTask => {
      let file: Task['file']

      if (editingTask) {
        file = editingTask.file
        if (removeExistingFile) file = undefined
      }

      if (newTask.file) {
        const { data } = await CloudinaryService.uploadFile(newTask.file)
        file = data.secure_url
      }

      return { ...newTask, term: newTask.term.toString(), file }
    },
    onSuccess: task => {
      const id = editingTask
        ? editingTask.id
        : tasks.length
          ? Math.max(...tasks.map(task => Number(task.id))) + 1
          : 1

      if (editingTask) updateTask({ id, ...task })
      else addTask({ id, ...task })
      onClose()
    },
    onError: () => setServerErrors({ file: 'Помилка завантаження файлу' })
  })

  const onSubmit: SubmitHandler<FormData> = newTask => submit(newTask)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    if (isOpen) {
      if (editingTask) {
        const { name, description, priority, term, column, executor } =
          editingTask

        reset({
          name,
          description,
          priority,
          term: parseZonedDateTime(term),
          column,
          executor
        })
      } else {
        const term = now('Europe/Kyiv').add({ weeks: 1 })

        reset({
          name: '',
          description: '',
          priority: 'medium',
          term,
          column: 'todo',
          executor: {
            id: undefined,
            name: '',
            avatar: ''
          }
        })
      }
      setIsInitialized(true)
    } else setIsInitialized(false)
  }, [isOpen])

  useEffect(() => {
    if (editingTask) onOpen()
  }, [editingTask])

  useEffect(() => {
    if (!isOpen && editingTask) {
      setEditingTask(null)
      if (removeExistingFile) setRemoveExistingFile(false)
    }
  }, [isOpen])

  const [previewUrl, setPreviewUrl] = useState('')
  const selectedFile = useWatch({ control, name: 'file' })

  useEffect(() => {
    if (selectedFile) {
      setRemoveExistingFile(false)
      setServerErrors({ file: '' })

      const objectUrl = URL.createObjectURL(selectedFile)
      setPreviewUrl(objectUrl)

      return () => URL.revokeObjectURL(objectUrl)
    } else setPreviewUrl('')
  }, [selectedFile])

  const currentFileUrl = selectedFile
    ? previewUrl
    : removeExistingFile
      ? ''
      : editingTask?.file

  const showDeleteFile =
    !!editingTask && !!editingTask.file && !selectedFile && !removeExistingFile

  const {
    isOpen: isExecutorModalOpen,
    onOpen: onOpenExecutorModal,
    onClose: onCloseExecutorModal,
    onOpenChange: onExecutorModalOpenChange
  } = useDisclosure()

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
              <Form
                id='task-form'
                validationErrors={serverErrors}
                onSubmit={handleSubmit(onSubmit)}
              >
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
                      items={PRIORITY}
                      label='Пріорітет'
                      isInvalid={!!error}
                      errorMessage={error?.message}
                      selectedKeys={field.value ? [field.value] : []}
                    >
                      {({ key, label }) => (
                        <SelectItem key={key}>{label}</SelectItem>
                      )}
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
                          return 'Термін має бути раніше'
                        else if (validationDetails.rangeUnderflow)
                          return 'Термін має бути пізніше'
                      }}
                      classNames={{
                        input: 'selection:text-primary/75'
                      }}
                    />
                  )}
                />
                <Controller
                  name='file'
                  control={control}
                  rules={{
                    validate: (file?: File) => {
                      if (file) {
                        const allowedTypes = [
                          'text/html',
                          'image/png',
                          'image/gif',
                          'image/jpeg',
                          'image/webp',
                          'text/plain',
                          'application/pdf'
                        ]
                        if (!allowedTypes.includes(file.type))
                          return 'Недійсний тип файлу'
                        const maxSize = 10 * 1024 * 1024
                        if (file.size > maxSize)
                          return 'Файл занадто великий (макс. 10 МБ)'
                      }
                    }
                  }}
                  render={({ field, fieldState: { error } }) => (
                    <Input
                      type='file'
                      label='Файл (опціонально)'
                      accept='.html, .png, .gif, .jpg, .jpeg, .webp, .txt, .pdf'
                      isInvalid={!!error || !!serverErrors.file}
                      errorMessage={error?.message ?? serverErrors.file}
                      onChange={event =>
                        field.onChange(event.target.files?.[0])
                      }
                      endContent={
                        <div className='flex items-center gap-2'>
                          <File file={currentFileUrl} isFileInput />
                          {showDeleteFile && (
                            <Button
                              size='sm'
                              isIconOnly
                              radius='full'
                              color='danger'
                              aria-label='Delete file'
                              onPress={() => setRemoveExistingFile(true)}
                            >
                              <LuTrash
                                size={20}
                                className='text-white dark:text-black'
                              />
                            </Button>
                          )}
                        </div>
                      }
                    />
                  )}
                />
                <Controller
                  name='executor.id'
                  control={control}
                  rules={{ required: 'Будь ласка, оберіть виконавця' }}
                  render={({ field, fieldState: { error } }) => (
                    <div className='flex w-full flex-col gap-1'>
                      <input
                        {...field}
                        type='hidden'
                        value={field.value ?? ''}
                      />
                      <Button
                        fullWidth
                        radius='lg'
                        variant='flat'
                        color='primary'
                        onPress={onOpenExecutorModal}
                      >
                        {field.value ? 'Змінити' : 'Обрати'} виконавця
                      </Button>
                      {error && (
                        <Text size='tiny' color='danger' center>
                          {error.message}
                        </Text>
                      )}
                    </div>
                  )}
                />
                <ExecutorModal
                  isOpen={isExecutorModalOpen}
                  executor={watch('executor.id')}
                  onSelect={
                    executor => {
                      setValue('executor', executor, { shouldValidate: true })
                      onCloseExecutorModal()
                    }
                    /* Коментар
                     * Пояснення підходу:
                     * Nested modal повертає значення через callback,
                     * і ми зберігаємо його у react-hook-form.
                     *
                     * Такий підхід:
                     * - уникає побічних ефектів глобального стану
                     * - дозволяє тримати всю форму в RHF
                     * - дуже передбачуваний
                     */
                  }
                  onClose={onCloseExecutorModal}
                  onOpenChange={onExecutorModalOpenChange}
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
              isLoading={isPending}
              className='text-secondary font-medium'
            >
              {isPending ? 'Підтвердження...' : 'Підтвердити'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Fragment>
  )
}
