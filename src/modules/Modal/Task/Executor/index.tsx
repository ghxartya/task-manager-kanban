import {
  Avatar,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem
} from '@heroui/react'
import { useEffect, useState } from 'react'

import type { Executor } from '@/types/board'

import Text from '@/ui/text/Text'

import users from './users.json'

interface ExecutorModalProps {
  isOpen: boolean
  onClose: () => void
  onOpenChange: () => void
  executor: Executor['id']
  onSelect: (executor: Executor) => void
}

export default function ExecutorModal({
  isOpen,
  onClose,
  executor,
  onSelect,
  onOpenChange
}: ExecutorModalProps) {
  const [selectedKey, setSelectedKey] = useState('')

  useEffect(() => {
    if (isOpen && executor) setSelectedKey(String(executor))
  }, [isOpen])

  const handleConfirm = () => {
    const selected = users.find(user => String(user.id) === selectedKey)
    if (selected) onSelect(selected)
  }

  return (
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
        <ModalHeader>Обрати виконавця</ModalHeader>
        <ModalBody>
          <Select
            isRequired
            items={users}
            label='Виконавець'
            errorMessage={({ validationDetails }) => {
              if (validationDetails.valueMissing)
                return "Виконавець обов'язковий"
            }}
            selectedKeys={selectedKey ? [selectedKey] : []}
            onSelectionChange={keys =>
              setSelectedKey(Array.from(keys)[0] as string)
            }
          >
            {user => (
              <SelectItem key={user.id} textValue={user.name}>
                <div className='flex items-center gap-2'>
                  <Avatar
                    size='sm'
                    alt={user.name}
                    src={user.avatar}
                    className='selection:text-transparent'
                  />
                  <div>
                    <Text size='small' selectable={false}>
                      {user.name}
                    </Text>
                    <Text size='tiny' className='opacity-50' selectable={false}>
                      {user.email}
                    </Text>
                  </div>
                </div>
              </SelectItem>
            )}
          </Select>
        </ModalBody>
        <ModalFooter>
          <Button color='danger' variant='light' onPress={onClose}>
            Закрити
          </Button>
          <Button
            color='primary'
            isDisabled={!selectedKey}
            className='text-secondary font-medium'
            onPress={handleConfirm}
          >
            Підтвердити
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
