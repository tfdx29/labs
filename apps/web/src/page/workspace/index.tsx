import { EditingWorkspaceState } from "@/types/workspace.types";
import { Button } from "@labs/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@labs/ui/components/card";
import { Input } from "@labs/ui/components/input";
import { useMutation, useQuery } from "@tanstack/react-query";
import { orpc } from "@/utils/orpc";
import { Loader2, Trash2, Pencil, Check, X, Plus } from "lucide-react";
import { useState, type SubmitEvent } from "react";
import { toast } from "sonner";

const WorkspacePage = () => {
  const [newWorkspaceName, setNewWorkspaceName] = useState("");
  const [newWorkspaceDesc, setNewWorkspaceDesc] = useState("");
  const [editingWorkspace, setEditingWorkspace] =
    useState<EditingWorkspaceState | null>(null);

  const workspaces = useQuery(orpc.workspace.getAll.queryOptions());

  const createMutation = useMutation(
    orpc.workspace.create.mutationOptions({
      onSuccess: () => {
        workspaces.refetch();
        setNewWorkspaceName("");
        setNewWorkspaceDesc("");
        toast.success("Workspace created successfully");
      },
      onError: (error) => {
        toast.error(`Failed to create workspace: ${error.message}`);
      },
    }),
  );

  const updateMutation = useMutation(
    orpc.workspace.update.mutationOptions({
      onSuccess: () => {
        workspaces.refetch();
        setEditingWorkspace(null);
        toast.success("Workspace updated successfully");
      },
      onError: (error) => {
        toast.error(`Failed to update workspace: ${error.message}`);
      },
    }),
  );

  const deleteMutation = useMutation(
    orpc.workspace.delete.mutationOptions({
      onSuccess: () => {
        workspaces.refetch();
        toast.success("Workspace deleted successfully");
      },
      onError: (error) => {
        toast.error(`Failed to delete workspace: ${error.message}`);
      },
    }),
  );

  // Handlers
  const handleCreateWorkspace = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newWorkspaceName.trim()) {
      createMutation.mutate({
        name: newWorkspaceName.trim(),
        description: newWorkspaceDesc.trim() || undefined,
      });
    }
  };

  const handleStartEdit = (
    id: string,
    name: string,
    description: string | null,
  ) => {
    setEditingWorkspace({
      id,
      name,
      description: description ?? "",
    });
  };

  const handleCancelEdit = () => {
    setEditingWorkspace(null);
  };

  const handleSaveEdit = () => {
    if (editingWorkspace && editingWorkspace.name.trim()) {
      updateMutation.mutate({
        id: editingWorkspace.id,
        name: editingWorkspace.name.trim(),
        description: editingWorkspace.description.trim() || undefined,
      });
    }
  };

  const handleDeleteWorkspace = (id: string) => {
    if (confirm("Are you sure you want to delete this workspace?")) {
      deleteMutation.mutate({ id });
    }
  };

  return (
    <div className="mx-auto w-full max-w-2xl py-10 px-4">
      <Card>
        <CardHeader>
          <CardTitle>Workspaces</CardTitle>
          <CardDescription>
            Create and manage your project workspaces
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Create Form */}
          <form
            onSubmit={handleCreateWorkspace}
            className="space-y-4 rounded-lg border p-4"
          >
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Plus className="h-5 w-5" /> New Workspace
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Input
                  value={newWorkspaceName}
                  onChange={(e) => setNewWorkspaceName(e.target.value)}
                  placeholder="Workspace Name (e.g. Acme Inc)"
                  disabled={createMutation.isPending}
                  required
                />
              </div>
              <div className="space-y-1">
                <Input
                  value={newWorkspaceDesc}
                  onChange={(e) => setNewWorkspaceDesc(e.target.value)}
                  placeholder="Description (Optional)"
                  disabled={createMutation.isPending}
                />
              </div>
            </div>
            <Button
              type="submit"
              disabled={createMutation.isPending || !newWorkspaceName.trim()}
              className="w-full md:w-auto"
            >
              {createMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating...
                </>
              ) : (
                "Create Workspace"
              )}
            </Button>
          </form>

          {/* Workspaces List */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Your Workspaces</h3>

            {workspaces.isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : workspaces.data?.length === 0 ? (
              <p className="text-center text-muted-foreground py-8 border border-dashed rounded-md">
                No workspaces found. Create one above!
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {workspaces.data?.map((ws) => {
                  const isEditing = editingWorkspace?.id === ws.id;

                  return (
                    <div
                      key={ws.id}
                      className="flex flex-col md:flex-row justify-between items-start md:items-center rounded-lg border p-4 gap-4"
                    >
                      {isEditing ? (
                        <div className="flex-1 w-full space-y-2">
                          <Input
                            value={editingWorkspace.name}
                            onChange={(e) =>
                              setEditingWorkspace({
                                ...editingWorkspace,
                                name: e.target.value,
                              })
                            }
                            placeholder="Workspace Name"
                            className="font-medium text-base"
                            disabled={updateMutation.isPending}
                          />
                          <Input
                            value={editingWorkspace.description}
                            onChange={(e) =>
                              setEditingWorkspace({
                                ...editingWorkspace,
                                description: e.target.value,
                              })
                            }
                            placeholder="Description"
                            className="text-sm"
                            disabled={updateMutation.isPending}
                          />
                        </div>
                      ) : (
                        <div className="space-y-1">
                          <h4 className="font-semibold text-base">{ws.name}</h4>
                          {ws.description && (
                            <p className="text-sm text-muted-foreground">
                              {ws.description}
                            </p>
                          )}
                          <div className="flex flex-wrap gap-4 text-xs text-muted-foreground pt-1">
                            <span>Entities: {ws.entitiesCount}</span>
                            <span>
                              Created:{" "}
                              {new Date(ws.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center gap-2 w-full md:w-auto justify-end border-t md:border-t-0 pt-2 md:pt-0">
                        {isEditing ? (
                          <>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={handleSaveEdit}
                              disabled={
                                updateMutation.isPending ||
                                !editingWorkspace.name.trim()
                              }
                              title="Save Changes"
                            >
                              {updateMutation.isPending ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Check className="h-4 w-4 text-green-600" />
                              )}
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={handleCancelEdit}
                              disabled={updateMutation.isPending}
                              title="Cancel Edit"
                            >
                              <X className="h-4 w-4 text-red-500" />
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() =>
                                handleStartEdit(ws.id, ws.name, ws.description)
                              }
                              disabled={deleteMutation.isPending}
                              title="Edit Workspace"
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteWorkspace(ws.id)}
                              disabled={deleteMutation.isPending}
                              title="Delete Workspace"
                            >
                              {deleteMutation.isPending ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Trash2 className="h-4 w-4 text-destructive" />
                              )}
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkspacePage;
