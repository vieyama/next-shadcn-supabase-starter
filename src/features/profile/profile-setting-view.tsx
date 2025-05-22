"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User } from "@supabase/supabase-js";
import ProfileForm from "./profile-form";
import PasswordForm from "./password-form";




export default function ProfileSettings({ user }: { user: User | null }) {
  const [activeTab, setActiveTab] = useState("account");



  return (
    <div className="space-y-6">
      <Tabs defaultValue="account" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="account" className="space-y-6">
          <ProfileForm userMetaData={user?.user_metadata} userId={user?.id} />
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <PasswordForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}