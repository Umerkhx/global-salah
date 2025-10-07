"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Bell,
  MessageSquare,
  AtSign,
  ThumbsUp,
  UserPlus,
  AlertCircle,
  CheckCircle,
  Trash2,
  BellOff,
  Check,
} from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { refactorDate } from "@/lib/date";
import { urlSplitter } from "@/lib";
import { useTranslation } from "@/hooks/useTranslation";

export default function NotificationsPage() {
  const pathname = usePathname();
  const lang = urlSplitter(pathname);
  const { t } = useTranslation("forum");

  const [notifications, setNotifications] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"all" | "unread" | "read">("all");
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<number | null>(null);

  const fetchUserNotifications = async () => {
    try {
      if (!userId) return;
      const res = await fetch(`/api/notifications/get-notifications?userId=${userId}`);
      const data = await res.json();
      if (res.ok) {
        setNotifications(data.notifications || []);
      }
    } catch (error) {
      console.error("Fetch notifications error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const parsed = JSON.parse(storedUserData);
      setUserId(parsed.id);
    }
  }, []);

  useEffect(() => {
    if (userId) fetchUserNotifications();
  }, [userId]);

  const handleDeleteNotification = async (id: string) => {
    try {
      if (!userId) return;
      const res = await fetch(`/api/notifications/delete-notifications?id=${id}&userId=${userId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
      }
    } catch (error) {
      console.error("Delete notification error:", error);
    }
  };

  const handleDeleteAllNotification = async () => {
    try {
      if (!userId) return;
      const res = await fetch(`/api/notifications/delete-notifications?userId=${userId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setNotifications([]);
      }
    } catch (error) {
      console.error("Delete all notifications error:", error);
    }
  };

  const handleMarkRead = async (id: string) => {
    try {
      if (!userId) return;
      const res = await fetch(`/api/notifications/update-notifications`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ all: false, user_id: userId, id }),
      });
      if (res.ok) {
        setNotifications((prev) =>
          prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
        );
      }
    } catch (error) {
      console.error("Mark single notification read error:", error);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      if (!userId) return;
      const res = await fetch(`/api/notifications/update-notifications`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ all: true, user_id: userId }),
      });
      if (res.ok) {
        setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
      }
    } catch (error) {
      console.error("Mark all notifications read error:", error);
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "answer":
        return <MessageSquare className="h-4 w-4 text-blue-500" />;
      case "mention":
        return <AtSign className="h-4 w-4 text-purple-500" />;
      case "like":
        return <ThumbsUp className="h-4 w-4 text-red-500" />;
      case "follow":
        return <UserPlus className="h-4 w-4 text-green-500" />;
      case "system":
        return <AlertCircle className="h-4 w-4 text-orange-500" />;
      case "question_approved":
        return <CheckCircle className="h-4 w-4 text-emerald-500" />;
      default:
        return <Bell className="h-4 w-4 text-primary" />;
    }
  };

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-6">
        <Link href={`/${lang}/forum`}>
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            {t("forum.returnforum")}
          </Button>
        </Link>
        <div className="flex gap-2">
          {notifications.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              className="border-primary/20"
              onClick={handleMarkAllRead}
            >
              <Check className="mr-2 h-4 w-4" />
              {t("forum.markread")}
            </Button>
          )}
          {notifications.length > 0 && (
            <Button
              variant="destructive"
              size="sm"
              className="border-primary/20"
              onClick={handleDeleteAllNotification}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete All
            </Button>
          )}
        </div>
      </div>

      <Card className="border-emerald-400/20 bg-zinc-100 dark:bg-zinc-900 shadow-md">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-emerald-600/10 rounded-full flex items-center justify-center">
              <Bell className="h-5 w-5 " />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold">
                {t("forum.notifications")}
              </CardTitle>
              <CardDescription>{t("forum.updateactivity")}</CardDescription>
            </div>
          </div>
        </CardHeader>

        <Tabs value={activeTab} onValueChange={(v: any) => setActiveTab(v)}>
          <TabsList className="px-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">Unread</TabsTrigger>
            <TabsTrigger value="read">Read</TabsTrigger>
          </TabsList>

          <Separator />

          <TabsContent value="all" className="m-0">
            <NotificationList
              notifications={notifications}
              handleDeleteNotification={handleDeleteNotification}
              handleMarkRead={handleMarkRead}
              getNotificationIcon={getNotificationIcon}
              isLoading={isLoading}
              emptyText="No notifications yet"
            />
          </TabsContent>

          <TabsContent value="unread" className="m-0">
            <NotificationList
              notifications={notifications.filter((n) => n.is_read === false)}
              handleDeleteNotification={handleDeleteNotification}
              handleMarkRead={handleMarkRead}
              getNotificationIcon={getNotificationIcon}
              isLoading={isLoading}
              emptyText="No unread notifications"
            />
          </TabsContent>

          <TabsContent value="read" className="m-0">
            <NotificationList
              notifications={notifications.filter((n) => n.is_read === true)}
              handleDeleteNotification={handleDeleteNotification}
              handleMarkRead={handleMarkRead}
              getNotificationIcon={getNotificationIcon}
              isLoading={isLoading}
              emptyText="No read notifications"
            />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}

function NotificationList({
  notifications,
  handleDeleteNotification,
  handleMarkRead,
  getNotificationIcon,
  isLoading,
  emptyText,
}: any) {
  if (isLoading) {
    return <div className="p-6 text-muted-foreground">Loading...</div>;
  }

  if (!notifications.length) {
    return (
      <div className="py-16 text-center">
        <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
          <BellOff className="h-8 w-8 text-muted-foreground" />
        </div>
        <p className="text-muted-foreground">{emptyText}</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-border">
      <AnimatePresence initial={false}>
        {[...notifications].reverse().map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className={`relative p-6 hover:bg-muted/30 transition-colors ${
              !notification.is_read ? "bg-emerald-600/5" : ""
            }`}
          >
            <div className="flex gap-4">
              <div className="h-10 w-10 bg-muted/50 rounded-full flex items-center justify-center">
                {getNotificationIcon(notification.type)}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-sm flex items-center gap-2">
                    {getNotificationIcon(notification.type)}
                    {notification.title}
                    {!notification.is_read && (
                      <span className="h-2 w-2 rounded-full bg-emerald-600 inline-block"></span>
                    )}
                  </p>
                  <span className="text-xs text-muted-foreground">
                    {refactorDate(notification.created_at)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{notification.message}</p>
                <div className="flex justify-end mt-2 gap-2">
                  {!notification.is_read && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleMarkRead(notification.id)}
                      className="h-8 px-2"
                    >
                      <Check className="h-4 w-4 mr-1" />
                      Mark Read
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteNotification(notification.id)}
                    className="h-8 px-2 text-red-500 hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
