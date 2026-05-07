import React, { useState } from "react";
import {
  Container,
  Table,
  TBody,
  TD,
  THead,
  TH,
  TRow,
  Modal,
  ModalTriggerButton,
  ModalButton,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Dropdown,
  Button,
  Text,
  Badge,
  Avatar,
  Input,
} from "@neuctra/ui";
import {
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Search,
  Plus,
  Filter,
  Download,
} from "lucide-react";

export default function TableWithActions() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
      status: "Active",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
      lastActive: "2 hours ago"
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "User",
      status: "Active",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face",
      lastActive: "1 day ago"
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob@example.com",
      role: "User",
      status: "Inactive",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
      lastActive: "3 days ago"
    },
  ];

  const handleView = (user) => {
    setSelectedUser(user);
    setIsViewModalOpen(true);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleDelete = (user) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const getDropdownItems = (user) => [
    {
      label: "View Details",
      icon: Eye,
      onClick: () => handleView(user),
    },
    {
      label: "Edit User",
      icon: Edit,
      onClick: () => handleEdit(user),
    },
    {
      label: "Delete User",
      icon: Trash2,
      onClick: () => handleDelete(user),
      variant: "danger",
    },
  ];

  return (
    <Container className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Text variant="h4" className="mb-2">User Management</Text>
          <Text variant="body1" className="text-gray-600">
            Manage your users and their permissions
          </Text>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search users..."
            prefix={<Search className="w-4 h-4" />}
          />
        </div>
        <Button variant="outline" size="sm">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      <Container className="bg-white rounded-lg border border-gray-200">
        <Table>
          <THead>
            <TRow>
              <TH>User</TH>
              <TH>Role</TH>
              <TH>Status</TH>
              <TH>Last Active</TH>
              <TH className="text-right">Actions</TH>
            </TRow>
          </THead>
          <TBody>
            {users.map((user) => (
              <TRow key={user.id}>
                <TD>
                  <div className="flex items-center gap-3">
                    <Avatar size="sm" src={user.avatar} />
                    <div>
                      <Text variant="body2" className="font-medium">{user.name}</Text>
                      <Text variant="body2" className="text-gray-500">{user.email}</Text>
                    </div>
                  </div>
                </TD>
                <TD>
                  <Badge variant="secondary">{user.role}</Badge>
                </TD>
                <TD>
                  <Badge variant={user.status === 'Active' ? 'success' : 'danger'}>
                    {user.status}
                  </Badge>
                </TD>
                <TD>
                  <Text variant="body2" className="text-gray-500">{user.lastActive}</Text>
                </TD>
                <TD className="text-right">
                  <Dropdown
                    trigger={
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    }
                    items={getDropdownItems(user)}
                  />
                </TD>
              </TRow>
            ))}
          </TBody>
        </Table>
      </Container>

      <Modal open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <ModalContent>
          <ModalHeader>
            <Text variant="h6">User Details</Text>
          </ModalHeader>
          <ModalBody>
            {selectedUser && (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar size="lg" src={selectedUser.avatar} />
                  <div>
                    <Text variant="h6">{selectedUser.name}</Text>
                    <Text variant="body2" className="text-gray-500">{selectedUser.email}</Text>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Text variant="body2" className="text-gray-500">Role</Text>
                    <Badge variant="secondary">{selectedUser.role}</Badge>
                  </div>
                  <div>
                    <Text variant="body2" className="text-gray-500">Status</Text>
                    <Badge variant={selectedUser.status === 'Active' ? 'success' : 'danger'}>
                      {selectedUser.status}
                    </Badge>
                  </div>
                </div>
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <ModalButton variant="outline" onClick={() => setIsViewModalOpen(false)}>
              Close
            </ModalButton>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <ModalContent>
          <ModalHeader>
            <Text variant="h6">Edit User</Text>
          </ModalHeader>
          <ModalBody>
            {selectedUser && (
              <div className="space-y-4">
                <div>
                  <Text variant="body2" className="mb-2">Name</Text>
                  <Input defaultValue={selectedUser.name} />
                </div>
                <div>
                  <Text variant="body2" className="mb-2">Email</Text>
                  <Input defaultValue={selectedUser.email} />
                </div>
                <div>
                  <Text variant="body2" className="mb-2">Role</Text>
                  <Input defaultValue={selectedUser.role} />
                </div>
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <ModalButton variant="outline" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </ModalButton>
            <ModalButton onClick={() => setIsEditModalOpen(false)}>
              Save Changes
            </ModalButton>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <ModalContent>
          <ModalHeader>
            <Text variant="h6">Delete User</Text>
          </ModalHeader>
          <ModalBody>
            {selectedUser && (
              <Text variant="body1">
                Are you sure you want to delete {selectedUser.name}? This action cannot be undone.
              </Text>
            )}
          </ModalBody>
          <ModalFooter>
            <ModalButton variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </ModalButton>
            <ModalButton variant="danger" onClick={() => setIsDeleteModalOpen(false)}>
              Delete User
            </ModalButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
}
