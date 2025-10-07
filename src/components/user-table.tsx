import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/formatDate";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  getAllUsers,
  updateUserAccountStatus,
} from "@/services/authentication";
import { toast } from "sonner";

export function UsersTable() {
  const [users, setUsers] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);



  const fetchAllUsers = async () => {
    try {
      const response = await fetch(`/api/users/get-users`);
      const data = await response.json();

      if (response.status === 200) {
        const filteredUsers = data.users.filter((user: any) => user.role !== "admin");
        setUsers(filteredUsers.reverse());
      }
    } catch (error: any) {
      toast.error(error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

const handleUserAccountTypeUpdate = async (id: string, status: string) => {
  try {
    setIsLoading(true);

    const response = await fetch("/api/users/update-status", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: id, account_status: status }),
    });

    const data = await response.json();

    if (response.status === 200) {
      toast.success(data.message);

      setUsers((prevUsers: any) =>
        prevUsers.map((user: any) =>
          user.id === id ? { ...user, account_status: status } : user
        )
      );
    } else {
      toast.error(data.error || "Failed to update user");
    }
  } catch (error: any) {
    toast.error(error?.message || "Something went wrong");
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16">S.No</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user: any, index: any) => (
            <TableRow key={user.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell className="font-medium">{user.fullname}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Badge
                  className={
                    user.account_status === "active"
                      ? "bg-green-500"
                      : user.account_status === "inactive"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }
                >
                  {user?.account_status?.charAt(0)?.toUpperCase() +
                    user?.account_status?.slice(1)}
                </Badge>
              </TableCell>
              <TableCell>{formatDate(new Date(user.created_at))}</TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {user.status !== "active" && (
                    <DropdownMenuItem
                      onClick={() =>
                        handleUserAccountTypeUpdate(user.id, "active")
                      }
                    >
                      Activate User
                    </DropdownMenuItem>
                  )}
                  {user.status !== "suspended" && (
                    <DropdownMenuItem
                      onClick={() =>
                        handleUserAccountTypeUpdate(user.id, "suspended")
                      }
                    >
                      Suspend User
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
