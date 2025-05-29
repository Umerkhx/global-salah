"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { format, formatDistanceToNow, parseISO } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Bell, MessageSquare, AtSign, ThumbsUp, UserPlus, AlertCircle, CheckCircle, Check, Trash2, Filter, BellOff, } from "lucide-react";
import { type Notification, type NotificationType, } from "@/lib/mock-notification";
import { urlSplitter } from "@/lib";
import { deleteAllNotifications, deleteNotifications, getUserNotifications } from "@/services/notifications";
import { refactorDate } from "@/lib/date";
import { useTranslation } from "@/hooks/useTranslation";

export default function NotificationsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const lang = urlSplitter(pathname);
  const { t } = useTranslation("forum")
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [notifications, setNotifications] = useState<any>([]);
  const [activeTab, setActiveTab] = useState<"all" | "unread" | "read">("all");
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<any>(null);

  const fetchUserNotifications = async () => {
    try {
      const response = await getUserNotifications(userId);

      if (response.status === 200) {

        setNotifications(response.data.notifications);
      }
    } catch (error: any) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUserNotifications();
    }
  }, [userId]);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setUserId(parsedUserData.id);
    }
  }, []);


  const handleDeleteNotification = async (id: string) => {
    try {
      const response = await deleteNotifications(id);

      if (response.status === 200) {
        setNotifications(response.data.notifications);
      }
    } catch (error: any) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAllNotification = async () => {
    try {
      const response = await deleteAllNotifications(userId);

      if (response.status === 200) {
        setNotifications(response.data.notifications);
      }
    } catch (error: any) {
    } finally {
      setIsLoading(false);
    }
  };



  const getNotificationIcon = (type: NotificationType) => {
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

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="border-primary/20"
            onClick={handleDeleteAllNotification}
          >
            <Check className="mr-2 h-4 w-4" />
            {t("forum.markread")}
          </Button>
        </div>
      </div>

      <Card className="border-emerald-400/20 bg-zinc-100 dark:bg-zinc-900 shadow-md">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-emerald-600/10 rounded-full flex items-center justify-center">
                <Bell className="h-5 w-5 " />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold">
                  {t("forum.notifications")}
                </CardTitle>
                <CardDescription>
                  {t("forum.updateactivity")}
                </CardDescription>
              </div>
            </div>
            {/* {unreadCount > 0 && (
              <Badge className="text-sm bg-emerald-500 text-zinc-100">
                {unreadCount} unread
              </Badge>
            )} */}
          </div>
        </CardHeader>

        <Tabs
          defaultValue="all"
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as any)}
        >
          <Separator />

          <TabsContent value="all" className="m-0">
            <NotificationList
              notifications={notifications}
              handleDeleteNotification={handleDeleteNotification}
              // markAsRead={markAsRead}
              // deleteNotification={deleteNotification}
              getNotificationIcon={getNotificationIcon}
            />
          </TabsContent>

          <TabsContent value="unread" className="m-0">
            <NotificationList
              notifications={notifications}
              handleDeleteNotification={handleDeleteNotification}
              // markAsRead={markAsRead}
              // deleteNotification={deleteNotification}
              getNotificationIcon={getNotificationIcon}
            />
          </TabsContent>

          <TabsContent value="read" className="m-0">
            <NotificationList
              notifications={notifications}
              handleDeleteNotification={handleDeleteNotification}
              // markAsRead={markAsRead}
              // deleteNotification={deleteNotification}
              getNotificationIcon={getNotificationIcon}
            />
          </TabsContent>
        </Tabs>

        {notifications.length === 0 && (
          <div className="py-16 text-center">
            <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <BellOff className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">{t("forum.nonotifications")}</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              {activeTab === "unread"
                ? "You've read all your notifications. Check back later for updates!"
                : activeTab === "read"
                  ? "You don't have any read notifications yet."
                  : "You don't have any notifications yet. Check back later!"}
            </p>
            {activeTab !== "all" && (
              <Button variant="outline" onClick={() => setActiveTab("all")}>
                {t("forum.viewnotifications")}
              </Button>
            )}
          </div>
        )}

        {/* {notifications.length > 0 && (
          <CardFooter className="flex justify-between border-t p-6">
            <Button
              variant="outline"
              size="sm"
              className="gap-1 border-primary/20"
            >
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <p className="text-sm text-muted-foreground">
              Showing {notifications.length} of {notifications.length}{" "}
              notifications
            </p>
          </CardFooter>
        )} */}
      </Card>
    </div>
  );
}

function NotificationList({
  notifications,
  handleDeleteNotification,
  markAsRead,
  deleteNotification,
  getNotificationIcon,
}: any) {
  const pathname = usePathname();
  const lang = urlSplitter(pathname);
  const { t } = useTranslation("forum")
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
            className="relative"
          >
            <div
              className={`p-6 hover:bg-muted/30 transition-colors ${!notification.is_read ? "bg-emerald-600/5" : ""
                }`}
            >
              <div className="flex gap-4">
                {notification.sender ? null : (
                  // <Avatar className="h-10 w-10 border border-primary/20">
                  //   <AvatarImage
                  //     src={notification.sender.avatar}
                  //     alt={notification.sender.name}
                  //   />
                  //   <AvatarFallback className="bg-emerald-600/10 ">
                  //     {notification.sender.initials}
                  //   </AvatarFallback>
                  // </Avatar>
                  <div className="h-10 w-10 bg-muted/50 rounded-full flex items-center justify-center">
                    {getNotificationIcon(notification.type)}
                  </div>
                )}

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
                      {refactorDate(notification.createdAt)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {notification.message}
                  </p>

                  <div className="flex items-center justify-between mt-2 pt-1">
                    {notification.link ? (
                      <Link href={notification.link}>
                        <Button
                          variant="link"
                          size="sm"
                          className="h-auto p-0 text-primary"
                        >
                          {t("forum.viewdetails")}
                        </Button>
                      </Link>
                    ) : (
                      <div></div>
                    )}

                    <div className="flex items-center gap-2">
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="sm"
                          // onClick={() => markAsRead(notification.id)}
                          className="h-8 px-2"
                        >
                          <span className="sr-only">{t("forum.markasread")}</span>
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          handleDeleteNotification(notification.id)
                        }
                        className="h-8 px-2 text-red-500 hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">{t("forum.delete")}</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
